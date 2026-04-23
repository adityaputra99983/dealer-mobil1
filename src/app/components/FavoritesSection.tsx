"use client";
import { type Car, formatPrice } from "../data";

interface FavoritesSectionProps {
  favoriteCars: Car[];
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  onSelectCar: (car: Car) => void;
}

export function FavoritesSection({ favoriteCars, isFavorite, onToggleFavorite, onSelectCar }: FavoritesSectionProps) {
  return (
    <section id="favorites" style={{ padding: "100px 24px", background: "var(--bg-secondary)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="section-subtitle">Pilihan Anda</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, marginBottom: 16 }}>
            Koleksi <span className="gold-text">Favorit</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>
            {favoriteCars.length > 0
              ? `${favoriteCars.length} kendaraan dalam daftar favorit Anda.`
              : "Belum ada favorit. Tambahkan dengan menekan ikon ♡ pada kartu mobil."}
          </p>
        </div>

        {favoriteCars.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 80, marginBottom: 20, opacity: 0.3 }}>♡</div>
            <p style={{ color: "var(--text-muted)", fontSize: 16 }}>Daftar favorit Anda masih kosong</p>
            <a href="#catalog" className="btn-outline" style={{ display: "inline-block", marginTop: 24, textDecoration: "none" }}>
              Jelajahi Katalog
            </a>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
            {favoriteCars.map((car) => (
              <div
                key={car.id}
                className="glass"
                style={{ borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "all 0.3s ease", display: "flex" }}
                onClick={() => onSelectCar(car)}
              >
                <div style={{ width: 140, flexShrink: 0, overflow: "hidden" }}>
                  <img
                    src={car.image}
                    alt={car.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  />
                </div>
                <div style={{ padding: "16px 18px", flex: 1 }}>
                  <p style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>{car.brand}</p>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{car.name}</h3>
                  <p className="gold-text" style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{formatPrice(car.price)}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className="btn-gold"
                      style={{ fontSize: 12, padding: "6px 14px", flex: 1 }}
                      onClick={(e) => { e.stopPropagation(); onSelectCar(car); }}
                    >
                      Detail
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleFavorite(car.id); }}
                      style={{ background: "rgba(201,168,76,0.1)", border: "1px solid var(--border-gold)", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "var(--gold-primary)", fontSize: 14 }}
                    >
                      ♥
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
