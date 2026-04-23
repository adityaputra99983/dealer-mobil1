"use client";

export function StatsSection() {
  const stats = [
    { number: "150+", label: "Koleksi Mobil" },
    { number: "50+", label: "Brand Premium" },
    { number: "1000+", label: "Pelanggan Puas" },
    { number: "15+", label: "Tahun Pengalaman" },
  ];

  return (
    <section style={{ padding: "80px 24px", background: "var(--bg-secondary)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0 }}>
          {stats.map((stat, i) => (
            <div key={i} className="stat-item" style={{ borderRight: i < stats.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
              <div className="stat-number">{stat.number}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 8, letterSpacing: 1, textTransform: "uppercase" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
