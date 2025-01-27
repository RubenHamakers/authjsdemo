import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      role?: string;
      token?: string;
    };
  }

  interface User {
    name: string;
    email: string;
    role: string;
    token: string;
  }
} 