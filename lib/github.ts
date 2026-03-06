// lib/github.ts — GitHub REST API helpers for content/jobs/ CRUD

const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const GITHUB_OWNER = process.env.GITHUB_OWNER ?? "";
const GITHUB_REPO = process.env.GITHUB_REPO ?? "";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH ?? "main";

const API = "https://api.github.com";
const JOBS_PATH = "content/jobs";

interface GHFileResponse {
  name: string;
  path: string;
  sha: string;
  content: string;
  encoding: string;
}

interface GHDirEntry {
  name: string;
  path: string;
  sha: string;
  type: string;
}

function headers() {
  return {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

/** List all job JSON filenames */
export async function listJobFiles(): Promise<GHDirEntry[]> {
  const url = `${API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JOBS_PATH}?ref=${GITHUB_BRANCH}`;
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!res.ok) {
    if (res.status === 404) return []; // directory doesn't exist yet
    throw new Error(`GitHub list failed: ${res.status}`);
  }
  const data: GHDirEntry[] = await res.json();
  return data.filter((f) => f.name.endsWith(".json"));
}

/** Get a single job file's content + sha */
export async function getJobFile(
  slug: string
): Promise<{ content: string; sha: string } | null> {
  const url = `${API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JOBS_PATH}/${slug}.json?ref=${GITHUB_BRANCH}`;
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`GitHub get failed: ${res.status}`);
  }
  const data: GHFileResponse = await res.json();
  const decoded = Buffer.from(data.content, "base64").toString("utf-8");
  return { content: decoded, sha: data.sha };
}

/** Create or update a job file */
export async function putJobFile(
  slug: string,
  content: string,
  sha?: string,
  message?: string
): Promise<void> {
  const url = `${API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JOBS_PATH}/${slug}.json`;
  const body: Record<string, string> = {
    message: message ?? `[admin] update ${slug}`,
    content: Buffer.from(content).toString("base64"),
    branch: GITHUB_BRANCH,
  };
  if (sha) body.sha = sha;
  const res = await fetch(url, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub put failed: ${res.status} — ${err}`);
  }
}

/** Delete a job file */
export async function deleteJobFile(
  slug: string,
  sha: string,
  message?: string
): Promise<void> {
  const url = `${API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JOBS_PATH}/${slug}.json`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: headers(),
    body: JSON.stringify({
      message: message ?? `[admin] delete ${slug}`,
      sha,
      branch: GITHUB_BRANCH,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub delete failed: ${res.status} — ${err}`);
  }
}

/* ------------------------------------------------------------------ */
/*  Netlify Build Hook — only called for publish-affecting changes     */
/* ------------------------------------------------------------------ */

const NETLIFY_BUILD_HOOK = process.env.NETLIFY_BUILD_HOOK ?? "";

/** Trigger a Netlify site rebuild (fire-and-forget) */
export async function triggerNetlifyBuild(): Promise<void> {
  if (!NETLIFY_BUILD_HOOK) {
    console.warn("[admin] NETLIFY_BUILD_HOOK not set — skipping rebuild");
    return;
  }
  try {
    await fetch(NETLIFY_BUILD_HOOK, { method: "POST" });
  } catch (err) {
    console.error("[admin] Failed to trigger Netlify build:", err);
  }
}
