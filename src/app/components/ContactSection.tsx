"use client";
import { useState } from "react";
import { type Car, type Inquiry } from "../data";

interface ContactSectionProps {
  cars: Car[];
  addInquiry: (inquiry: Omit<Inquiry, "id" | "date">) => Inquiry;
  showToast: (msg: string, type?: "success" | "info") => void;
}

export function ContactSection({ cars, addInquiry, showToast }: ContactSectionProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", carId: "", message: "", type: "inquiry" as "inquiry" | "testdrive" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.carId) {
      showToast("Mohon isi semua bidang wajib", "info");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const car = cars.find((c) => c.id === Number(form.carId));
      addInquiry({ carId: Number(form.carId), carName: car?.name ?? "", name: form.name, email: form.email, phone: form.phone, message: form.message, type: form.type, status: "unread" });
      showToast("Pesan berhasil dikirim! Kami akan menghubungi Anda segera.", "success");
      setForm({ name: "", email: "", phone: "", carId: "", message: "", type: "inquiry" });
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="contact" style={{ padding: "80px 16px", background: "var(--bg-primary)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p className="section-subtitle">Hubungi Kami</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, marginBottom: 12 }}>
            Mulai <span className="gold-text">Perjalanan</span> Anda
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Konsultasi gratis dengan tim ahli kami.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
          <div>
            <div className="glass" style={{ borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--gold-primary)" }}>Informasi Kontak</h3>
              {[
                { icon: "📍", title: "Alamat", value: "Jl. Sudirman No. 88\nJakarta Pusat" },
                { icon: "📞", title: "Telepon", value: "+62 21 5555 8888" },
                { icon: "✉️", title: "Email", value: "info@luxeauto.id" },
                { icon: "🕐", title: "Jam Kerja", value: "Senin–Jumat: 09:00–20:00" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 20, width: 32, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ color: "var(--text-muted)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>{item.title}</p>
                    <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-line" }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="glass" style={{ borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Nama Lengkap *</label>
                <input id="contact-name" className="input-luxury" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required style={{ padding: "12px 14px", fontSize: 14 }} />
              </div>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Email *</label>
                <input id="contact-email" type="email" className="input-luxury" placeholder="john@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required style={{ padding: "12px 14px", fontSize: 14 }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Telepon</label>
                <input id="contact-phone" className="input-luxury" placeholder="+62 812 ..." value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ padding: "12px 14px", fontSize: 14 }} />
              </div>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Pilih Mobil *</label>
                <select id="contact-car" className="select-luxury" value={form.carId} onChange={(e) => setForm({ ...form, carId: e.target.value })} required style={{ padding: "12px 14px", fontSize: 14 }}>
                  <option value="">-- Pilih Kendaraan --</option>
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>{car.brand} {car.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Jenis Permintaan</label>
              <div style={{ display: "flex", gap: 10 }}>
                {[{ value: "inquiry", label: "Informasi" }, { value: "testdrive", label: "Test Drive" }].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`filter-tab ${form.type === opt.value ? "active" : ""}`}
                    onClick={() => setForm({ ...form, type: opt.value as "inquiry" | "testdrive" })}
                    style={{ flex: 1, fontSize: 13 }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Pesan</label>
              <textarea id="contact-message" className="input-luxury" placeholder="Tulis pesan Anda..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ minHeight: 100, resize: "vertical", fontFamily: "inherit", padding: "12px 14px", fontSize: 14 }} />
            </div>
            <button id="contact-submit" type="submit" className="btn-gold" disabled={loading} style={{ fontSize: 14, padding: "14px", marginTop: 4, opacity: loading ? 0.7 : 1, width: "100%" }}>
              {loading ? "Mengirim..." : "Kirim Pesan →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
