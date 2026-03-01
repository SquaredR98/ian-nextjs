"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { appointmentsApi } from "@/lib/api";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  datereserve: z.string().min(1, "Date is required"),
  prefertime: z.string().min(1, "Time is required"),
});

type FormData = z.infer<typeof schema>;

interface AppointmentFormProps {
  providerId: number;
  location?: string;
  businessName?: string;
  className?: string;
}

export function AppointmentForm({
  providerId,
  location = "",
  businessName,
  className,
}: AppointmentFormProps) {
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
      await appointmentsApi.book({
        ...data,
        provideId: providerId,
        location,
      });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={cn("appointment-form", className)} onSubmit={handleSubmit(onSubmit)}>
      <h3 className="appointment-form-title">
        Request an appointment for
        {businessName && <span className="appointment-form-biz-name">{businessName}</span>}
      </h3>
      <FormFields register={register} errors={errors} />
      <SubmitSection status={status} />
    </form>
  );
}

function FormFields({
  register,
  errors,
}: {
  register: ReturnType<typeof useForm<FormData>>["register"];
  errors: Record<string, { message?: string }>;
}) {
  return (
    <div className="appointment-form-fields">
      <FormField
        label="Your Name"
        error={errors.name?.message}
        input={<input {...register("name")} className="appointment-form-input" placeholder="Enter your name" />}
      />
      <FormField
        label="Email Address"
        error={errors.email?.message}
        input={<input {...register("email")} type="email" className="appointment-form-input" placeholder="Enter your email address" />}
      />
      <FormField
        label="Phone Number"
        error={errors.phone?.message}
        input={<input {...register("phone")} type="tel" className="appointment-form-input" placeholder="Enter your phone number" />}
      />
      <FormField
        label="Date of Reservation"
        error={errors.datereserve?.message}
        input={<input {...register("datereserve")} type="date" className="appointment-form-input" />}
      />
      <FormField
        label="Preferred Time"
        error={errors.prefertime?.message}
        input={<input {...register("prefertime")} type="time" className="appointment-form-input" />}
      />
    </div>
  );
}

function FormField({
  label,
  error,
  input,
}: {
  label: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <div className="appointment-form-field">
      <label className="appointment-form-label">{label}</label>
      {input}
      {error && <span className="appointment-form-error">{error}</span>}
    </div>
  );
}

function SubmitSection({ status }: { status: string }) {
  return (
    <>
      <button
        type="submit"
        className="appointment-form-submit shimmer"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting..." : "Submit your request"}
      </button>
      {status === "success" && (
        <p className="appointment-form-success">
          Appointment request submitted successfully!
        </p>
      )}
      {status === "error" && (
        <p className="appointment-form-error-msg">
          Something went wrong. Please try again.
        </p>
      )}
    </>
  );
}
