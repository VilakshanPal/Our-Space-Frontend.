export default function SocialButton({
  children,
  icon,
}) {
  return (
    <button
      className="
        w-full
        h-14
        rounded-2xl
        border
        border-[#F1E5E5]
        bg-white
        flex
        items-center
        justify-center
        gap-3
        text-[#3A2F2F]
        text-sm
        font-medium
      "
    >
      {icon}
      {children}
    </button>
  );
}