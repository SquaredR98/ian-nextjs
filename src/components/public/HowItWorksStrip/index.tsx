import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "./styles.css";

const STEPS = [
  {
    number: "1",
    title: "Search",
    desc: "Enter your injury type and location to find providers near you.",
  },
  {
    number: "2",
    title: "Compare",
    desc: "Browse profiles, read reviews, and compare verified specialists.",
  },
  {
    number: "3",
    title: "Connect",
    desc: "Contact your chosen provider directly and start your recovery.",
  },
];

export function HowItWorksStrip() {
  return (
    <section className="hiw-strip">
      <div className="hiw-strip-inner">
        <div className="hiw-strip-header">
          <span className="hiw-strip-label">How It Works</span>
          <h2 className="hiw-strip-title">Getting Help is Simple</h2>
        </div>
        <div className="hiw-strip-steps">
          {STEPS.map((step, i) => (
            <div key={step.number} className="hiw-strip-step">
              <div className="hiw-strip-number">{step.number}</div>
              <h3 className="hiw-strip-step-title">{step.title}</h3>
              <p className="hiw-strip-step-desc">{step.desc}</p>
              {i < STEPS.length - 1 && <div className="hiw-strip-connector" />}
            </div>
          ))}
        </div>
        <Link href="/how-it-works" className="hiw-strip-link">
          Learn more about how it works <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
