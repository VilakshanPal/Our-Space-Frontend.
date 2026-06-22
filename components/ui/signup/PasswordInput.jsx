"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  label,
  registration,
  showStrength = false,
  error,
}) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;

    let score = 0;

    if (pwd.length >= 8) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    return Math.min(score, 5);
  };

  const strength = getPasswordStrength(password);

  const strengthConfig = {
    0: { text: "", color: "#E7DADA" },
    1: { text: "Very Weak", color: "#EF4444" },
    2: { text: "Weak", color: "#F97316" },
    3: { text: "Fair", color: "#F59E0B" },
    4: { text: "Good", color: "#3B82F6" },
    5: { text: "Strong", color: "#FF4D6D" },
  };

  const hasError = Boolean(error);

  return (
    <div>
      <div
        className={`rounded-2xl border bg-white px-4 pt-4 ${
          hasError ? "border-[#F06B6B]" : "border-[#F1E5E5]"
        } ${showStrength ? "pb-4" : "pb-3"}`}
      >
        <div className="relative h-10">
          <Lock className="absolute left-0 top-1/2 -translate-y-1/2 size-5 text-[#FF4D6D]" />

          <input
            type={show ? "text" : "password"}
            {...registration}
            onChange={(e) => {
              setPassword(e.target.value);
              registration?.onChange?.(e);
            }}
            placeholder=" "
            aria-invalid={hasError}
            className="
              peer
              w-full
              pl-8
              pr-8
              pt-4
              text-[15px]
              text-[#2D2020]
              bg-transparent
              outline-none
            "
          />

          <label
            className={`
              absolute
              left-8
              top-1/2
              -translate-y-1/2
              text-sm
              pointer-events-none
              transition-all

              peer-focus:top-0
              peer-focus:text-[11px]
              peer-focus:-translate-y-0

              peer-not-placeholder-shown:top-0
              peer-not-placeholder-shown:text-[11px]
              peer-not-placeholder-shown:-translate-y-0
              ${hasError ? "text-[#C94D4D]" : "text-[#9A8A8A]"}
            `}
          >
            {label}
          </label>

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            {show ? (
              <EyeOff className="size-5 text-[#8B7B7B]" />
            ) : (
              <Eye className="size-5 text-[#8B7B7B]" />
            )}
          </button>
        </div>

        {showStrength && password.length > 0 && (
          <div className="mt-3 ml-8">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div
                  key={bar}
                  className="h-[3px] flex-1 rounded-full"
                  style={{
                    backgroundColor:
                      bar <= strength
                        ? strengthConfig[strength].color
                        : "#EDE2E2",
                  }}
                />
              ))}
            </div>

            <p
              className="mt-2 text-[11px] font-medium"
              style={{ color: strengthConfig[strength].color }}
            >
              {strengthConfig[strength].text}
            </p>
          </div>
        )}
      </div>

      {hasError && (
        <p className="mt-1.5 pl-1 text-[11px] text-[#C94D4D]">{error.message}</p>
      )}
    </div>
  );
}