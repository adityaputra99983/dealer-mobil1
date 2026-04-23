"use client";
import { type Inquiry, formatPrice } from "../data";

interface AdminInquiryListProps {
  inquiries: Inquiry[];
  onDelete: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onApprove: (id: string) => void;
  onClose: () => void;
}

export function AdminInquiryList({ inquiries, onDelete, onMarkAsRead, onApprove, onClose }: AdminInquiryListProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 900, width: "95%", maxHeight: "90vh", overflow: "auto" }}>
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.4rem, 4vw, 28px)", fontWeight: 800 }}>Daftar <span className="gold-text">Permintaan</span></h2>
              <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>{inquiries.length} pesan masuk</p>
            </div>
            <button onClick={onClose} style={{ background: "#1a1a24", border: "1px solid var(--border-subtle)", borderRadius: "50%", width: 36, height: 36, fontSize: 20, color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>

          {inquiries.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
              <p>Belum ada permintaan masuk.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {inquiries.map((inquiry) => (
                <div 
                  key={inquiry.id} 
                  className="glass" 
                  onClick={() => inquiry.status === "unread" && onMarkAsRead(inquiry.id)}
                  style={{ 
                    borderRadius: 12, 
                    padding: 16, 
                    border: inquiry.status === "approved" 
                      ? "1px solid #2ecc71" 
                      : inquiry.status === "unread" 
                        ? "1px solid var(--gold-primary)" 
                        : "1px solid var(--border-subtle)", 
                    background: inquiry.status === "approved" 
                      ? "rgba(46,204,113,0.05)" 
                      : inquiry.status === "unread" 
                        ? "rgba(201,168,76,0.05)" 
                        : "rgba(255,255,255,0.02)",
                    cursor: inquiry.status === "unread" ? "pointer" : "default"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
                    <div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                        <span className="badge-gold" style={{ fontSize: 9 }}>
                          {inquiry.type === "inquiry" ? "INFORMASI" : "TEST DRIVE"}
                        </span>
                        {inquiry.status === "unread" && (
                          <span style={{ background: "#ff4757", color: "white", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4 }}>NEW</span>
                        )}
                        {inquiry.status === "approved" && (
                          <span style={{ background: "#2ecc71", color: "white", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4 }}>OK</span>
                        )}
                      </div>
                      <h3 style={{ fontSize: 16, fontWeight: 700 }}>{inquiry.carName}</h3>
                      <p style={{ color: "var(--text-muted)", fontSize: 11 }}>{new Date(inquiry.date).toLocaleString("id-ID")}</p>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {inquiry.status !== "approved" && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onApprove(inquiry.id); }}
                          style={{ background: "#2ecc71", border: "none", borderRadius: 6, padding: "6px 12px", color: "white", fontSize: 11, fontWeight: 600, cursor: "pointer" }}
                        >
                          ✓ Setuju
                        </button>
                      )}
                      {inquiry.status === "unread" && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onMarkAsRead(inquiry.id); }}
                          style={{ background: "rgba(201,168,76,0.1)", border: "1px solid var(--gold-primary)", borderRadius: 6, padding: "6px 10px", color: "var(--gold-primary)", fontSize: 11, cursor: "pointer" }}
                        >
                          Baca
                        </button>
                      )}
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(inquiry.id); }}
                        style={{ background: "rgba(255,100,100,0.1)", border: "1px solid rgba(255,100,100,0.2)", borderRadius: 6, padding: "6px 10px", color: "#ff6464", fontSize: 11, cursor: "pointer" }}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ display: "grid", gap: 12 }}>
                    <div>
                      <p style={{ color: "var(--text-muted)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Pengirim</p>
                      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{inquiry.name}</p>
                      <p style={{ fontSize: 12, marginBottom: 4 }}>{inquiry.email}</p>
                      <p style={{ fontSize: 12 }}>{inquiry.phone || "-"}</p>
                    </div>
                    <div>
                      <p style={{ color: "var(--text-muted)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Pesan</p>
                      <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: 12, fontSize: 13, lineHeight: 1.5, color: "var(--text-secondary)" }}>
                        {inquiry.message || "(Tidak ada pesan)"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
