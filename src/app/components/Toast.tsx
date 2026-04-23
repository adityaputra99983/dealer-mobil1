"use client";

interface ToastProps {
  message: string;
  type: "success" | "info";
}

export function Toast({ message, type }: ToastProps) {
  return (
    <div className="toast glass-gold" style={{ padding: "14px 24px", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 18 }}>{type === "success" ? "✓" : "★"}</span>
      <span style={{ color: "var(--gold-light)", fontSize: 14, fontWeight: 500 }}>{message}</span>
    </div>
  );
}
