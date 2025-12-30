// app/partners/page.tsx
import Image from "next/image";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main>
        <section id="partners" className="vf-section vf-section-alt">
          <div className="vf-container vf-section-grid">
            <div>
              <h1 className="vf-h1">Partners</h1>
              <p className="vf-body">
                We collaborate with a network of partners to deliver
                mission-focused solutions. Placeholder listing below —
                real partner profiles will be added soon.
              </p>
              <ul className="vf-list">
                <li>Partner One — placeholder description</li>
                <li>Partner Two — placeholder description</li>
                <li>Partner Three — placeholder description</li>
              </ul>
            </div>
            <div className="vf-section-media">
              <Image
                src="/assets/img/generated-image-1.png"
                alt="Partners illustration"
                className="vf-media-img"
                width={800}
                height={600}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
