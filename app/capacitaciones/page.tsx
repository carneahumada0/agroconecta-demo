"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BackButton from "@/components/BackButton"
import Image from "next/image"
import { 
  BookOpen, Video, FileText, Headphones, Download, 
  Award, Users, Search, Play, Clock,
  CheckCircle, Star, Plus, Eye
} from "lucide-react"

interface Capacitacion {
  id: string
  tema: string
  fecha: string
  enlace: string
  tipo: string
  duracion: string
  nivel: string
  descripcion: string
  categorias: string[]
  completado: boolean
  puntuacion: number
}

interface Recomendacion {
  id: string
  tema: string
  tipo: string
  razon: string
  prioridad: string
}

export default function Capacitaciones() {
  const [capacitaciones, setCapacitaciones] = useState<Capacitacion[]>([])
  const [form, setForm] = useState({ tema: "", fecha: "", enlace: "", tipo: "video" })
  const [filtro, setFiltro] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [descargas, setDescargas] = useState<Record<string, boolean>>({})
  const [cultivosUsuario, setCultivosUsuario] = useState<string[]>([])

  // Cargar datos al iniciar
  useEffect(() => {
    const capacitacionesGuardadas = localStorage.getItem('capacitaciones')
    const cultivosGuardados = localStorage.getItem('cultivos')
    
    if (capacitacionesGuardadas) {
      setCapacitaciones(JSON.parse(capacitacionesGuardadas))
    } else {
      // Datos de ejemplo para el prototipo
      setCapacitaciones([
        {
          id: '1',
          tema: 'Introducción a la Agricultura Sostenible',
          fecha: '2024-01-15',
          enlace: '#',
          tipo: 'video',
          duracion: '15 min',
          nivel: 'Principiante',
          descripcion: 'Conceptos básicos de agricultura sostenible y buenas prácticas.',
          categorias: ['sostenibilidad', 'basico'],
          completado: false,
          puntuacion: 0
        },
        {
          id: '2',
          tema: 'Manejo Integrado de Plagas',
          fecha: '2024-02-01',
          enlace: '#',
          tipo: 'pdf',
          duracion: '25 min',
          nivel: 'Intermedio',
          descripcion: 'Estrategias para el control natural de plagas en cultivos.',
          categorias: ['plagas', 'cultivos'],
          completado: false,
          puntuacion: 0
        },
        {
          id: '3',
          tema: 'Riego Eficiente y Conservación de Agua',
          fecha: '2024-02-10',
          enlace: '#',
          tipo: 'podcast',
          duracion: '30 min',
          nivel: 'Avanzado',
          descripcion: 'Técnicas modernas de riego y conservación de recursos hídricos.',
          categorias: ['riego', 'agua'],
          completado: false,
          puntuacion: 0
        }
      ])
    }

    if (cultivosGuardados) {
      const cultivos = JSON.parse(cultivosGuardados)
      setCultivosUsuario(cultivos.map((c: { tipo?: string }) => c.tipo?.toLowerCase() || ''))
    }
  }, [])

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('capacitaciones', JSON.stringify(capacitaciones))
  }, [capacitaciones])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (form.tema && form.fecha && form.enlace) {
      const nuevaCapacitacion: Capacitacion = {
        id: Date.now().toString(),
        tema: form.tema,
        fecha: form.fecha,
        enlace: form.enlace,
        tipo: form.tipo,
        duracion: '20 min',
        nivel: 'Intermedio',
        descripcion: 'Nueva capacitación agregada',
        categorias: ['general'],
        completado: false,
        puntuacion: 0
      }

      setCapacitaciones([...capacitaciones, nuevaCapacitacion])
      setForm({ tema: "", fecha: "", enlace: "", tipo: "video" })
    }
  }

  const marcarCompletado = (id: string) => {
    setCapacitaciones(capacitaciones.map(c => 
      c.id === id ? { ...c, completado: true } : c
    ))
  }

  const calificarCapacitacion = (id: string, puntuacion: number) => {
    setCapacitaciones(capacitaciones.map(c => 
      c.id === id ? { ...c, puntuacion } : c
    ))
  }

  const toggleDescarga = (id: string) => {
    setDescargas(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // Generar recomendaciones basadas en cultivos del usuario
  const generarRecomendaciones = (): Recomendacion[] => {
    const recomendaciones: Recomendacion[] = []
    
    if (cultivosUsuario.includes('maíz') || cultivosUsuario.includes('cereal')) {
      recomendaciones.push({
        id: 'rec-1',
        tema: 'Cultivo de Maíz: Mejores Prácticas',
        tipo: 'video',
        razon: 'Basado en tus cultivos de maíz',
        prioridad: 'alta'
      })
    }
    
    if (cultivosUsuario.includes('tomate') || cultivosUsuario.includes('hortaliza')) {
      recomendaciones.push({
        id: 'rec-2',
        tema: 'Manejo de Invernaderos para Tomates',
        tipo: 'pdf',
        razon: 'Perfecto para tus cultivos de tomate',
        prioridad: 'alta'
      })
    }

    // Recomendaciones generales
    recomendaciones.push(
      {
        id: 'rec-3',
        tema: 'Agricultura de Precisión con Tecnología',
        tipo: 'video',
        razon: 'Para optimizar todos tus cultivos',
        prioridad: 'media'
      },
      {
        id: 'rec-4',
        tema: 'Mercado y Comercialización Agrícola',
        tipo: 'podcast',
        razon: 'Mejora la rentabilidad de tu finca',
        prioridad: 'media'
      }
    )

    return recomendaciones
  }

  const recomendaciones = generarRecomendaciones()

  // Filtrar capacitaciones
  const capacitacionesFiltradas = capacitaciones.filter(capacitacion => {
    const coincideBusqueda = capacitacion.tema.toLowerCase().includes(busqueda.toLowerCase()) ||
                            capacitacion.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    
    if (filtro === 'todos') return coincideBusqueda
    if (filtro === 'videos') return coincideBusqueda && capacitacion.tipo === 'video'
    if (filtro === 'pdfs') return coincideBusqueda && capacitacion.tipo === 'pdf'
    if (filtro === 'podcasts') return coincideBusqueda && capacitacion.tipo === 'podcast'
    if (filtro === 'completados') return coincideBusqueda && capacitacion.completado
    if (filtro === 'pendientes') return coincideBusqueda && !capacitacion.completado
    
    return coincideBusqueda
  })

  // Estadísticas
  const estadisticas = {
    total: capacitaciones.length,
    completados: capacitaciones.filter(c => c.completado).length,
    videos: capacitaciones.filter(c => c.tipo === 'video').length,
    pdfs: capacitaciones.filter(c => c.tipo === 'pdf').length,
    podcasts: capacitaciones.filter(c => c.tipo === 'podcast').length,
    progreso: capacitaciones.length > 0 ? 
      (capacitaciones.filter(c => c.completado).length / capacitaciones.length * 100).toFixed(1) : 0
  }

  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case 'video': return <Video className="h-5 w-5" />
      case 'pdf': return <FileText className="h-5 w-5" />
      case 'podcast': return <Headphones className="h-5 w-5" />
      default: return <BookOpen className="h-5 w-5" />
    }
  }

  const getColorTipo = (tipo: string) => {
    switch (tipo) {
      case 'video': return 'bg-red-100 text-red-700'
      case 'pdf': return 'bg-blue-100 text-blue-700'
      case 'podcast': return 'bg-purple-100 text-purple-700'
      default: return 'bg-green-100 text-green-700'
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center p-6">
      {/* Fondo */}
      <Image
        src="https://images.unsplash.com/photo-1689331875804-20d85557d440?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Capacitaciones agrícolas"
        fill
        priority
        quality={100}
        className="object-cover object-center brightness-70 -z-10"
      />

      <div className="w-full max-w-6xl space-y-6">
        <BackButton />

        {/* Tarjeta Principal */}
        <Card className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-xl">
          <CardContent className="p-6 space-y-6">
            {/* Título */}
            <div className="flex items-center gap-3">
              <BookOpen className="h-10 w-10 text-green-700" />
              <div>
                <h1 className="text-2xl font-bold text-green-900">
                  Centro de Capacitaciones
                </h1>
                <p className="text-gray-700">
                  Aprende, crece y certifícate en agricultura moderna
                </p>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-900">{estadisticas.total}</p>
                <p className="text-green-700 text-sm">Total Recursos</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-900">{estadisticas.completados}</p>
                <p className="text-green-700 text-sm">Completados</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-900">{estadisticas.progreso}%</p>
                <p className="text-green-700 text-sm">Progreso</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-900">{recomendaciones.length}</p>
                <p className="text-green-700 text-sm">Recomendadas</p>
              </div>
            </div>

            {/* RECOMENDACIONES PERSONALIZADAS - PROTOTIPO */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
              <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Recomendaciones para Ti
              </h3>
              <p className="text-green-700 text-sm mb-3">
                Basado en tus cultivos: {cultivosUsuario.length > 0 ? cultivosUsuario.join(', ') : 'No hay cultivos registrados'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recomendaciones.map((rec) => (
                  <div key={rec.id} className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      {getIconoTipo(rec.tipo)}
                      <span className="font-medium text-green-900">{rec.tema}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-green-600">{rec.razon}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        rec.prioridad === 'alta' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {rec.prioridad}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BIBLIOTECA MULTIMEDIA - PROTOTIPO */}
            <div>
              <h3 className="text-lg font-bold text-green-900 mb-3">Biblioteca Multimedia</h3>
              
              {/* Búsqueda y Filtros */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                  <Input
                    placeholder="Buscar capacitaciones..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10 bg-white/70 border-green-200"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['todos', 'videos', 'pdfs', 'podcasts', 'completados', 'pendientes'].map((filtroItem) => (
                    <Button
                      key={filtroItem}
                      variant={filtro === filtroItem ? "default" : "outline"}
                      onClick={() => setFiltro(filtroItem)}
                      className={`text-sm ${
                        filtro === filtroItem 
                          ? "bg-green-600 text-white" 
                          : "bg-white/70 border-green-200 text-green-700"
                      }`}
                    >
                      {filtroItem.charAt(0).toUpperCase() + filtroItem.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Formulario para agregar (manteniendo tu estructura original) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-white/50 rounded-lg">
                <Input
                  name="tema"
                  placeholder="Tema de la capacitación"
                  value={form.tema}
                  onChange={handleChange}
                  className="bg-white/70 border-green-200"
                />
                <Input
                  type="date"
                  name="fecha"
                  value={form.fecha}
                  onChange={handleChange}
                  className="bg-white/70 border-green-200"
                />
                <Input
                  name="enlace"
                  placeholder="Enlace o recurso"
                  value={form.enlace}
                  onChange={handleChange}
                  className="bg-white/70 border-green-200"
                />
                <select
                  name="tipo"
                  value={form.tipo}
                  onChange={handleChange}
                  className="bg-white/70 border border-green-200 rounded-md px-3 py-2 text-green-900"
                >
                  <option value="video">🎥 Video</option>
                  <option value="pdf">📄 PDF</option>
                  <option value="podcast">🎧 Podcast</option>
                </select>
              </div>

              <Button
                onClick={handleAdd}
                className="bg-green-600 hover:bg-green-700 text-white w-full mb-6"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Capacitación
              </Button>

              {/* Lista de Capacitaciones Mejorada */}
              <div className="space-y-4">
                {capacitacionesFiltradas.map((capacitacion) => (
                  <div
                    key={capacitacion.id}
                    className="p-4 bg-white/70 rounded-lg shadow-md space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getIconoTipo(capacitacion.tipo)}
                          <p className="font-bold text-green-800 text-lg">{capacitacion.tema}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColorTipo(capacitacion.tipo)}`}>
                            {capacitacion.tipo}
                          </span>
                          {capacitacion.completado && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{capacitacion.descripcion}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-green-700">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{capacitacion.duracion}</span>
                          </div>
                          <span>•</span>
                          <span>Nivel: {capacitacion.nivel}</span>
                          <span>•</span>
                          <span>📅 {new Date(capacitacion.fecha).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleDescarga(capacitacion.id)}
                          className={`border-green-200 text-green-700 ${
                            descargas[capacitacion.id] ? 'bg-green-100' : ''
                          }`}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* EVALUACIONES Y CERTIFICADOS - PROTOTIPO */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-green-200">
                      {!capacitacion.completado ? (
                        <Button
                          size="sm"
                          onClick={() => marcarCompletado(capacitacion.id)}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Comenzar
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-200 text-green-700 text-xs"
                          >
                            <Award className="h-3 w-3 mr-1" />
                            Ver Certificado
                          </Button>
                          
                          {/* Sistema de Calificación - PROTOTIPO */}
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => calificarCapacitacion(capacitacion.id, star)}
                                className={`text-sm ${
                                  star <= capacitacion.puntuacion 
                                    ? 'text-yellow-500' 
                                    : 'text-gray-300'
                                }`}
                              >
                                ⭐
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* DESCARGAS OFFLINE - PROTOTIPO */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleDescarga(capacitacion.id)}
                        className={`text-xs ${
                          descargas[capacitacion.id] 
                            ? 'bg-blue-100 border-blue-200 text-blue-700' 
                            : 'border-gray-200 text-gray-700'
                        }`}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        {descargas[capacitacion.id] ? 'Descargado' : 'Descargar Offline'}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-200 text-gray-700 text-xs"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Vista Previa
                      </Button>
                    </div>

                    {/* MENTORÍAS VIRTUALES - PROTOTIPO ALPHA */}
                    {capacitacion.tipo === 'video' && (
                      <div className="mt-2 p-3 bg-yellow-50 rounded border border-yellow-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            Mentoría Disponible
                          </span>
                        </div>
                        <p className="text-xs text-yellow-700 mb-2">
                          ¿Tienes preguntas sobre este tema? Agenda una sesión con nuestros expertos.
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-200 text-yellow-700 text-xs"
                          onClick={() => alert('Funcionalidad en desarrollo - Próximamente')}
                        >
                          <Users className="h-3 w-3 mr-1" />
                          Solicitar Mentoría
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {capacitacionesFiltradas.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-green-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-green-900 mb-2">
                    {busqueda ? 'No se encontraron capacitaciones' : 'No hay capacitaciones registradas'}
                  </h3>
                  <p className="text-green-600">
                    {busqueda ? 'Intenta con otros términos de búsqueda' : 'Comienza agregando tu primera capacitación'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}