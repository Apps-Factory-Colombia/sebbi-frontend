"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Error al registrar usuario.";
        if (errorData && errorData.detail) {
          if (typeof errorData.detail === 'string') {
            errorMessage = errorData.detail;
          } else if (Array.isArray(errorData.detail) && errorData.detail.length > 0 && errorData.detail[0].msg) {
            errorMessage = errorData.detail[0].msg;
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name);

      toast.success("Registro exitoso", {
        description: "¡Su cuenta ha sido creada! Ahora puede iniciar sesión.",
        duration: 3000,
      });

      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);

    } catch (error) {
      toast.error("Error al registrar usuario", {
        description: "Por favor, intente nuevamente con datos diferentes.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Toaster richColors position="bottom-right" />
      {/* Lado Izquierdo: Formulario */}
      <div className="flex flex-col justify-center w-full max-w-md px-8 md:px-12 lg:px-16 bg-white">
        <div className="mb-8 flex items-center gap-2">
          <img src="/sebbi_logo.svg" alt="Sebbi.ai Logo" className="h-12 mb-10" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Crea tu cuenta</h1>
        <p className="text-gray-500 mb-6 text-sm">Registra tus datos para crear una nueva cuenta</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Nombre</label>
            <Input
              type="text"
              placeholder="Juan Pérez"
              className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 text-sm rounded-md h-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
            <Input
              type="email"
              placeholder="correo@ejemplo.com"
              className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 text-sm rounded-md h-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Contraseña</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 text-sm rounded-md h-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 p-1 focus:outline-none"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full  text-white text-sm font-medium py-2 rounded-md shadow-sm transition-colors duration-150 h-10"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Registrarse'
            )}
          </Button>
        </form>

        <p className="text-center text-sm mt-8 text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <a href="/sign-in" className="text-[#2D37CF] hover:text-[#232bc0] font-medium underline">
            Iniciar sesión
          </a>
        </p>
      </div>
      {/* Lado Derecho: Visual */}
      <div className="hidden md:block flex-1 bg-gray-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center h-32 w-32 rounded-full bg-white border-8 border-gray-100 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1" className="text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM3 15l6-6a2 2 0 0 1 2.8 0l6 6" />
              <circle cx="8.5" cy="8.5" r="1.5" />
            </svg>
          </div>
        </div>
        {/* Radial lines para el efecto decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="absolute origin-center w-px h-screen bg-gray-200"
              style={{
                transform: `rotate(${index * 45}deg)`,
                top: '50%',
                left: '50%',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 