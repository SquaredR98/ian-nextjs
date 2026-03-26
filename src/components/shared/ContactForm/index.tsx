"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { contactApi } from "@/lib/api";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

const schema = z.object({
  role: z.enum(["provider", "user", ""]).optional(),
  category: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const PROVIDER_CATEGORIES = [
  "Medical Providers",
  "Law Firms / Attorneys",
  "Service Providers",
];

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const selectedRole = watch("role");

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const payload: Record<string, any> = {
        name: data.name,
        email: data.email,
        message: data.message,
      };
      if (data.phone) payload.phone = data.phone;
      if (data.role) payload.role = data.role;
      if (data.role === "provider" && data.category) payload.category = data.category;
      await contactApi.submit(payload as any);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={cn("contact-form", className)} onSubmit={handleSubmit(onSubmit)}>
      <div className="contact-form-fields">
        {/* Role + Category row */}
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label className="contact-form-label">I am a</label>
            <select {...register("role")} className="contact-form-select">
              <option value="">Select type (optional)</option>
              <option value="provider">Provider</option>
              <option value="user">User / Patient</option>
            </select>
          </div>
          {selectedRole === "provider" && (
            <div className="contact-form-field">
              <label className="contact-form-label">Category</label>
              <select {...register("category")} className="contact-form-select">
                <option value="">Select category</option>
                {PROVIDER_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Name */}
        <div className="contact-form-field">
          <label className="contact-form-label">Name</label>
          <input {...register("name")} className="contact-form-input" placeholder="Your name" />
          {errors.name && <span className="contact-form-error">{errors.name.message}</span>}
        </div>

        {/* Email + Phone */}
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label className="contact-form-label">Email address</label>
            <input {...register("email")} type="email" className="contact-form-input" placeholder="your@email.com" />
            {errors.email && <span className="contact-form-error">{errors.email.message}</span>}
          </div>
          <div className="contact-form-field">
            <label className="contact-form-label">Phone Number</label>
            <input {...register("phone")} type="tel" className="contact-form-input" placeholder="(555) 555-5555" />
          </div>
        </div>

        {/* Message */}
        <div className="contact-form-field">
          <label className="contact-form-label">Message</label>
          <textarea {...register("message")} className="contact-form-textarea" rows={5} placeholder="Your message..." />
          {errors.message && <span className="contact-form-error">{errors.message.message}</span>}
        </div>
      </div>

      <button
        type="submit"
        className="contact-form-submit shimmer"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting..." : "Submit"}
      </button>
      {status === "success" && (
        <p className="contact-form-success">Thank you! We&apos;ll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="contact-form-error-msg">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
