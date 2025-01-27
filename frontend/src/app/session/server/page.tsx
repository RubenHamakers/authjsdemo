import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ServerSessionPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 text-black">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Server-Side Session Data</h1>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">User Information</h2>
              <div className="space-y-2">
                <p><strong>Email:</strong> {session.user?.email}</p>
                <p><strong>Role:</strong> {session.user?.role || 'No role assigned'}</p>
                <p><strong>Name:</strong> {session.user?.name || 'No name set'}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Raw Session Data</h2>
              <pre className="bg-gray-100 p-3 rounded overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-blue-700">
                This page is rendered on the server side. If you can see this, you are authenticated!
              </p>
              {session.user?.role === 'Admin' && (
                <p className="text-blue-700 mt-2">
                  You have admin privileges! 🔑
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 