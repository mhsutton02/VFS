// app/api/jobs/route.ts — List all jobs, Create a job
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../lib/auth";
import { listJobFiles, getJobFile, putJobFile, triggerNetlifyBuild } from "../../../lib/github";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** GET /api/jobs — list all jobs */
export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const files = await listJobFiles();
    const jobs = await Promise.all(
      files.map(async (f) => {
        const slug = f.name.replace(".json", "");
        const data = await getJobFile(slug);
        if (!data) return null;
        return { ...JSON.parse(data.content), _sha: data.sha };
      })
    );
    return NextResponse.json(jobs.filter(Boolean));
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}

/** POST /api/jobs — create a new job */
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const slug = body.id || slugify(body.title);
    body.id = slug;

    // Check for existing
    const existing = await getJobFile(slug);
    if (existing) {
      return NextResponse.json(
        { error: `Job "${slug}" already exists` },
        { status: 409 }
      );
    }

    const content = JSON.stringify(body, null, 2) + "\n";
    await putJobFile(slug, content, undefined, `[admin] create ${slug}`);

    // Only rebuild when a new job is published immediately
    if (body.status === "published") {
      await triggerNetlifyBuild();
    }

    return NextResponse.json({ id: slug, status: "created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
