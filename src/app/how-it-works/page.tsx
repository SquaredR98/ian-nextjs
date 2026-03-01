import type { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import "./page.css";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how Injury Assistance Network connects you with the right professionals after a personal injury.",
};

const STEPS = [
  {
    number: 1,
    title: "Tell Us What Happened",
    description:
      "Share the details of your personal injury accident so we can understand your situation and connect you with the right professionals.",
  },
  {
    number: 2,
    title: "We Match You with Experts",
    description:
      "Our network of verified medical providers, attorneys, and service professionals is carefully matched to your specific needs and location.",
  },
  {
    number: 3,
    title: "Get the Care You Need",
    description:
      "Connect directly with trusted providers who specialize in personal injury cases. Receive the medical attention and legal guidance you deserve.",
  },
  {
    number: 4,
    title: "Ongoing Support & Coordination",
    description:
      "We coordinate between your providers to ensure seamless communication and a streamlined recovery process from start to finish.",
  },
  {
    number: 5,
    title: "Recovery & Resolution",
    description:
      "With the right team behind you, focus on your recovery while our verified professionals handle the rest. We are with you every step of the way.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "How It Works" },
        ]}
      />
      <div className="how-it-works-page">
        <h1 className="how-it-works-title">How It Works</h1>
        <p className="how-it-works-subtitle">
          Getting the help you need after a personal injury is simple with Injury
          Assistance Network. Follow these five easy steps.
        </p>
        <ol className="how-it-works-steps">
          {STEPS.map((step) => (
            <li key={step.number} className="how-it-works-step">
              <span className="how-it-works-number">{step.number}</span>
              <div className="how-it-works-step-content">
                <h3 className="how-it-works-step-title">{step.title}</h3>
                <p className="how-it-works-step-desc">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
