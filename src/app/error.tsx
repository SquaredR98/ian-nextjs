"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "#1e195c",
            marginBottom: "0.75rem",
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            color: "#6c757d",
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
          }}
        >
          We encountered an unexpected error. Please try again or return to the
          home page.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <button
            onClick={reset}
            style={{
              padding: "0.625rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "#1e195c",
              border: "none",
              borderRadius: "9999px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
          <Link
            href="/"
            style={{
              padding: "0.625rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#1e195c",
              backgroundColor: "transparent",
              border: "2px solid #1e195c",
              borderRadius: "9999px",
              textDecoration: "none",
            }}
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
