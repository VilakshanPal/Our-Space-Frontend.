"use client";
import { Heart, User, AtSign, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import FloatingInput from "../../../components/ui/signup/FloatingInput";
import PasswordInput from "../../../components/ui/signup/PasswordInput";
import GenderInput from "../../../components/ui/signup/GenderInput";

export default function Signup() {
  const [termsConditions, setTermsConditions] = useState(true);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [usernameStatus, setUsernameStatus] = useState({
    type: "idle",
    message: "",
  });
  const [step, setStep] = useState(1);

  const {
    register,
    trigger,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
  });

  const watchedUsername = watch("username") || "";

  const validateStep1 = async () => {
    const valid = await trigger([
      "firstName",
      "lastName",
      "username",
      "email",
      "gender",
    ]);

    return valid;
  };

  const handleNext = async () => {
    const isValid = await validateStep1();

    if (!isValid) return;

    setStep(2);
  };

  const getErrorMessage = (payload) => {
    if (!payload) return "Something went wrong.";
    if (typeof payload === "string") return payload;
    if (typeof payload.message === "string") return payload.message;
    if (typeof payload.error === "string") return payload.error;
    if (typeof payload.detail === "string") return payload.detail;
    if (typeof payload.msg === "string") return payload.msg;

    if (Array.isArray(payload.errors)) {
      return payload.errors.join(" ");
    }

    if (payload.errors && typeof payload.errors === "object") {
      const firstError = Object.values(payload.errors).find(
        (value) => typeof value === "string" && value.trim().length > 0,
      );

      if (typeof firstError === "string") return firstError;
    }

    return "Something went wrong.";
  };

  const applyServerFieldErrors = (payload) => {
    if (!payload?.errors || typeof payload.errors !== "object") return;

    Object.entries(payload.errors).forEach(([field, value]) => {
      if (typeof value === "string" && value.trim()) {
        setError(field, {
          type: "server",
          message: value,
        });
      } else if (Array.isArray(value) && value.length > 0) {
        const message = value.find(
          (item) => typeof item === "string" && item.trim(),
        );
        if (message) {
          setError(field, {
            type: "server",
            message,
          });
        }
      }
    });
  };

  useEffect(() => {
    const username = watchedUsername.trim();

    if (!username) {
      setUsernameStatus({ type: "idle", message: "" });
      return;
    }

    if (username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameStatus({ type: "idle", message: "" });
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setUsernameStatus({
        type: "checking",
        message: "Checking availability...",
      });

      try {
        const response = await fetch(
          `http://localhost:5000/check-username?username=${encodeURIComponent(
            username,
          )}`,
          {
            method: "GET",
            credentials: "include",
            signal: controller.signal,
          },
        );

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(result.message || "Unable to verify username.");
        }

        if (result.available === false) {
          setError("username", {
            type: "server",
            message: "This username is already taken",
          });
          setUsernameStatus({
            type: "error",
            message: "This username is already taken",
          });
        } else {
          clearErrors("username");
          setUsernameStatus({
            type: "success",
            message: "Username is available",
          });
        }
      } catch (error) {
        setUsernameStatus({
          type: "error",
          message: "Could not verify username right now",
        });
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [watchedUsername, clearErrors, setError]);

  const handleSignup = async (data) => {
    setServerError("");
    setSuccessMessage("");

    if (!termsConditions) {
      setServerError("You must agree to the terms to create an account.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        const backendMessage = getErrorMessage(result);
        applyServerFieldErrors(result);
        setServerError(backendMessage);
        return;
      }

      setSuccessMessage("Account created successfully!");
      console.log(result);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#FCF8F8] flex justify-center px-6 py-10">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Heart
            className="mx-auto mb-4 text-[#FF4D6D]"
            size={30}
            strokeWidth={1.7}
          />

          <h1 className="text-6xl font-serif text-[#2D2020]">daybook</h1>

          <p className="mt-4 text-[#8A7272] leading-8 text-sm">
            Share everyday moments,
            <br />
            stay connected.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSignup)}>
            {step === 1 && (
          <div className="mt-10 space-y-4">
            <FloatingInput
              id="firstName"
              label="First Name"
              registration={register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              })}
              icon={User}
              error={errors.firstName}
            />

            <FloatingInput
              id="lastName"
              label="Last Name"
              registration={register("lastName", {
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
              icon={User}
              error={errors.lastName}
            />

            <FloatingInput
              id="username"
              label="Username"
              registration={register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: "Only letters, numbers, and underscores are allowed",
                },
              })}
              icon={AtSign}
              error={errors.username}
              status={usernameStatus}
            />

            <FloatingInput
              id="email"
              label="Email Address"
              registration={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              icon={Mail}
              type="email"
              error={errors.email}
            />

            <GenderInput
              registration={register("gender", {
                required: "Please select a gender",
              })}
              error={errors.gender}
            />
            <button
      type="button"
      onClick={handleNext}
      className="mt-6 w-full h-14 rounded-2xl bg-[#FF4D6D] text-white"
    >
      Continue
    </button>
            </div>
)}
{step === 2 && (
          <div className="mt-10 space-y-4">
            <PasswordInput
              label="Password"
              registration={register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                  message: "Password must include letters and numbers",
                },
              })}
              error={errors.password}
              showStrength
            />

            <PasswordInput
              registration={register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value, allValues) =>
                  value === allValues.password || "Passwords do not match",
              })}
              label="Confirm Password"
              error={errors.confirmPassword}
            />
          

          <div className="mt-6 flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={termsConditions}
              onChange={() => setTermsConditions(!termsConditions)}
              className="accent-[#FF4D6D] size-4"
            />

            <p className="text-[#8A7272]">
              I agree to the{" "}
              <span className="text-[#FF4D6D] cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#FF4D6D] cursor-pointer">
                Privacy Policy
              </span>
            </p>
        </div>

          {serverError && (
            <div className="mt-4 rounded-xl bg-[#FFF1F1] px-3 py-2 text-sm text-[#C94D4D]">
              {serverError}
            </div>
          )}

          {successMessage && (
            <div className="mt-4 rounded-xl bg-[#EEF9F0] px-3 py-2 text-sm text-[#1F7A45]">
              {successMessage}
            </div>
          )}

          <button
            disabled={!termsConditions || isSubmitting}
            type="submit"
            className={`mt-6 w-full h-14 rounded-2xl text-white font-medium transition-all ${
              termsConditions && !isSubmitting
                ? "bg-linear-to-r from-[#FF4D6D] to-[#FF335C] shadow-sm cursor-pointer"
                : "bg-[#F5C9D1] text-white/70 cursor-not-allowed opacity-70"
            }`}
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
          </div>
          )}
        </form>
        <div className="mb-8 p-4">
  <div className="flex items-center gap-2">
    <div
      className={`h-2 flex-1 rounded-full ${
        step >= 1
          ? "bg-[#FF4D6D]"
          : "bg-[#EADDDD]"
      }`}
    />

    <div
      className={`h-2 flex-1 rounded-full ${
        step >= 2
          ? "bg-[#FF4D6D]"
          : "bg-[#EADDDD]"
      }`}
    />
  </div>

  <p className="mt-2 text-center text-sm text-[#8A7272]">
    Step {step} of 2
  </p>
</div>

        <p className="mt-8 text-center text-sm text-[#8A7272]">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-[#FF4D6D] font-medium cursor-pointer">
              Sign in
            </span>
          </Link>
        </p>
      </div>
    </main>
  );
}
