# Next.js + .NET Auth Demo

A full-stack authentication demo using Next.js 14 with App Router and .NET 8 backend.

## Features

- 🔐 JWT Authentication
- 👤 User Registration and Login
- 🔄 Role-based Authorization
- 🔒 Protected Routes
- 🖥️ Server-side and Client-side Session Handling
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- NextAuth.js
- Tailwind CSS
- TypeScript
- Axios

### Backend
- .NET 8
- ASP.NET Core Identity
- Entity Framework Core
- SQL Server
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- .NET 8 SDK
- SQL Server
- Docker (optional, for SQL Server)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Update the connection string in `appsettings.json` if needed

3. Run the migrations:
   ```bash
   dotnet ef database update
   ```

4. Start the backend:
   ```bash
   dotnet run
   ```

The API will be available at `https://localhost:7214`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with:
   ```
   NEXTAUTH_SECRET=your-super-secret-key-for-next-auth
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## Project Structure

### Frontend
- `/app` - Next.js 14 app router pages and components
- `/app/api` - API routes including NextAuth configuration
- `/app/auth` - Authentication-related pages (login, register)
- `/app/session` - Session demonstration pages

### Backend
- `/Controllers` - API endpoints
- `/Models` - Data models and DTOs
- `/Data` - Database context and configurations
- `/Services` - Business logic and services

## Features in Detail

### Authentication Flow
1. User registers with email and password
2. User logs in to receive JWT token
3. Token is stored in NextAuth.js session
4. Protected routes check for valid session
5. Role-based access control for admin features

### Role Management
- Users start with "User" role
- Admins can toggle between "User" and "Admin" roles
- Role changes are reflected in real-time
- Server-side role verification for protected endpoints 