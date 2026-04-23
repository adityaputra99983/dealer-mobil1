"use client";
import { useState } from "react";
import { type Car, type Inquiry, formatPrice } from "../data";

interface CarModalProps {
  car: Car;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  addInquiry: (inquiry: Omit<Inquiry, "id" | "date" | "status">) => Inquiry;
  showToast: (msg: string, type?: "success" | "info") => void;
}

export function CarModal({ car, onClose, isFavorite, onToggleFavorite, addInquiry, showToast }: CarModalProps) {
  const [tab, setTab] = useState<"overview" | "specs" | "inquiry">("overview");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", type: "inquiry" as "inquiry" | "testdrive" });
  const [loading, setLoading] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { showToast("Nama dan email wajib diisi", "info"); return; }
    setLoading(true);
    setTimeout(() => {
      addInquiry({ carId: car.id, carName: car.name, name: form.name, email: form.email, phone: form.phone, message: form.message, type: form.type });
      showToast(`Permintaan untuk ${car.name} berhasil dikirim!`, "success");
      setForm({ name: "", email: "", phone: "", message: "", type: "inquiry" });
      setLoading(false);
      onClose();
    }, 800);
  };

  const specs = [
    { label: "Mesin", value: car.engine },
    { label: "Tenaga", value: car.power },
    { label: "Akselerasi", value: car.acceleration },
    { label: "Kecepatan Maks", value: car.topSpeed },
    { label: "Transmisi", value: car.transmission },
    { label: "Penggerak", value: car.drivetrain },
    { label: "Bahan Bakar", value: car.fuelType },
    { label: "Kursi", value: `${car.seats} orang` },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 20, right: 20, zIndex: 10, background: "rgba(0,0,0,0.5)", border: "1px solid var(--border-subtle)", borderRadius: "50%", width: 38, height: 38, cursor: "pointer", color: "var(--text-secondary)", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}
        >×</button>

        <div style={{ position: "relative", height: 300, overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
          <img src={car.image} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, var(--bg-secondary) 100%)" }} />
          <div style={{ position: "absolute", bottom: 24, left: 32 }}>
            <p style={{ color: "var(--text-muted)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{car.brand} · {car.year}</p>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{car.name}</h2>
            <p className="gold-text" style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>{formatPrice(car.price)}</p>
          </div>
          <button
            className={`heart-btn ${isFavorite ? "active" : ""}`}
            onClick={onToggleFavorite}
            style={{ position: "absolute", bottom: 24, right: 32, background: isFavorite ? "rgba(201,168,76,0.2)" : "rgba(0,0,0,0.4)", border: `1px solid ${isFavorite ? "var(--gold-primary)" : "rgba(255,255,255,0.2)"}`, borderRadius: "50%", width: 46, height: 46, cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>

        <div style={{ padding: "0 32px 32px" }}>
          <div style={{ display: "flex", gap: 4, margin: "28px 0 28px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: 0 }}>
            {(["overview", "specs", "inquiry"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{ padding: "10px 22px", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: tab === t ? "var(--gold-primary)" : "var(--text-muted)", borderBottom: `2px solid ${tab === t ? "var(--gold-primary)" : "transparent"}`, transition: "all 0.2s", textTransform: "capitalize", letterSpacing: 0.5, marginBottom: -1 }}
              >
                {t === "overview" ? "Deskripsi" : t === "specs" ? "Spesifikasi" : "Hubungi Kami"}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <div className="animate-fade-in">
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 28, fontSize: 15 }}>{car.description}</p>
              <h4 style={{ color: "var(--gold-primary)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Fitur Unggulan</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
                {car.features.map((f, i) => (
                  <div key={i} className="glass-gold" style={{ padding: "10px 14px", borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "var(--gold-primary)", fontSize: 14 }}>✦</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "specs" && (
            <div className="animate-fade-in">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {specs.map((s, i) => (
                  <div key={i} style={{ background: "var(--bg-card)", borderRadius: 12, padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{s.label}</span>
                    <span style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "inquiry" && (
            <form onSubmit={handleInquiry} className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Nama *</label>
                  <input id="modal-name" className="input-luxury" placeholder="Nama Anda" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Email *</label>
                  <input id="modal-email" type="email" className="input-luxury" placeholder="email@anda.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Telepon</label>
                <input id="modal-phone" className="input-luxury" placeholder="+62 ..." value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Jenis</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {[{ value: "inquiry", label: "Informasi Harga" }, { value: "testdrive", label: "Test Drive" }].map((opt) => (
                    <button key={opt.value} type="button" className={`filter-tab ${form.type === opt.value ? "active" : ""}`} style={{ flex: 1 }} onClick={() => setForm({ ...form, type: opt.value as "inquiry" | "testdrive" })}>{opt.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Pesan</label>
                <textarea id="modal-message" className="input-luxury" placeholder="Pertanyaan atau permintaan khusus..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ minHeight: 90, resize: "none", fontFamily: "inherit" }} />
              </div>
              <button id="modal-submit" type="submit" className="btn-gold" disabled={loading} style={{ padding: "13px", fontSize: 15, opacity: loading ? 0.7 : 1 }}>
                {loading ? "Mengirim..." : `Kirim Permintaan untuk ${car.name}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
