"use client";

import { useState } from "react";
import { blogApi } from "@/lib/api";

interface BlogCommentFormProps {
  blogId: number;
}

export function BlogCommentForm({ blogId }: BlogCommentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("submitting");
    try {
      await blogApi.postComment({ blogId, name, email, message });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="blog-comment-section">
      <h3 className="blog-comment-title">Leave a Comment</h3>
      {status === "success" ? (
        <p className="blog-comment-success">
          Thank you! Your comment has been submitted.
        </p>
      ) : (
        <form className="blog-comment-form" onSubmit={handleSubmit}>
          <div className="blog-comment-row">
            <input
              type="text"
              className="blog-comment-input"
              placeholder="Your Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="blog-comment-input"
              placeholder="Your Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <textarea
            className="blog-comment-textarea"
            placeholder="Your Comment *"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          {status === "error" && (
            <p className="blog-comment-error">
              Failed to submit comment. Please try again.
            </p>
          )}
          <button
            type="submit"
            className="blog-comment-submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Submitting..." : "Post Comment"}
          </button>
        </form>
      )}
    </section>
  );
}
