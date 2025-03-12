'use client'
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) { 
      router.push("/auth/login"); // Redirect to login if not authenticated
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || loading) {
    return null; // Or a loading spinner
  }

  return children;
};

export default ProtectedRoute;
