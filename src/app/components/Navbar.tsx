"use client";

import { useState } from "react";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (s: string) => void;
  favoritesCount: number;
}

export function Navbar({ activeSection, setActiveSection, favoritesCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Beranda", href: "/#home" },
    { id: "catalog", label: "Katalog", href: "/#catalog" },
    { id: "favorites", label: "Favorit", href: "/#favorites" },
    { id: "contact", label: "Kontak", href: "/#contact" },
  ];

  return (
    <nav className="glass" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "0 12px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold-dark), var(--gold-light))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#0a0a0f" }}>L</div>
          <span className="hide-mobile" style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1.5, color: "var(--gold-primary)" }}>LUXE AUTO</span>
        </a>
        
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={() => setActiveSection(item.id)}
              style={{ position: "relative" }}
            >
              {item.label}
              {item.id === "favorites" && favoritesCount > 0 && (
                <span style={{
                  position: "absolute", top: 2, right: 2,
                  background: "var(--gold-primary)", color: "#0a0a0f",
                  fontSize: 10, fontWeight: 700, width: 16, height: 16,
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {favoritesCount}
                </span>
              )}
            </a>
          ))}
          <div style={{ width: 1, height: 20, background: "var(--border-subtle)", margin: "0 8px" }} />
          <a 
            href="/admin"
            className="nav-link"
            style={{ 
              background: "rgba(255,255,255,0.05)",
              color: "var(--text-secondary)",
              border: "none",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
              textDecoration: "none"
            }}
          >
            Owner
          </a>
        </div>

        <button
          className="hide-desktop"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 8,
            color: "var(--gold-primary)",
            fontSize: 18,
            cursor: "pointer",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 40,
            minHeight: 40,
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileMenuOpen && (
        <div 
          className="hide-desktop"
          style={{
            position: "absolute",
            top: 64,
            left: 0,
            right: 0,
            background: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            animation: "fadeIn 0.3s ease-out",
            zIndex: 49,
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={() => {
                setActiveSection(item.id);
                setMobileMenuOpen(false);
              }}
              style={{ 
                position: "relative",
                padding: "14px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 16,
                borderRadius: 8,
              }}
            >
              {item.label}
              {item.id === "favorites" && favoritesCount > 0 && (
                <span style={{
                  background: "var(--gold-primary)", color: "#0a0a0f",
                  fontSize: 11, fontWeight: 700, width: 20, height: 20,
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {favoritesCount}
                </span>
              )}
            </a>
          ))}
          <div style={{ height: 1, background: "var(--border-subtle)", margin: "8px 0" }} />
          <a 
            href="/admin"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
            style={{ 
              background: "rgba(255,255,255,0.05)",
              color: "var(--text-secondary)",
              border: "none",
              borderRadius: 8,
              padding: "14px 16px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Owner Panel
          </a>
        </div>
      )}
    </nav>
  );
}