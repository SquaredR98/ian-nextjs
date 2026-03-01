import "./styles.css";

const VALUE_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="vp-card-icon">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Verified Providers",
    desc: "Every provider on our network is vetted and verified, so you can trust you are receiving quality care.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="vp-card-icon">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Free for Victims",
    desc: "Our platform is completely free for personal injury victims. No hidden fees, no catch — just help when you need it.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="vp-card-icon">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "24/7 Availability",
    desc: "Access our provider directory any time, day or night. Help is available whenever you need it most.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="vp-card-icon">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "All-in-One Network",
    desc: "Medical providers, attorneys, and service providers — everything you need for recovery, in one place.",
  },
];

export function ValueProposition() {
  return (
    <section className="vp">
      <div className="vp-inner">
        <span className="vp-label">Why Choose I.A.N.</span>
        <h2 className="vp-title">Built for Your Recovery</h2>
        <p className="vp-subtitle">
          We connect personal injury victims with trusted professionals, making
          the recovery process simpler and stress-free.
        </p>
        <div className="vp-grid">
          {VALUE_ITEMS.map((item) => (
            <div key={item.title} className="vp-card">
              <div className="vp-card-icon-wrap">{item.icon}</div>
              <h3 className="vp-card-title">{item.title}</h3>
              <p className="vp-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
