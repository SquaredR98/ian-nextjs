import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">
        The page you are looking for could not be found.
      </p>
      <Link href="/" className="not-found-link">
        Return to Homepage
      </Link>
    </div>
  );
}
