import { SearchBar } from "@/components/shared/SearchBar";
import { WordRotator } from "@/components/public/WordRotator";
import "./styles.css";

const ROTATING_WORDS = [
  "Financial Advisors",
  "Chiropractors",
  "Orthopedic Surgeons",
  "Personal Injury Attorneys",
  "Settlement Services",
];

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-content-inner">
          <p className="hero-subtitle">
            Connect With Your <WordRotator words={ROTATING_WORDS} />
          </p>
          <h1 className="hero-title">
            MEET I.A.N. YOUR PERSONAL
            <br />
            INJURY CONCIERGE
          </h1>
          <div className="hero-search">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}
