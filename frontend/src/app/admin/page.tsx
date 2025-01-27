"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import https from "https";

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [adminData, setAdminData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (session?.user?.role !== "Admin") {
      router.push("/");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axiosInstance.get("https://localhost:7214/api/protected/admin-data", {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`
          }
        });
        setAdminData(response.data);
      } catch (error: any) {
        console.error("Failed to fetch admin data:", error);
        setError(error.response?.data?.error || "Failed to fetch admin data");
      }
    };

    if (session?.user?.role === "Admin") {
      fetchAdminData();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (session?.user?.role !== "Admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">Access Denied: Admin only area</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          
          <div className="space-y-4">
            {error ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-md">
                {error}
              </div>
            ) : adminData ? (
              <div className="bg-gray-50 p-4 rounded-md">
                <h2 className="text-lg font-semibold mb-2">Admin Data</h2>
                <pre className="bg-gray-100 p-3 rounded overflow-auto">
                  {JSON.stringify(adminData, null, 2)}
                </pre>
              </div>
            ) : (
              <p>Loading admin data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 