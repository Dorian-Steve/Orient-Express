"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  Mail,
  GraduationCap,
  Eye,
  EyeOff,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";

export default function StudentSignUp() {
  const [formData, setFormData] = useState({
    // Required fields
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",

    // Optional fields
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",

    // Terms
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.password || formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber || null,
          dateOfBirth: formData.dateOfBirth || null,
          gender: formData.gender || null,
          role: "STUDENT",
        }),
      });

      if (response.ok) {
        router.push(
          "/sign-in?message=Registration successful! Please sign in.",
        );
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Join as Student</h1>
          <p className="mt-2 text-gray-600">
            Start your educational guidance journey
          </p>
        </div>

        {/* Sign-up Form */}
        <div className="rounded-xl bg-white p-8 shadow-xl">
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Email address"
                required
              />
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="First name"
                  required
                />
              </div>
              <div className="relative">
                <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pr-12 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Password (min. 8 characters)"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 py-3 pr-12 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
              <p className="mb-1 font-medium">Password must contain:</p>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className={
                    formData.password.length >= 8
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  • At least 8 characters
                </div>
                <div
                  className={
                    /[A-Z]/.test(formData.password)
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  • One uppercase letter
                </div>
                <div
                  className={
                    /[a-z]/.test(formData.password)
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  • One lowercase letter
                </div>
                <div
                  className={
                    /[0-9]/.test(formData.password)
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  • One number
                </div>
              </div>
            </div>

            {/* Optional Information */}
            <div className="border-t pt-4">
              <h3 className="mb-3 text-sm font-medium text-gray-700">
                Optional Information
              </h3>

              <div className="space-y-3">
                {/* Phone Number */}
                <div className="relative">
                  <Phone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone number"
                  />
                </div>

                {/* Date of Birth & Gender */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Calendar className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3 pt-4">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  handleInputChange("agreeToTerms", e.target.checked)
                }
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Student Account"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/sign-in")}
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Sign in here
          </button>
        </div>
      </div>
    </div>
  );
}
