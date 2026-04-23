"use client";
import { useState, useMemo } from "react";
import { categories, type Car } from "../data";
import { useInquiries, useToast, useCars } from "../hooks";
import { Navbar } from "../components/Navbar";
import { CatalogSection } from "../components/CatalogSection";
import { AdminInquiryList } from "../components/AdminInquiryList";
import { AddCarModal } from "../components/AddCarModal";
import { Toast } from "../components/Toast";
import { Footer } from "../components/Footer";

export default function AdminPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdminInquiryOpen, setIsAdminInquiryOpen] = useState(true);

  const { cars, addCar, deleteCar } = useCars();
  const { inquiries, deleteInquiry, markInquiryAsRead, approveInquiry, unreadCount } = useInquiries();
  const { toast, showToast } = useToast();

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesCategory = activeCategory === "Semua" || car.category === activeCategory;
      const matchesSearch = 
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        car.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [cars, activeCategory, searchTerm]);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar
        activeSection="admin"
        setActiveSection={() => {}} // No-op for admin navigation
        favoritesCount={0} // No favorites needed in admin view
      />

      <div style={{ paddingTop: 80, paddingBottom: 40, maxWidth: 1280, margin: "0 auto", padding: "80px 16px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 36px)", fontWeight: 800 }}>Admin <span className="gold-text">Dashboard</span></h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Kelola katalog dan lihat permintaan pelanggan.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button 
              className="btn-outline" 
              onClick={() => setIsAdminInquiryOpen(true)}
              style={{ fontSize: 14, padding: "12px 20px", width: "100%", textAlign: "center" }}
            >
              📬 Permintaan ({inquiries.length})
              {unreadCount > 0 && (
                <span style={{ 
                  marginLeft: 8,
                  background: "#ff4757", color: "white", 
                  fontSize: 11, fontWeight: 800, 
                  padding: "2px 8px", borderRadius: 10,
                }}>
                  {unreadCount} baru
                </span>
              )}
            </button>
            <button 
              className="btn-gold" 
              onClick={() => setIsAddModalOpen(true)}
              style={{ fontSize: 14, padding: "12px 20px", width: "100%", textAlign: "center" }}
            >
              + Tambah Mobil Baru
            </button>
          </div>
        </div>

        <hr className="divider-gold" style={{ marginBottom: 32 }} />

        <CatalogSection
          cars={filteredCars}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isFavorite={() => false}
          onToggleFavorite={() => {}}
          onSelectCar={() => {}} 
          isAdmin={true}
          onDeleteCar={deleteCar}
          onAddNew={() => setIsAddModalOpen(true)}
        />
      </div>

      <Footer className="hide-mobile" />

      {isAddModalOpen && (
        <AddCarModal 
          onClose={() => setIsAddModalOpen(false)}
          onAdd={(newCar) => {
            addCar(newCar);
            showToast(`${newCar.name} berhasil ditambahkan!`, "success");
          }}
        />
      )}

      {isAdminInquiryOpen && (
        <AdminInquiryList 
          inquiries={inquiries}
          onDelete={deleteInquiry}
          onMarkAsRead={markInquiryAsRead}
          onApprove={approveInquiry}
          onClose={() => setIsAdminInquiryOpen(false)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
