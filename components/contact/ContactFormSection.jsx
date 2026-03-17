// components/contact/ContactFormSection.jsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Building,
  MapPin,
  Package,
  HelpCircle,
  Briefcase,
  ShoppingBag,
  Wrench,
  FileText,
  ChevronDown,
  Loader2,
  Paperclip,
  X,
} from "lucide-react";

const inquiryTypes = [
  { value: "product", label: "Product Inquiry", icon: ShoppingBag },
  { value: "quote", label: "Request Quote", icon: FileText },
  { value: "support", label: "Technical Support", icon: Wrench },
  { value: "dealer", label: "Become a Dealer", icon: Briefcase },
  { value: "bulk", label: "Bulk Order", icon: Package },
  { value: "other", label: "Other", icon: HelpCircle },
];

export default function ContactFormSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    inquiryType: "",
    subject: "",
    message: "",
    attachments: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showInquiryDropdown, setShowInquiryDropdown] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.size <= 5 * 1024 * 1024 // 5MB limit
    );
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles].slice(0, 3),
    }));
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = "Please select inquiry type";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        city: "",
        inquiryType: "",
        subject: "",
        message: "",
        attachments: [],
      });
    } catch (error) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedInquiry = inquiryTypes.find(
    (t) => t.value === formData.inquiryType
  );

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#C9A227]/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#111111]/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left - Form Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-2"
          >
            <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Send Us a Message
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-6">
              We'd Love to{" "}
              <span className="text-[#C9A227]">Hear From You</span>
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Fill out the form and our team will get back to you within 24 hours. 
              For urgent matters, please call us directly.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: CheckCircle, text: "Quick response within 24 hours" },
                { icon: CheckCircle, text: "Expert advice from our team" },
                { icon: CheckCircle, text: "No obligation consultation" },
                { icon: CheckCircle, text: "Confidential information handling" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-[#C9A227] rounded-full flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-10 p-6 bg-[#F5F5F5] rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C9A227] to-[#A68520] rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111111]">
                    Prefer to talk?
                  </h4>
                  <p className="text-gray-500 text-sm mb-2">
                    Call us at
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="text-[#C9A227] font-bold text-lg hover:underline"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#F5F5F5] rounded-3xl p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#111111] mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Thank you for reaching out. Our team will review your message 
                    and get back to you within 24 hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#111111] text-white px-8 py-3 rounded-full font-semibold"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-[#F5F5F5] rounded-3xl p-8 md:p-10"
                >
                  {/* Form Error */}
                  <AnimatePresence>
                    {errors.submit && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl mb-6"
                      >
                        <AlertCircle className="w-5 h-5" />
                        {errors.submit}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Row 1: Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-[#111111] mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Enter your name"
                          className={`w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 transition-all focus:outline-none ${
                            errors.name
                              ? "border-red-300 focus:border-red-500"
                              : "border-transparent focus:border-[#C9A227]"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-[#111111] mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="Enter your email"
                          className={`w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 transition-all focus:outline-none ${
                            errors.email
                              ? "border-red-300 focus:border-red-500"
                              : "border-transparent focus:border-[#C9A227]"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-[#111111] mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="Enter your phone"
                          className={`w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 transition-all focus:outline-none ${
                            errors.phone
                              ? "border-red-300 focus:border-red-500"
                              : "border-transparent focus:border-[#C9A227]"
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-semibold text-[#111111] mb-2">
                        Company (Optional)
                      </label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleChange("company", e.target.value)}
                          placeholder="Enter company name"
                          className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 border-transparent focus:border-[#C9A227] transition-all focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: City & Inquiry Type */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* City */}
                    <div>
                      <label className="block text-sm font-semibold text-[#111111] mb-2">
                        City (Optional)
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          placeholder="Enter your city"
                          className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 border-transparent focus:border-[#C9A227] transition-all focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-sm font-semibold text-[#111111] mb-2">
                        Inquiry Type *
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowInquiryDropdown(!showInquiryDropdown)}
                          className={`w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 transition-all focus:outline-none text-left flex items-center justify-between ${
                            errors.inquiryType
                              ? "border-red-300"
                              : "border-transparent focus:border-[#C9A227]"
                          }`}
                        >
                          {selectedInquiry ? (
                            <span className="flex items-center gap-2">
                              <selectedInquiry.icon className="w-4 h-4 text-[#C9A227]" />
                              {selectedInquiry.label}
                            </span>
                          ) : (
                            <span className="text-gray-400">Select type</span>
                          )}
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              showInquiryDropdown ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                        {/* Dropdown */}
                        <AnimatePresence>
                          {showInquiryDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20"
                            >
                              {inquiryTypes.map((type) => (
                                <button
                                  key={type.value}
                                  type="button"
                                  onClick={() => {
                                    handleChange("inquiryType", type.value);
                                    setShowInquiryDropdown(false);
                                  }}
                                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F5] transition-colors ${
                                    formData.inquiryType === type.value
                                      ? "bg-[#C9A227]/10 text-[#C9A227]"
                                      : ""
                                  }`}
                                >
                                  <type.icon className="w-5 h-5" />
                                  {type.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {errors.inquiryType && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.inquiryType}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">
                      Subject (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      placeholder="Brief subject of your inquiry"
                      className="w-full px-4 py-4 bg-white rounded-xl border-2 border-transparent focus:border-[#C9A227] transition-all focus:outline-none"
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Tell us about your requirements..."
                        rows={5}
                        className={`w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 transition-all focus:outline-none resize-none ${
                          errors.message
                            ? "border-red-300 focus:border-red-500"
                            : "border-transparent focus:border-[#C9A227]"
                        }`}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      {errors.message && (
                        <p className="text-red-500 text-sm">{errors.message}</p>
                      )}
                      <p className="text-gray-400 text-sm ml-auto">
                        {formData.message.length}/500
                      </p>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">
                      Attachments (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-white">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <Paperclip className="w-10 h-10 text-gray-400 mb-2" />
                        <p className="text-gray-600 text-center">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PDF, DOC, JPG, PNG up to 5MB (Max 3 files)
                        </p>
                      </label>
                    </div>

                    {/* Uploaded Files */}
                    {formData.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border"
                          >
                            <FileText className="w-4 h-4 text-[#C9A227]" />
                            <span className="text-sm text-gray-600 truncate max-w-[150px]">
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-[#C9A227] to-[#A68520] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#C9A227]/30"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  {/* Privacy Note */}
                  <p className="text-center text-sm text-gray-500 mt-4">
                    By submitting, you agree to our{" "}
                    <a href="/privacy" className="text-[#C9A227] hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}