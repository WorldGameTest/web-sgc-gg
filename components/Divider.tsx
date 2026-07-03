export function Divider() {
  return (
    <div
      aria-hidden="true"
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(90deg, rgba(52,211,153,0) 0%, rgba(52,211,153,0.3) 50%, rgba(52,211,153,0) 100%), linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.08) 8%, rgba(148,163,184,0.08) 92%, transparent 100%)",
      }}
    />
  );
}
