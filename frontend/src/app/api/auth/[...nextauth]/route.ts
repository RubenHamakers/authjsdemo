import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import https from "https";
import jwt from 'jsonwebtoken';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

// Create axios instance with SSL certificate validation disabled
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }
        
        try {
          console.log("Attempting login with email:", credentials.email);
          const response = await axiosInstance.post("https://localhost:7214/api/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          console.log("Login response:", response.data);
          const { token, email, roles } = response.data;
          
          if (token) {
            return {
              id: email,
              name: email,
              email: email,
              role: roles[0] || "User",
              token: token,
            };
          }
          return null;
        } catch (error: any) {
          console.error("Auth error:", error.response?.data || error.message);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback - Token:", token, "User:", user);
      if (user) {
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log("Session Callback - Session:", session, "Token:", token);
      if (token && session.user) {
        session.user.role = token.role;
        session.user.token = token.token;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-super-secret-key-for-next-auth",
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 