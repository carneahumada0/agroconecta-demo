// app/privacy/page.jsx
import { Shield, Lock, Eye, UserCheck } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-green-900 mb-4">Política de Privacidad</h1>
          <p className="text-lg text-green-700">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Resumen */}
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-green-900 mb-3">Resumen Ejecutivo</h2>
            <p className="text-green-700">
              En AgroConecta nos comprometemos a proteger tu privacidad. Esta política explica cómo recopilamos, 
              usamos y protegemos tu información cuando utilizas nuestra plataforma.
            </p>
          </div>

          {/* Información que recopilamos */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-green-900">1. Información que Recopilamos</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Información Personal</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Nombre completo y datos de contacto</li>
                  <li>Información de la finca o negocio agrícola</li>
                  <li>Datos de registro y autenticación</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Datos Agrícolas</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Información de cultivos y actividades</li>
                  <li>Reportes de producción y rendimiento</li>
                  <li>Datos meteorológicos y de suelo</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Uso de la información */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-green-900">2. Uso de la Información</h2>
            </div>
            
            <div className="space-y-3 text-green-700">
              <p>Utilizamos tu información para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Proveer y mejorar nuestros servicios agrícolas</li>
                <li>Personalizar tu experiencia en la plataforma</li>
                <li>Generar reportes y análisis comunitarios</li>
                <li>Enviar actualizaciones y contenido educativo</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </div>
          </section>

          {/* Protección de datos */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-green-900">3. Protección de Datos</h2>
            </div>
            
            <div className="space-y-3 text-green-700">
              <p>Implementamos medidas de seguridad como:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encriptación de datos en tránsito y en reposo</li>
                <li>Acceso restringido al personal autorizado</li>
                <li>Copias de seguridad regulares</li>
                <li>Funcionalidad offline para proteger datos locales</li>
              </ul>
            </div>
          </section>

          {/* Tus derechos */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4">4. Tus Derechos</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Acceso y Corrección</h3>
                <p className="text-green-700 text-sm">
                  Puedes acceder y corregir tu información personal en cualquier momento.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Eliminación de Datos</h3>
                <p className="text-green-700 text-sm">
                  Tienes derecho a solicitar la eliminación de tus datos personales.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Portabilidad</h3>
                <p className="text-green-700 text-sm">
                  Puedes solicitar una copia de tus datos en formato legible.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Contacto</h3>
                <p className="text-green-700 text-sm">
                  Para ejercer tus derechos, contáctanos en privacidad@agroconecta.com
                </p>
              </div>
            </div>
          </section>

          {/* Contacto */}
          <div className="mt-8 p-6 bg-green-100 rounded-lg">
            <h3 className="font-bold text-green-900 mb-2">¿Preguntas sobre privacidad?</h3>
            <p className="text-green-700">
              Contáctanos en <strong>privacidad@agroconecta.com</strong> para cualquier consulta relacionada con tu privacidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}