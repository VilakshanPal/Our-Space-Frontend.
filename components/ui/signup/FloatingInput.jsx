export default function FloatingInput({
  id,
  registration,
  label,
  icon: Icon,
  type = "text",
  error,
  status,
}) {
  const hasError = Boolean(error);

  const statusColor =
    status?.type === "success"
      ? "text-[#1F7A45]"
      : status?.type === "checking"
      ? "text-[#8A7272]"
      : "text-[#C94D4D]";

  return (
    <div>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#FF4D6D]" />

        <input
          {...registration}
          id={id}
          type={type}
          placeholder=" "
          aria-invalid={hasError}
          className={`
            peer
            w-full
            h-14
            rounded-2xl
            border
            bg-white
            pl-12
            pr-4
            pt-5
            pb-1
            text-sm
            text-[#2D2020]
            outline-none
            transition-colors
            ${
              hasError
                ? "border-[#F06B6B] focus:border-[#F06B6B]"
                : "border-[#F1E5E5] focus:border-[#FF4D6D]"
            }
          `}
        />

        <label
          htmlFor={id}
          className={`
            absolute
            left-12
            top-1/2
            -translate-y-1/2
            text-sm
            pointer-events-none
            transition-all
            duration-200

            peer-focus:top-2
            peer-focus:text-[11px]
            peer-focus:-translate-y-0

            peer-not-placeholder-shown:top-2
            peer-not-placeholder-shown:text-[11px]
            peer-not-placeholder-shown:-translate-y-0
            ${
              hasError
                ? "text-[#C94D4D]"
                : "text-[#9A8A8A]"
            }
          `}
        >
          {label}
        </label>
      </div>

      {hasError && (
        <p className="mt-1.5 pl-1 text-[11px] text-[#C94D4D]">{error.message}</p>
      )}

      {!hasError && status?.message && (
        <p className={`mt-1.5 pl-1 text-[11px] ${statusColor}`}>
          {status.message}
        </p>
      )}
    </div>
  );
}