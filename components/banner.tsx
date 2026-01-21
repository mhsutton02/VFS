"use client";

interface BannerData {
  kicker: string;
  headline: string;
  body: string;
  ctas?: Array<{
    label: string;
    href: string;
    priority: "primary" | "secondary";
  }>;
}

interface BannerProps {
  data?: BannerData;
}

export function Banner({ data }: BannerProps) {
  console.log('Banner data:', data); // Debug log
  
  if (!data || !data.kicker || !data.headline) {
    console.error('Banner: Missing required data');
    return null;
  }

  return (
    <section className="vf-banner" aria-label="Banner" style={{ border: '2px solid red' }}>
      <div className="vf-container">
        <div className="vf-banner-content">
          <div className="vf-banner-kicker">{data.kicker}</div>
          <h1 className="vf-banner-headline">{data.headline}</h1>
          <p className="vf-banner-body">{data.body}</p>
        </div>
      </div>
    </section>
  );
}