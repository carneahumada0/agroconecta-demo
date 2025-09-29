import { NextResponse } from 'next/server'
import db from '@/lib/database'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    console.log('🔐 Recibiendo solicitud de login:', { email })

    // Validaciones básicas
    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña son requeridos' }, {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Buscar usuario por email
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('✅ Login exitoso para usuario:', user.email)

    // Login exitoso
    return NextResponse.json({ 
      success: true, 
      message: 'Login exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        farm: user.farm_name
      }
    }, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('❌ Error en el login:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}