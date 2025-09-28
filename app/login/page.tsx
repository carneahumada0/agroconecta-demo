"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Lock, Eye, EyeOff, CheckCircle, Leaf } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [debugInfo, setDebugInfo] = useState('')
  const [formData, setFormData] = useState({
    email: '',  // ← QUITAMOS el email de prueba
    password: '',  // ← QUITAMOS la contraseña de prueba
    remember: false
  })

  // Redirección automática cuando el login es exitoso
  useEffect(() => {
    if (loginSuccess) {
      console.log('🔄 Redireccionando automáticamente a /')
      router.push("/")
    }
  }, [loginSuccess, router])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginSuccess(false)
    setDebugInfo('Iniciando login...')

    // Validación básica
    if (!formData.email || !formData.password) {
      alert('Por favor ingresa tu email y contraseña')
      setIsLoading(false)
      return
    }

    try {
      console.log('🔐 Paso 1: Haciendo fetch...')
      setDebugInfo('Paso 1: Haciendo fetch...')
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      console.log('🔐 Paso 2: Respuesta recibida, status:', response.status)
      setDebugInfo(`Paso 2: Status ${response.status}`)

      const data = await response.json()
      console.log('🔐 Paso 3: Data parseada:', data)
      setDebugInfo(`Paso 3: Data: ${JSON.stringify(data)}`)

      if (response.ok && data.success) {
        console.log('✅ Paso 4: Login exitoso!')
        setDebugInfo('Paso 4: Login exitoso!')
        
        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('isAuthenticated', 'true')
        console.log('✅ Paso 5: Guardado en localStorage')
        setDebugInfo('Paso 5: Guardado en localStorage')
        
        setLoginSuccess(true)
        console.log('✅ Paso 6: Estado loginSuccess = true')
        setDebugInfo('Paso 6: Estado actualizado a true')
        
      } else {
        console.log('❌ Paso 4: Error en login:', data.error)
        setDebugInfo(`Error: ${data.error}`)
        alert(data.error || 'Error en el login')
      }
    } catch (error) {
      console.error('❌ Error catch:', error)
      setDebugInfo(`Error catch: ${error.message}`)
      alert('Error de conexión: ' + error.message)
    } finally {
      setIsLoading(false)
      console.log('🔐 Finalizado, isLoading = false')
      setDebugInfo(prev => prev + ' - Finalizado')
    }
  }

  const handleManualRedirect = () => {
    console.log('🔄 Redirección manual clickeada')
    setDebugInfo('Redirección manual iniciada')
    router.push("/")
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  if (loginSuccess) {
    return (
      <main className="relative min-h-screen flex items-center justify-center p-4">
        <Image
          src="https://images.unsplash.com/photo-1693452968861-d43fd1621b04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Campo agrícola verde"
          fill
          className="object-cover brightness-70 -z-10"
        />
        
        <Card className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl">
          <CardContent className="p-8 text-center space-y-6">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-green-900">¡Login Exitoso!</h1>
            <p className="text-gray-700">Redirigiendo al Home...</p>
            
            <Button 
              onClick={handleManualRedirect}
              className="bg-green-600 hover:bg-green-700 text-white w-full"
            >
              Redirigir al Home Manualmente
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4">
      <Image
        src="https://images.unsplash.com/photo-1693452968861-d43fd1621b04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Campo agrícola verde"
        fill
        priority
        quality={100}
        className="object-cover object-center brightness-70 -z-10"
      />

      <Card className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl relative z-10">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <Leaf className="h-8 w-8 text-green-700" />
            </div>
            <h1 className="text-3xl font-bold text-green-900">AgroConecta</h1>
            <p className="text-green-800 font-medium">Inicia Sesión en tu Cuenta</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-green-900">Email</label>
              <div className="flex items-center gap-3 border border-green-300 rounded-lg px-3 py-3 bg-white/50 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all">
                <User className="text-green-600" size={20} />
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="tu@email.com"  // ← Placeholder genérico
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-0 focus:ring-0 bg-transparent p-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-green-900">Contraseña</label>
              <div className="flex items-center gap-3 border border-green-300 rounded-lg px-3 py-3 bg-white/50 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all">
                <Lock className="text-green-600" size={20} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Ingresa tu contraseña"  // ← Placeholder genérico
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="border-0 focus:ring-0 bg-transparent p-0 flex-1"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-green-600 hover:text-green-700 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.remember}
                onCheckedChange={(checked) => setFormData({ ...formData, remember: checked })}
              />
              <label htmlFor="remember" className="text-sm text-green-900 font-medium">
                Recordar mi cuenta
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? 'Iniciando sesión...' : 'Ingresar a la Plataforma'}
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-white/30">
            <p className="text-xs text-gray-600">
              ¿Primera vez?{' '}
              <button onClick={() => router.push("/register")} className="text-green-600 hover:text-green-700 font-medium">
                Regístrate aquí
              </button>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              ¿Olvidaste tu contraseña?{' '}
              <button onClick={() => router.push("/forgot-password")} className="text-green-600 hover:text-green-700">
                Recupérala aquí
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}