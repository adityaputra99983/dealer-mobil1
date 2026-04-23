"use client";
import { useState, useMemo } from "react";
import { categories, type Car } from "./data";
import { useFavorites, useInquiries, useToast, useCars } from "./hooks";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { StatsSection } from "./components/StatsSection";
import { CatalogSection } from "./components/CatalogSection";
import { CarModal } from "./components/CarModal";
import { FavoritesSection } from "./components/FavoritesSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { Toast } from "./components/Toast";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [activeSection, setActiveSection] = useState("home");

  const { cars } = useCars();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { addInquiry } = useInquiries();
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

  const favoriteCars = useMemo(() => {
    return cars.filter((c) => favorites.includes(c.id));
  }, [cars, favorites]);

  const handleToggleFavorite = (carId: number) => {
    const wasFavorite = isFavorite(carId);
    toggleFavorite(carId);
    const car = cars.find((c) => c.id === carId);
    if (car) {
      showToast(
        wasFavorite
          ? `${car.name} dihapus dari favorit`
          : `${car.name} ditambahkan ke favorit`,
        "info"
      );
    }
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        favoritesCount={favorites.length}
      />

      <HeroSection />
      <StatsSection />

      <CatalogSection
        cars={filteredCars}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        onSelectCar={(car: Car) => setSelectedCar(car)}
      />

      <FavoritesSection
        favoriteCars={favoriteCars}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        onSelectCar={(car: Car) => setSelectedCar(car)}
      />

      <ContactSection
        cars={cars}
        addInquiry={addInquiry}
        showToast={showToast}
      />

      <Footer />

      {selectedCar && (
        <CarModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          isFavorite={isFavorite(selectedCar.id)}
          onToggleFavorite={() => handleToggleFavorite(selectedCar.id)}
          addInquiry={addInquiry}
          showToast={showToast}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}


