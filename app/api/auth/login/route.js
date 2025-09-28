// app/api/auth/login/route.js
import db from '@/lib/database'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    console.log('🔐 Recibiendo solicitud de login:', { email })

    // Validaciones básicas
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email y contraseña son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Buscar usuario por email
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('✅ Login exitoso para usuario:', user.email)

    // Login exitoso
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Login exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        farm: user.farm_name
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('❌ Error en el login:', error)
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
} 
