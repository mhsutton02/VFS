// app/api/jobs/[slug]/route.ts — Get, Update, Delete a single job
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../../lib/auth";
import { getJobFile, putJobFile, deleteJobFile, triggerNetlifyBuild } from "../../../../lib/github";

/** GET /api/jobs/[slug] */
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = req.headers.get("x-admin-token");
  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getJobFile(params.slug);
    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ...JSON.parse(data.content), _sha: data.sha });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

/** PUT /api/jobs/[slug] */
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = req.headers.get("x-admin-token");
  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { _sha, ...jobData } = body;

    if (!_sha) {
      return NextResponse.json(
        { error: "Missing _sha for update" },
        { status: 400 }
      );
    }

    // Read current status before overwriting
    const existing = await getJobFile(params.slug);
    const oldStatus = existing
      ? (JSON.parse(existing.content).status ?? "published")
      : "draft";
    const newStatus = jobData.status ?? "draft";

    jobData.id = params.slug;
    const content = JSON.stringify(jobData, null, 2) + "\n";
    await putJobFile(params.slug, content, _sha, `[admin] update ${params.slug}`);

    // Rebuild only when a draft is published
    if (oldStatus === "draft" && newStatus === "published") {
      await triggerNetlifyBuild();
    }

    return NextResponse.json({ id: params.slug, status: "updated" });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

/** DELETE /api/jobs/[slug] */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = req.headers.get("x-admin-token");
  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { _sha } = body;
    if (!_sha) {
      return NextResponse.json(
        { error: "Missing _sha for delete" },
        { status: 400 }
      );
    }

    // Check if the job was published before deleting
    const existing = await getJobFile(params.slug);
    const wasPublished = existing
      ? (JSON.parse(existing.content).status ?? "published") === "published"
      : false;

    await deleteJobFile(params.slug, _sha, `[admin] delete ${params.slug}`);

    // Rebuild only when a published job is removed
    if (wasPublished) {
      await triggerNetlifyBuild();
    }

    return NextResponse.json({ id: params.slug, status: "deleted" });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
