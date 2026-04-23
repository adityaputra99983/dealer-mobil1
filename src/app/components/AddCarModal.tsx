"use client";
import { useState } from "react";
import { type Car, categories } from "../data";

interface AddCarModalProps {
  onClose: () => void;
  onAdd: (car: Omit<Car, "id">) => void;
}

export function AddCarModal({ onClose, onAdd }: AddCarModalProps) {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: categories[1], // Default to first non-"Semua"
    price: "",
    year: new Date().getFullYear().toString(),
    engine: "",
    power: "",
    acceleration: "",
    topSpeed: "",
    transmission: "Automatic",
    drivetrain: "AWD",
    fuelType: "Bensin",
    seats: "5",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    description: "",
    features: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...form,
      price: Number(form.price),
      year: Number(form.year),
      seats: Number(form.seats),
      features: form.features.split(",").map(f => f.trim()).filter(f => f !== "")
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 700, width: "95%", maxHeight: "90vh", overflow: "auto" }}>
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>Tambah <span className="gold-text">Mobil Baru</span></h2>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, color: "var(--text-muted)", cursor: "pointer", padding: 4 }}>×</button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Nama Model *</label>
                <input className="input-luxury" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Contoh: Phantom VIII" style={{ fontSize: 14, padding: "10px 12px" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Brand *</label>
                <input className="input-luxury" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} required placeholder="Contoh: Rolls-Royce" style={{ fontSize: 14, padding: "10px 12px" }} />
              </div>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Kategori *</label>
                <select className="select-luxury" value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{ fontSize: 14, padding: "10px 12px" }}>
                  {categories.filter(c => c !== "Semua").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Harga (IDR) *</label>
                <input className="input-luxury" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required placeholder="9500000000" style={{ fontSize: 14, padding: "10px 12px" }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Tahun</label>
                <input className="input-luxury" type="number" value={form.year} onChange={e => setForm({...form, year: e.target.value})} style={{ fontSize: 14, padding: "10px 12px" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>URL Gambar</label>
                <input className="input-luxury" value={form.image} onChange={e => setForm({...form, image: e.target.value})} style={{ fontSize: 14, padding: "10px 12px" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Deskripsi</label>
              <textarea className="input-luxury" style={{ minHeight: 70, fontSize: 14, padding: "10px 12px" }} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Mesin</label>
                <input className="input-luxury" value={form.engine} onChange={e => setForm({...form, engine: e.target.value})} placeholder="6.75L V12" style={{ fontSize: 14, padding: "10px 12px" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Tenaga</label>
                <input className="input-luxury" value={form.power} onChange={e => setForm({...form, power: e.target.value})} placeholder="563 HP" style={{ fontSize: 14, padding: "10px 12px" }} />
              </div>
            </div>
            
            <div>
              <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Fitur (pisahkan dengan koma)</label>
              <input className="input-luxury" value={form.features} onChange={e => setForm({...form, features: e.target.value})} placeholder="Feature 1, Feature 2, Feature 3" style={{ fontSize: 14, padding: "10px 12px" }} />
            </div>

            <button type="submit" className="btn-gold" style={{ marginTop: 8, padding: 14, width: "100%" }}>
              Simpan Mobil
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
