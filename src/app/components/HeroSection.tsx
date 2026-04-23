"use client";

export function HeroSection() {
  return (
    <section id="home" style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=80"
          alt="Luxury car hero"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="hero-gradient" style={{ position: "absolute", inset: 0 }} />
      </div>
      <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 24px" }}>
        <div className="animate-fade-in-up" style={{ opacity: 0 }}>
          <span className="badge-gold" style={{ marginBottom: 24, display: "inline-block" }}>PREMIUM SHOWROOM</span>
        </div>
        <h1 className="animate-fade-in-up delay-200" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20, opacity: 0, maxWidth: 800 }}>
          <span style={{ color: "var(--text-primary)" }}>Temukan Mobil </span>
          <span className="gold-text-animate">Impian Anda</span>
        </h1>
        <p className="animate-fade-in-up delay-300" style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--text-secondary)", maxWidth: 600, marginBottom: 40, lineHeight: 1.7, opacity: 0 }}>
          Koleksi eksklusif mobil mewah dan eksotis terbaik dunia. Pengalaman berkendara yang tak terlupakan dimulai di sini.
        </p>
        <div className="animate-fade-in-up delay-400" style={{ display: "flex", gap: 12, opacity: 0, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#catalog" className="btn-gold" style={{ textDecoration: "none", fontSize: 14, padding: "12px 24px" }}>
            Jelajahi Koleksi
          </a>
          <a href="#contact" className="btn-outline" style={{ textDecoration: "none", fontSize: 14, padding: "12px 24px" }}>
            Hubungi Kami
          </a>
        </div>
      </div>
      <div className="animate-fade-in delay-600" style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", opacity: 0 }}>
        <div style={{ width: 24, height: 40, border: "2px solid var(--gold-primary)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 8 }}>
          <div style={{ width: 3, height: 8, background: "var(--gold-primary)", borderRadius: 2, animation: "float 2s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
