 
// app/api/auth/forgot-password/route.js
import db from '@/lib/database'

export async function POST(request) {
  try {
    const { email } = await request.json()

    console.log('📧 Recibiendo solicitud de recuperación para:', email)

    if (!email) {
      return new Response(JSON.stringify({ error: 'El email es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Verificar si el email existe
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    
    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      console.log('📨 Email de recuperación enviado (simulado) para:', email)
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Si el email existe, recibirás un enlace de recuperación'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // En una app real, aquí enviarías un email con un enlace de recuperación
    console.log('📨 Email de recuperación enviado (simulado) para usuario:', user.email)

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Si el email existe, recibirás un enlace de recuperación'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('❌ Error en recuperación de contraseña:', error)
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}