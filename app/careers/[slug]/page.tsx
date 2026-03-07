// app/careers/[slug]/page.tsx
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { ApplicationForm } from "../../../components/ApplicationForm";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

interface JobDetail {
  id: string;
  jobNumber?: number;
  title: string;
  department: string;
  location: string;
  type: string;
  clearance: string;
  posted: string;
  status?: "draft" | "published";
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  preferred: string[];
  compensation?: string;
  notifyEmails: string[];
}

const JOBS_DIR = path.join(process.cwd(), "content", "jobs");

function getJob(slug: string): JobDetail | null {
  const filePath = path.join(JOBS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const job = JSON.parse(raw);
  // Hide draft jobs from public view
  if (job.status === "draft") return null;
  return job;
}

function getAllSlugs(): string[] {
  if (!fs.existsSync(JOBS_DIR)) return [];
  return fs
    .readdirSync(JOBS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const job = getJob(params.slug);
  if (!job) return { title: "Position Not Found" };

  return {
    title: `${job.title} — Careers`,
    description: job.summary,
    alternates: {
      canonical: `https://valorforgesolutions.com/careers/${job.id}`,
    },
    openGraph: {
      title: `${job.title} | ValorForge Solutions Careers`,
      description: job.summary,
      url: `https://valorforgesolutions.com/careers/${job.id}`,
      type: "website",
      images: ["/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} | ValorForge Solutions Careers`,
      description: job.summary,
      images: ["/og-image.jpg"],
    },
  };
}

function daysAgo(dateStr: string): string {
  const diff = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  return `${diff} days ago`;
}

export default function JobDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const job = getJob(params.slug);
  if (!job) notFound();

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="vf-section vf-section-hero">
          <div
            className="vf-container"
            style={{ position: "relative", zIndex: 2 }}
          >
            <Link
              href="/careers"
              className="vf-back-link"
            >
              ← All Positions
            </Link>
            <h1 className="vf-h1">{job.title}</h1>
            <div className="vf-job-meta-row">
              {job.jobNumber != null && (
                <span className="vf-job-badge">Job #{job.jobNumber}</span>
              )}
              <span className="vf-job-badge">{job.department}</span>
              <span className="vf-job-meta">{job.location}</span>
              <span className="vf-job-meta">{job.type}</span>
              {job.clearance && (
                <span className="vf-job-meta">{job.clearance}</span>
              )}
              <span className="vf-job-meta vf-job-meta--muted">
                Posted {daysAgo(job.posted)}
              </span>
            </div>
          </div>
        </section>

        {/* Job Description */}
        <section className="vf-section vf-bg-gold-accent vf-content-section">
          <div className="vf-container">
            <div className="vf-job-detail">
              <h2 className="vf-h2">About This Role</h2>
              <p className="vf-body">{job.summary}</p>

              <h3 className="vf-h3">Responsibilities</h3>
              <ul className="vf-job-list">
                {job.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3 className="vf-h3">Qualifications</h3>
              <ul className="vf-job-list">
                {job.qualifications.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              {job.preferred.length > 0 && (
                <>
                  <h3 className="vf-h3">Preferred</h3>
                  <ul className="vf-job-list">
                    {job.preferred.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {job.compensation && (
                <>
                  <h3 className="vf-h3">Compensation &amp; Benefits</h3>
                  <p className="vf-body">{job.compensation}</p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="vf-section vf-bg-blue-accent">
          <div className="vf-container">
            <h2 className="vf-h2" style={{ marginBottom: "24px" }}>
              Apply for {job.title}
            </h2>
            <ApplicationForm
              jobTitle={job.title}
              jobNumber={job.jobNumber}
              notifyEmails={job.notifyEmails}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
