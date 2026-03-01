"use client";

import { useState } from "react";

export function ProviderSignUpForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  }

  return (
    <div className="provider-signup-page">
      <div className="provider-signup-card">
        <h1 className="provider-signup-title">Provider Registration</h1>
        <p className="provider-signup-subtitle">
          Join the Injury Assistance Network and connect with patients who need your services.
        </p>
        <form className="provider-signup-form" onSubmit={handleSubmit}>
          <ProviderSignupBusinessFields />
          <ProviderSignupContactFields />
          <ProviderSignupAccountFields />
          <ProviderSignupSubmit status={status} />
        </form>
      </div>
    </div>
  );
}

function ProviderSignupBusinessFields() {
  return (
    <fieldset className="provider-signup-fieldset">
      <legend className="provider-signup-legend">Business Information</legend>
      <ProviderField label="Business Name" name="business_name" type="text" placeholder="Your business name" />
      <div className="provider-signup-row">
        <ProviderSelectField
          label="Category"
          name="category"
          options={["Medical Provider", "Attorney / Law Firm", "Service Provider"]}
        />
        <ProviderField label="Specialty" name="specialty" type="text" placeholder="e.g. Chiropractor" />
      </div>
      <ProviderField label="Website" name="website" type="url" placeholder="https://yourwebsite.com" />
    </fieldset>
  );
}

function ProviderSignupContactFields() {
  return (
    <fieldset className="provider-signup-fieldset">
      <legend className="provider-signup-legend">Contact Information</legend>
      <ProviderField label="Address" name="address" type="text" placeholder="Street address" />
      <div className="provider-signup-row">
        <ProviderField label="City" name="city" type="text" placeholder="City" />
        <ProviderField label="State" name="state" type="text" placeholder="FL" />
        <ProviderField label="ZIP" name="zip" type="text" placeholder="32803" />
      </div>
      <div className="provider-signup-row">
        <ProviderField label="Phone" name="phone" type="tel" placeholder="(555) 555-5555" />
        <ProviderField label="Email" name="email" type="email" placeholder="contact@business.com" />
      </div>
    </fieldset>
  );
}

function ProviderSignupAccountFields() {
  return (
    <fieldset className="provider-signup-fieldset">
      <legend className="provider-signup-legend">Account Setup</legend>
      <ProviderField label="Contact Person" name="contact_name" type="text" placeholder="Your full name" />
      <ProviderField label="Password" name="password" type="password" placeholder="Create a password" />
      <ProviderField label="Confirm Password" name="confirm_password" type="password" placeholder="Confirm password" />
    </fieldset>
  );
}

function ProviderField({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="provider-signup-field">
      <label className="provider-signup-label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="provider-signup-input"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

function ProviderSelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div className="provider-signup-field">
      <label className="provider-signup-label" htmlFor={name}>
        {label}
      </label>
      <select id={name} name={name} className="provider-signup-select" required>
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function ProviderSignupSubmit({ status }: { status: string }) {
  return (
    <>
      <button
        type="submit"
        className="provider-signup-submit shimmer"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Registering..." : "Register as Provider"}
      </button>
      {status === "success" && (
        <p className="provider-signup-success">
          Registration submitted! We will review your application and contact you shortly.
        </p>
      )}
      {status === "error" && (
        <p className="provider-signup-error">Something went wrong. Please try again.</p>
      )}
    </>
  );
}
