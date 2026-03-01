"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { contactApi } from "@/lib/api";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      await contactApi.submit(data);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={cn("contact-form", className)} onSubmit={handleSubmit(onSubmit)}>
      <ContactFormFields register={register} errors={errors} />
      <ContactFormSubmit status={status} />
    </form>
  );
}

function ContactFormFields({
  register,
  errors,
}: {
  register: ReturnType<typeof useForm<FormData>>["register"];
  errors: Record<string, { message?: string }>;
}) {
  return (
    <div className="contact-form-fields">
      <div className="contact-form-field">
        <label className="contact-form-label">Name</label>
        <input {...register("name")} className="contact-form-input" placeholder="Your name" />
        {errors.name && <span className="contact-form-error">{errors.name.message}</span>}
      </div>
      <div className="contact-form-row">
        <div className="contact-form-field">
          <label className="contact-form-label">Email address</label>
          <input {...register("email")} type="email" className="contact-form-input" placeholder="your@email.com" />
          {errors.email && <span className="contact-form-error">{errors.email.message}</span>}
        </div>
        <div className="contact-form-field">
          <label className="contact-form-label">Phone Number</label>
          <input {...register("phone")} type="tel" className="contact-form-input" placeholder="(555) 555-5555" />
          {errors.phone && <span className="contact-form-error">{errors.phone.message}</span>}
        </div>
      </div>
      <div className="contact-form-field">
        <label className="contact-form-label">Message</label>
        <textarea {...register("message")} className="contact-form-textarea" rows={5} placeholder="Your message..." />
        {errors.message && <span className="contact-form-error">{errors.message.message}</span>}
      </div>
    </div>
  );
}

function ContactFormSubmit({ status }: { status: string }) {
  return (
    <>
      <button
        type="submit"
        className="contact-form-submit shimmer"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting..." : "Submit"}
      </button>
      {status === "success" && (
        <p className="contact-form-success">Message sent successfully!</p>
      )}
      {status === "error" && (
        <p className="contact-form-error-msg">Something went wrong. Please try again.</p>
      )}
    </>
  );
}
