"use client";
import { type Car, formatPrice } from "../data";
import { useState } from "react";

interface CarCardProps {
  car: Car;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onSelect: (car: Car) => void;
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
}

function CarCard({ car, isFavorite, onToggleFavorite, onSelect, isAdmin, onDelete }: CarCardProps) {
  return (
    <div className="car-card" onClick={() => onSelect(car)} style={{ position: "relative" }}>
      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
        <img
          src={car.image}
          alt={car.name}
          className="car-card-img"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)" }} />
        
        <div style={{ position: "absolute", top: 14, right: 14, display: "flex", gap: 8 }}>
          {isAdmin && onDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); if(confirm("Hapus mobil ini?")) onDelete(car.id); }}
              style={{
                background: "rgba(255,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%", width: 38, height: 38,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: 16, color: "white"
              }}
              title="Hapus Mobil"
            >
              🗑
            </button>
          )}
          <button
            className={`heart-btn ${isFavorite ? "active" : ""}`}
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(car.id); }}
            style={{
              background: isFavorite ? "rgba(201,168,76,0.2)" : "rgba(0,0,0,0.4)",
              border: `1px solid ${isFavorite ? "var(--gold-primary)" : "rgba(255,255,255,0.2)"}`,
              borderRadius: "50%", width: 38, height: 38,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 16,
            }}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>

        <span className="badge-gold" style={{ position: "absolute", top: 14, left: 14, fontSize: 11 }}>
          {car.fuelType}
        </span>
        <span style={{ position: "absolute", bottom: 14, left: 14, color: "#fff", fontSize: 12, fontWeight: 500, backgroundColor: "rgba(0,0,0,0.4)", padding: "3px 10px", borderRadius: 20 }}>
          {car.year}
        </span>
      </div>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <p style={{ color: "var(--text-muted)", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>{car.brand}</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{car.name}</h3>
          </div>
          <span style={{ fontSize: 11, color: "var(--text-muted)", background: "var(--bg-secondary)", padding: "4px 10px", borderRadius: 20 }}>{car.category}</span>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
          {car.description}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[
            { icon: "⚡", label: car.power },
            { icon: "🏎", label: car.acceleration },
          ].map((spec, i) => (
            <div key={i} style={{ background: "var(--bg-secondary)", borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>{spec.icon}</span>
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{spec.label}</span>
            </div>
          ))}
        </div>
        <hr className="divider-gold" style={{ marginBottom: 16 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ color: "var(--text-muted)", fontSize: 11 }}>Harga Mulai</p>
            <p className="gold-text" style={{ fontSize: 16, fontWeight: 700 }}>{formatPrice(car.price)}</p>
          </div>
          <button className="btn-gold" style={{ fontSize: 13, padding: "8px 18px" }}>
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}

interface CatalogSectionProps {
  cars: Car[];
  categories: string[];
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  onSelectCar: (car: Car) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  isAdmin?: boolean;
  onDeleteCar?: (id: number) => void;
  onAddNew?: () => void;
}

export function CatalogSection({ 
  cars, categories, activeCategory, setActiveCategory, 
  isFavorite, onToggleFavorite, onSelectCar,
  searchTerm, setSearchTerm, isAdmin, onDeleteCar, onAddNew
}: CatalogSectionProps) {
  return (
    <section id="catalog" style={{ padding: "80px 16px", background: "var(--bg-primary)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p className="section-subtitle">Koleksi Eksklusif</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, marginBottom: 16 }}>
            Temukan <span className="gold-text">Kendaraan</span> Anda
          </h2>
          
          <div style={{ maxWidth: 600, margin: "24px auto 0", position: "relative" }}>
            <input 
              type="text" 
              className="input-luxury" 
              placeholder="Cari brand atau model..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: 44, height: 50, borderRadius: 25, fontSize: 14 }}
            />
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18, opacity: 0.5 }}>🔍</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              style={{ padding: "8px 16px", fontSize: 13 }}
            >
              {cat}
            </button>
          ))}
          {isAdmin && (
            <button
              className="btn-gold"
              onClick={onAddNew}
              style={{ borderRadius: 20, padding: "8px 16px", fontSize: 13, marginLeft: 8 }}
            >
              + Tambah
            </button>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isFavorite={isFavorite(car.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectCar}
              isAdmin={isAdmin}
              onDelete={onDeleteCar}
            />
          ))}
        </div>
        {cars.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>🔍</p>
            <p style={{ fontSize: 16 }}>Tidak ada mobil ditemukan</p>
            <button onClick={() => { setSearchTerm(""); setActiveCategory("Semua"); }} style={{ marginTop: 12, background: "none", border: "none", color: "var(--gold-primary)", cursor: "pointer", textDecoration: "underline", fontSize: 14 }}>Reset</button>
          </div>
        )}
      </div>
    </section>
  );
}
