export default function SuccessPage() {
  return (
    <section id="success" className="vf-section vf-section-alt vf-section-alt-bg">
      <div className="vf-container" style={{ textAlign: "center", padding: "24px" }}>
        <h2 className="vf-h2">Thanks for reaching out</h2>
        <p className="vf-body">Your message was submitted successfully. We’ll be in touch soon.</p>
        <div style={{ marginTop: "16px" }}>
          <a href="/" className="vf-btn vf-btn-ghost">Back to Home</a>
        </div>
      </div>
    </section>
  );
}