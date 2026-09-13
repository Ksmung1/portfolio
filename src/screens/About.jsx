import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const trackRecord = [
  "80% accuracy in trading, 90% in long-term investments.",
  "Certified in Financial Modeling & Blockchain, trained at the Academy of Private Investor.",
  "Managing investments for high-net-worth individuals.",
  "Turned ₹10 lakhs into ₹38 lakhs in 2021 with smart market moves.",
];

const investmentPrinciples = [
  {
    number: "01",
    title: "Strategic Reallocation",
    description: "Moving assets at the right time for maximum returns.",
  },
  {
    number: "02",
    title: "Cash Flow Focus",
    description: "Investing in income-generating opportunities.",
  },
  {
    number: "03",
    title: "Diversified Portfolio",
    description: "Spreading risk across multiple sectors.",
  },
  {
    number: "04",
    title: "Smart Trading",
    description: "Using margins and futures selectively to seize the best opportunities.",
  },
];

const proofImages = [
  { src: "/pk1.jpg", alt: "Managed account wallet proof 1" },
  { src: "/pk2.jpg", alt: "Managed account wallet proof 2" },
  { src: "/pk3.jpg", alt: "Managed account wallet proof 3" },
  { src: "/pk4.jpg", alt: "Managed account wallet proof 4" },
];

const About = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!selectedImage) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedImage]);

  return (
    <main className="about-screen">
      <nav className="about-nav" aria-label="About navigation">
        <button type="button" onClick={() => navigate("/")}>
          <span aria-hidden="true">←</span> Back to access
        </button>
        <span>Black Diamond · Private Fund Management</span>
      </nav>

      <header className="about-hero">
        <div className="about-hero-copy">
          <span className="about-eyebrow">About Black Diamond</span>
          <h1>About Me</h1>
          <p>
            Hello! I’m Black Diamond, an investor with six years of experience in wealth
            management, market research, and strategic financial planning. I’m all about
            smart, data-driven investing that focuses on long-term, sustainable growth while
            keeping risks in check.
          </p>
        </div>
        <div className="about-logo-panel">
          <img src="/black-diamond.png" alt="Black Diamond emblem" />
        </div>
      </header>

      <section className="about-grid">
        <article className="about-card about-card-intro">
          <span className="about-card-number">01 / Approach</span>
          <h2>What I Do</h2>
          <p>
            I help people grow and protect their wealth by making well-researched, strategic
            investment decisions. Whether it’s trading, long-term investments, or navigating
            market trends, I believe in a balanced approach that maximizes returns while
            staying adaptable to changing conditions.
          </p>
        </article>

        <article className="about-card about-card-track">
          <span className="about-card-number">02 / Experience</span>
          <h2>My Track Record</h2>
          <ul className="track-record-list">
            {trackRecord.map((item) => (
              <li key={item}>
                <span aria-hidden="true">✓</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="strategy-section">
        <div className="strategy-heading">
          <div>
            <span className="about-eyebrow">Investment framework</span>
            <h2>How I Invest</h2>
          </div>
          <p>
            I follow a crop rotation strategy—just like in farming, I shift capital between
            different sectors based on market cycles. This keeps investments steady,
            minimizes risk, and ensures consistent growth.
          </p>
        </div>

        <div className="principles-grid">
          {investmentPrinciples.map((principle) => (
            <article key={principle.number} className="principle-card">
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-trust">
        <h2>Why Work With Me?</h2>
        <p>
          I believe in trust, transparency, and responsible investing. My goal isn’t just to
          make money—it’s to build wealth in a way that’s smart, sustainable, and secure. If
          you’re looking for a strategic approach to investing, let’s connect and grow
          together!
        </p>
      </section>

      <section className="proof-section">
        <div className="proof-heading">
          <div>
            <h2>Proof of Work: (Managed Account Wallets - Screenshots done in 2021)</h2>
          </div>
        </div>
        <div className="proof-grid">
          {proofImages.map((image, index) => (
            <figure key={image.src} className="proof-image">
              <button type="button" onClick={() => setSelectedImage(image)}>
                <img src={image.src} alt={image.alt} loading="lazy" />
              </button>
              <figcaption>Wallet record {String(index + 1).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="about-contact">
        <div>
          <span className="about-eyebrow">Direct contact</span>
          <h2>Email</h2>
        </div>
        <a href="mailto:blackdiamondgg99@gmail.com">
          Email: blackdiamondgg99@gmail.com <span aria-hidden="true">↗</span>
        </a>
      </footer>

      {selectedImage && (
        <button
          className="proof-lightbox"
          type="button"
          onClick={() => setSelectedImage(null)}
          aria-label="Close full-size wallet image"
        >
          <img src={selectedImage.src} alt={selectedImage.alt} />
          <span>Click anywhere to close</span>
        </button>
      )}
    </main>
  );
};

export default About;
