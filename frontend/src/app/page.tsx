"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import https from "https";

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

export default function Home() {
  const { data: session, status, update } = useSession();

  const handleToggleRole = async () => {
    try {
      console.log("Attempting to toggle role for email:", session?.user?.email);
      const response = await axiosInstance.get(`https://localhost:7214/api/Auth/toggle-role?email=${encodeURIComponent(session?.user?.email || '')}`);
      console.log("Role toggle response:", response.data);
      // Update the session to reflect the new role
      await update();
    } catch (error: any) {
      console.error("Failed to toggle role:", {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Auth.js Test</h1>
              </div>
              {session && (
                <div className="ml-6 flex items-center space-x-4">
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/session/client"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Client Session
                  </Link>
                  <Link
                    href="/session/server"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Server Session
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center text-black">
              {status === "loading" ? (
                <p>Loading...</p>
              ) : session ? (
                <div className="flex items-center space-x-4">
                  <span>Welcome, {session.user?.name}!</span>
                  <span className="text-sm text-gray-500">Role: {session.user?.role}</span>
                  <button
                    onClick={handleToggleRole}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Toggle Admin Role
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center text-black">
            {status === "loading" ? (
              <p>Loading...</p>
            ) : session ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Protected Content</h2>
                <p>You are viewing this because you are authenticated.</p>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Welcome</h2>
                <p>Please sign in to view protected content.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
