"use client";

export function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={className} style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 16px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24, marginBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold-dark), var(--gold-light))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#0a0a0f" }}>L</div>
              <span className="gold-text" style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2 }}>LUXE AUTO</span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6 }}>
              Showroom mobil premium terdepan di Indonesia.
            </p>
          </div>
          <div>
            <h4 style={{ color: "var(--gold-primary)", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Menu</h4>
            {["Beranda", "Katalog", "Favorit", "Kontak"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ display: "block", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13, padding: "4px 0" }}>{item}</a>
            ))}
          </div>
          <div>
            <h4 style={{ color: "var(--gold-primary)", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Kontak</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>📍 Jl. Sudirman No. 88</span>
              <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>📞 +62 21 5555 8888</span>
              <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>✉️ info@luxeauto.id</span>
            </div>
          </div>
          <div>
            <h4 style={{ color: "var(--gold-primary)", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Jam Buka</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>Senin - Jumat: 09:00 - 20:00</span>
              <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>Sabtu: 10:00 - 18:00</span>
            </div>
          </div>
        </div>
        <hr className="divider-gold" style={{ marginBottom: 20 }} />
        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 12 }}>
          © 2024 LUXE AUTO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
