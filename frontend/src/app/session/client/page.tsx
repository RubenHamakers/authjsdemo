"use client";

import { useSession } from "next-auth/react";

export default function ClientSessionPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 text-black">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Client-Side Session Data</h1>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Session Status</h2>
              <p className="text-gray-700">Current status: {status}</p>
            </div>

            {session && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h2 className="text-lg font-semibold mb-2">Session Data</h2>
                <pre className="bg-gray-100 p-3 rounded overflow-auto">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>
            )}

            {!session && status !== "loading" && (
              <div className="bg-yellow-50 p-4 rounded-md">
                <p className="text-yellow-700">No active session found. Please sign in.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 