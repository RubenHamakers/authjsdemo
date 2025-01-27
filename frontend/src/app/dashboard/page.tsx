"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [protectedData, setProtectedData] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetch("/api/protected");
        const data = await response.json();
        setProtectedData(data.content);
      } catch (error) {
        console.error("Failed to fetch protected data:", error);
      }
    };

    if (session) {
      fetchProtectedData();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Session Info</h2>
              <pre className="bg-gray-100 p-3 rounded overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Protected Data</h2>
              <p>{protectedData || "Loading protected data..."}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Session Status</h2>
              <p>Current status: {status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 