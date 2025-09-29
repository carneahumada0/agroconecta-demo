import { NextResponse } from 'next/server'
import db from '@/lib/database'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    // Leer el cuerpo de la solicitud
    const body = await request.text()
    console.log('📨 Body recibido:', body)

    // Verificar que el body no esté vacío
    if (!body) {
      return NextResponse.json({ error: 'El cuerpo de la solicitud está vacío' }, {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Parsear el JSON
    const { name, email, farm, password } = JSON.parse(body)

    console.log('📨 Recibiendo solicitud de registro:', { name, email, farm })

    // Validaciones básicas
    if (!name || !email || !farm || !password) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres' }, {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Verificar si el email ya existe
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    if (existingUser) {
      return NextResponse.json({ error: 'El email ya está registrado' }, {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Hashear la contraseña
    const passwordHash = await bcrypt.hash(password, 10)

    // Insertar usuario en la base de datos
    const result = db.prepare(`
      INSERT INTO users (name, email, farm_name, password_hash) 
      VALUES (?, ?, ?, ?)
    `).run(name, email, farm, passwordHash)

    console.log('✅ Usuario registrado exitosamente, ID:', result.lastInsertRowid)

    return NextResponse.json({ 
      success: true, 
      message: 'Usuario registrado correctamente',
      userId: result.lastInsertRowid 
    }, {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('❌ Error en el registro:', error)
    return NextResponse.json({ error: 'Error interno del servidor: ' + error.message }, {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}