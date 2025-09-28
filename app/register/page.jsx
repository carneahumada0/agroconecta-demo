
"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { User, Leaf, Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function Register() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    farm: '',
    password: '',
    confirmPassword: ''
  })

  const handleRegister = async (e) => {
    e.preventDefault()
    
    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    try {
      // Aquí iría la conexión con el backend
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.")
        router.push("/login")
      } else {
        alert("Error en el registro")
      }
    } catch (error) {
      alert("Error de conexión")
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4">
      <Image
        src="https://images.unsplash.com/photo-1693452968861-d43fd1621b04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Campo agrícola"
        fill
        className="object-cover brightness-70 -z-10"
      />

      <Card className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Leaf className="h-8 w-8 text-green-700" />
            </div>
            <h1 className="text-3xl font-bold text-green-900">Crear Cuenta</h1>
            <p className="text-gray-700 text-sm">Regístrate en AgroConecta</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-green-900">Nombre Completo</label>
              <div className="flex items-center gap-3 border border-green-300 rounded-lg px-3 py-3 bg-white/50 mt-1">
                <User className="text-green-600" size={20} />
                <Input
                  required
                  placeholder="Tu nombre completo"
                  className="border-0 bg-transparent p-0"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-green-900">Email</label>
              <div className="flex items-center gap-3 border border-green-300 rounded-lg px-3 py-3 bg-white/50 mt-1">
                <Mail className="text-green-600" size={20} />
                <Input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="border-0 bg-transparent p-0"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-green-900">Nombre de la Finca</label>
              <div className="flex items-center gap-3 border border-green-300 rounded-lg px-3 py-3 bg-white/50 mt-1">
                <Leaf className="text-green-600" size={20} />
                <Input
                  required
                  placeholder="Nombre de tu finca"
                  className="border-0 bg-transparent p-0"
                  value={formData.farm}
                  onChange={(e) => setFormData({...formData, farm: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-green-900">Contraseña</label>
              <div className="flex items-center gap-3 border border-green-300 rounded-lg px-3 py-3 bg-white/50 mt-1">
                <Lock className="text-green-600" size={20} />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Mínimo 6 caracteres"
                  className="border-0 bg-transparent p-0 flex-1"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-green-900">Confirmar Contraseña</label>
              <div className="flex items-center gap-3 border border-green-300 rounded-lg px-3 py-3 bg-white/50 mt-1">
                <Lock className="text-green-600" size={20} />
                <Input
                  type="password"
                  required
                  placeholder="Repite tu contraseña"
                  className="border-0 bg-transparent p-0"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
              Crear Cuenta
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-white/30">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <button 
                onClick={() => router.push("/login")}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}