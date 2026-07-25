"use client";

import { useEffect, useState, FormEvent } from "react";
import { useDemoModal } from "@/context/DemoModalContext";
import { Icon } from "@/components/Icon";

export function ContactModal() {
  const { isOpen, topic, closeModal } = useDemoModal();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Lock scroll when modal is open & handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.company.trim() || !formData.mobile.trim()) {
      setErrorMessage("Please fill in all required fields (Name, Company, Mobile Number).");
      return;
    }

    setIsSubmitting(true);

    // Simulate API request delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch {
      setIsSubmitting(false);
      setErrorMessage("Something went wrong. Please try again or reach out directly.");
    }
  };

  const handleClose = () => {
    closeModal();
    // Reset state after animation finishes
    setTimeout(() => {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setErrorMessage("");
      setFormData({ name: "", company: "", mobile: "", email: "", message: "" });
    }, 300);
  };

  return (
    <div
      className="accore-modal-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="accore-modal-title"
    >
      <div
        className="accore-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="accore-modal-close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <Icon name="x" size={18} />
        </button>

        {isSubmitted ? (
          <div className="accore-modal-success">
            <div className="accore-modal-success__icon">
              <Icon name="check" size={32} />
            </div>
            <h3 className="accore-modal-success__title">Thank You, {formData.name.split(" ")[0]}!</h3>
            <p className="accore-modal-success__text">
              We have received your request for <strong>{topic || "a Demo"}</strong>. Our team will review your project requirements and contact you at <strong>{formData.mobile}</strong> shortly.
            </p>
            <button
              type="button"
              className="btn btn--primary accore-modal-success__btn"
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="accore-modal-header">
              <div className="accore-modal-badge">
                <Icon name="sparkles" size={14} />
                <span>{topic || "Request Demo"}</span>
              </div>
              <h2 id="accore-modal-title" className="accore-modal-title">
                Let&apos;s Build Something Great Together
              </h2>
              <p className="accore-modal-subtitle">
                Fill in your details below to schedule a live product demonstration or consult with our engineering team.
              </p>
            </div>

            {errorMessage && (
              <div className="accore-modal-error" role="alert">
                <Icon name="info" size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form className="accore-modal-form" onSubmit={handleSubmit}>
              <div className="accore-modal-grid">
                {/* Full Name (Required) */}
                <div className="accore-form-group">
                  <label htmlFor="modal-name">
                    Full Name <span className="req-star">*</span>
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Company Name (Required) */}
                <div className="accore-form-group">
                  <label htmlFor="modal-company">
                    Company Name <span className="req-star">*</span>
                  </label>
                  <input
                    id="modal-company"
                    type="text"
                    required
                    placeholder="e.g. Acme Enterprises"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="accore-modal-grid">
                {/* Mobile Number (Required) */}
                <div className="accore-form-group">
                  <label htmlFor="modal-mobile">
                    Mobile Number <span className="req-star">*</span>
                  </label>
                  <input
                    id="modal-mobile"
                    type="tel"
                    required
                    placeholder="e.g. +971 50 123 4567"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>

                {/* Email Address (Optional) */}
                <div className="accore-form-group">
                  <label htmlFor="modal-email">
                    Email Address <span className="opt-tag">(Optional)</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    placeholder="e.g. sarah@acme.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Message / Project Details (Optional) */}
              <div className="accore-form-group">
                <label htmlFor="modal-message">
                  Message / Project Details <span className="opt-tag">(Optional)</span>
                </label>
                <textarea
                  id="modal-message"
                  rows={3}
                  placeholder="Tell us about your project requirements, timelines, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <div className="accore-modal-footer">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn--primary accore-modal-submit"
                >
                  {isSubmitting ? (
                    <span className="accore-modal-loading">
                      <span className="spinner" /> Sending Request...
                    </span>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Icon name="arrow-right" size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
