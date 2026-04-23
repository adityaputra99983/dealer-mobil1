"use client";
import { useState, useEffect, useCallback } from "react";
import { cars as initialCars, type Car, type Inquiry } from "./data";

export function useCars() {
  const [cars, setCars] = useState<Car[]>(initialCars);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("luxe_cars");
      if (stored) {
        setCars(JSON.parse(stored));
      } else {
        localStorage.setItem("luxe_cars", JSON.stringify(initialCars));
      }
    } catch (e) {
      console.error("Failed to load cars", e);
    }
  }, []);

  const addCar = useCallback((car: Omit<Car, "id">) => {
    const newCar: Car = {
      ...car,
      id: Date.now(), // Simple unique ID
    };
    setCars((prev) => {
      const next = [newCar, ...prev];
      localStorage.setItem("luxe_cars", JSON.stringify(next));
      return next;
    });
    return newCar;
  }, []);

  const updateCar = useCallback((id: number, updatedData: Partial<Car>) => {
    setCars((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c));
      localStorage.setItem("luxe_cars", JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteCar = useCallback((id: number) => {
    setCars((prev) => {
      const next = prev.filter((c) => c.id !== id);
      localStorage.setItem("luxe_cars", JSON.stringify(next));
      return next;
    });
  }, []);

  return { cars, addCar, updateCar, deleteCar };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("luxe_favorites");
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  const toggleFavorite = useCallback((carId: number | undefined) => {
    if (carId === undefined) return;
    setFavorites((prev) => {
      const next = prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId];
      localStorage.setItem("luxe_favorites", JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (carId: number | undefined) => (carId === undefined ? false : favorites.includes(carId)),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("luxe_inquiries");
      if (stored) setInquiries(JSON.parse(stored));
    } catch {}
  }, []);

  const addInquiry = useCallback((inquiry: Omit<Inquiry, "id" | "date" | "status">) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      date: new Date().toISOString(),
      status: "unread",
    };
    setInquiries((prev) => {
      const next = [newInquiry, ...prev];
      localStorage.setItem("luxe_inquiries", JSON.stringify(next));
      return next;
    });
    return newInquiry;
  }, []);

  const markInquiryAsRead = useCallback((id: string) => {
    setInquiries((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, status: "read" as const } : i));
      localStorage.setItem("luxe_inquiries", JSON.stringify(next));
      return next;
    });
  }, []);

  const approveInquiry = useCallback((id: string) => {
    setInquiries((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, status: "approved" as const } : i));
      localStorage.setItem("luxe_inquiries", JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteInquiry = useCallback((id: string) => {
    setInquiries((prev) => {
      const next = prev.filter((i) => i.id !== id);
      localStorage.setItem("luxe_inquiries", JSON.stringify(next));
      return next;
    });
  }, []);

  const unreadCount = inquiries.filter((i) => i.status === "unread").length;

  return { inquiries, addInquiry, deleteInquiry, markInquiryAsRead, approveInquiry, unreadCount };
}

export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info";
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "info" = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  return { toast, showToast };
}

