// app/status/page.jsx
"use client"

import { useState, useEffect } from 'react'
import { Server, Wifi, WifiOff, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react'

export default function Status() {
  const [systemStatus, setSystemStatus] = useState('checking')
  const [lastChecked, setLastChecked] = useState(new Date())

  // Simulación de estado del sistema
  useEffect(() => {
    const checkStatus = () => {
      // En una app real, aquí harías una llamada API
      setSystemStatus('operational') // operational, degraded, outage
      setLastChecked(new Date())
    }

    checkStatus()
    const interval = setInterval(checkStatus, 30000) // Verificar cada 30 segundos

    return () => clearInterval(interval)
  }, [])

  const statusConfig = {
    operational: {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      label: 'Operacional',
      description: 'Todos los sistemas funcionan correctamente'
    },
    degraded: {
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      label: 'Degradado',
      description: 'Algunos servicios pueden tener problemas menores'
    },
    outage: {
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      label: 'Interrupción',
      description: 'Estamos experimentando problemas técnicos'
    },
    checking: {
      icon: RefreshCw,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      label: 'Verificando',
      description: 'Verificando el estado del sistema...'
    }
  }

  const currentStatus = statusConfig[systemStatus]
  const StatusIcon = currentStatus.icon

  const services = [
    {
      name: 'Plataforma Principal',
      status: 'operational',
      description: 'Acceso a la aplicación web'
    },
    {
      name: 'Sincronización Offline',
      status: 'operational',
      description: 'Funcionalidad sin conexión'
    },
    {
      name: 'Base de Datos',
      status: 'operational',
      description: 'Almacenamiento y consulta de datos'
    },
    {
      name: 'API de Reportes',
      status: 'operational',
      description: 'Generación de informes'
    },
    {
      name: 'Servicio de Notificaciones',
      status: 'operational',
      description: 'Alertas y recordatorios'
    }
  ]

  const refreshStatus = () => {
    setSystemStatus('checking')
    setTimeout(() => {
      setSystemStatus('operational')
      setLastChecked(new Date())
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Server className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-green-900 mb-2">Estado del Sistema</h1>
          <p className="text-lg text-green-700">
            Verifica el estado actual de todos nuestros servicios
          </p>
        </div>

        {/* Status Banner */}
        <div className={`${currentStatus.bgColor} rounded-2xl p-6 mb-8`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <StatusIcon className={`h-8 w-8 ${currentStatus.color}`} />
              <div>
                <h2 className="text-xl font-bold text-green-900">{currentStatus.label}</h2>
                <p className="text-green-700">{currentStatus.description}</p>
              </div>
            </div>
            <button
              onClick={refreshStatus}
              className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Actualizar
            </button>
          </div>
        </div>

        {/* Services Status */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-green-900 mb-6">Estado de los Servicios</h2>
          
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-green-100 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    service.status === 'operational' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {service.status === 'operational' ? (
                      <Wifi className="h-5 w-5 text-green-600" />
                    ) : (
                      <WifiOff className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">{service.name}</h3>
                    <p className="text-sm text-green-700">{service.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  service.status === 'operational' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {service.status === 'operational' ? 'Operacional' : 'Inactivo'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="font-bold text-green-900 mb-2">Última Verificación</h3>
            <p className="text-green-700">
              {lastChecked.toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="font-bold text-green-900 mb-2">Próxima Verificación</h3>
            <p className="text-green-700">
              Cada 30 segundos automáticamente
            </p>
          </div>
        </div>

        {/* Support Info */}
        <div className="bg-blue-50 rounded-2xl p-6 mt-8">
          <h3 className="font-bold text-blue-900 mb-2">¿Experimentas problemas?</h3>
          <p className="text-blue-700">
            Si el sistema muestra "Operacional" pero tienes problemas, por favor{' '}
            <a href="/contact" className="text-blue-600 underline font-semibold">contáctanos</a>.
          </p>
        </div>
      </div>
    </div>
  )
}