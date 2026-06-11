// Editoryal eyebrow etiketi — premium minimalist tipografi.

export default function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block font-clash text-[10px] font-medium uppercase tracking-eyebrow ${className}`}
    >
      {children}
    </span>
  );
}
