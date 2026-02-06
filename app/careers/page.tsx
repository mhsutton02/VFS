// app/careers/page.tsx
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import careers from "../../content/careers.json";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the ValorForge Solutions team. Explore open positions in software engineering, program management, AI alignment, and strategic delivery. Work on missions that matter.",
  openGraph: {
    title: "Careers | ValorForge Solutions",
    description: "Join the ValorForge Solutions team. Explore open positions in software engineering, program management, AI alignment, and strategic delivery.",
    url: "https://valorforgesolutions.com/careers",
    type: "website",
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | ValorForge Solutions',
    description: 'Join the ValorForge Solutions team. Explore open positions in software engineering, program management, AI alignment, and strategic delivery.',
    images: ['/og-image.jpg'],
  },
};

const CARDS = [
  {
    title: "Our Culture",
    body: "At ValorForge, we cultivate a disciplined, mission-first environment where integrity, service, and stewardship drive every decision. Our veteran-led team thrives on trust, collaboration, and excellence\u2014building solutions that matter.",
  },
  {
    title: "Our Benefits",
    body: "We offer competitive compensation, comprehensive health coverage, flexible remote/hybrid options, professional development support, and meaningful work-life balance\u2014because our team\u2019s mission deserves the best support.",
  },
  {
    title: "Our Opportunities",
    body: "Join us in high-impact roles across software engineering, program management, AI alignment, and strategic delivery. Work on real missions, grow with cutting-edge technology, and contribute to outcomes that matter.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="vf-section vf-section-hero vf-careers-hero">
          <div className="vf-hero-bg">
            <Image
              src="/assets/img/careers.jpg"
              alt="ValorForge careers"
              fill
              style={{ objectFit: "cover" }}
              priority
              quality={90}
            />
          </div>
          <div className="vf-hero-content">
            <div className="vf-kicker">Join the Mission</div>
            <h1 className="vf-h1">{careers.title}</h1>
            <p className="vf-lead">{careers.intro}</p>
          </div>
        </section>

        {/* Culture / Benefits / Opportunities */}
        <section className="vf-section vf-bg-gold-accent">
          <div className="vf-container">
            <div className="vf-careers-grid">
              {CARDS.map((card) => (
                <div key={card.title} className="vf-careers-card">
                  <h2 className="vf-h3">{card.title}</h2>
                  <p className="vf-body">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section className="vf-section vf-bg-blue-accent">
          <div className="vf-container">
            <h2 className="vf-h2 vf-careers-section-title">Open Positions</h2>
            <div className="vf-careers-roles">
              {careers.jobs.map((job) => (
                <div key={job.id} className="vf-careers-role">
                  <div className="vf-careers-role-header">
                    <h3 className="vf-h3">{job.title}</h3>
                    <div className="vf-careers-role-meta">
                      <span>{job.location}</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <p className="vf-body">{job.summary}</p>
                </div>
              ))}
            </div>

            <div className="vf-careers-cta">
              <p className="vf-body">
                Interested? Reach out — we&apos;d love to hear from you.
              </p>
              <Link href="/#contact" className="vf-btn vf-btn-primary">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
