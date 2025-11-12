import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "User Manager",
  description: "Painel de gerenciamento de usuários",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center">
        <header className="w-full bg-white shadow-md p-4">
          <h1 className="text-2xl font-semibold text-center text-indigo-600">
            Painel de Usuários
          </h1>
        </header>
        <main className="flex-1 w-full max-w-5xl p-6">{children}</main>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
            success: {
              style: { background: "#16a34a" },
            },
            error: {
              style: { background: "#dc2626" },
            },
          }}
        />
      </body>
    </html>
  );
}
