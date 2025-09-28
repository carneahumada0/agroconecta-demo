"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BackButton from "@/components/BackButton"
import Image from "next/image"
import { 
  Leaf, Calendar, CloudRain, Bug, Droplets, 
  Plus, Search, Filter, BarChart3, MapPin, 
  Clock, AlertTriangle, Trash2, Edit3
} from "lucide-react"

export default function Cultivos() {
  const [cultivos, setCultivos] = useState([])
  const [form, setForm] = useState({ 
    nombre: "", 
    area: "", 
    tipo: "",
    fechaSiembra: "",
    fechaCosechaEstimada: "",
    ubicacion: ""
  })
  const [filtro, setFiltro] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [editandoId, setEditandoId] = useState(null)

  // Cargar cultivos al iniciar
  useEffect(() => {
    const cultivosGuardados = localStorage.getItem('cultivos')
    if (cultivosGuardados) {
      setCultivos(JSON.parse(cultivosGuardados))
    }
  }, [])

  // Guardar en localStorage cuando cambien los cultivos
  useEffect(() => {
    localStorage.setItem('cultivos', JSON.stringify(cultivos))
  }, [cultivos])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (form.nombre && form.area && form.tipo) {
      const nuevoCultivo = {
        id: Date.now().toString(),
        nombre: form.nombre,
        tipo: form.tipo,
        fechaSiembra: form.fechaSiembra || new Date().toISOString().split('T')[0],
        fechaCosechaEstimada: form.fechaCosechaEstimada || '',
        area: form.area,
        ubicacion: form.ubicacion || 'Sin ubicación',
        estado: 'activo',
        progreso: 0,
        plagas: [],
        notas: ['Cultivo registrado exitosamente']
      }

      setCultivos([...cultivos, nuevoCultivo])
      setForm({ 
        nombre: "", 
        area: "", 
        tipo: "",
        fechaSiembra: "",
        fechaCosechaEstimada: "",
        ubicacion: ""
      })
    }
  }

  const handleEdit = (cultivo) => {
    setForm({
      nombre: cultivo.nombre,
      area: cultivo.area,
      tipo: cultivo.tipo,
      fechaSiembra: cultivo.fechaSiembra,
      fechaCosechaEstimada: cultivo.fechaCosechaEstimada,
      ubicacion: cultivo.ubicacion
    })
    setEditandoId(cultivo.id)
  }

  const handleUpdate = () => {
    if (editandoId && form.nombre && form.area && form.tipo) {
      setCultivos(cultivos.map(c => 
        c.id === editandoId 
          ? { ...c, ...form }
          : c
      ))
      setForm({ 
        nombre: "", 
        area: "", 
        tipo: "",
        fechaSiembra: "",
        fechaCosechaEstimada: "",
        ubicacion: ""
      })
      setEditandoId(null)
    }
  }

  const handleDelete = (id) => {
    setCultivos(cultivos.filter(c => c.id !== id))
  }

  const agregarPlaga = (id, plaga) => {
    if (plaga.trim()) {
      setCultivos(cultivos.map(c => 
        c.id === id 
          ? { 
              ...c, 
              plagas: [...c.plagas, plaga],
              estado: 'en-problema',
              notas: [...c.notas, `Plaga detectada: ${plaga}`]
            }
          : c
      ))
    }
  }

  const agregarNota = (id, nota) => {
    if (nota.trim()) {
      setCultivos(cultivos.map(c => 
        c.id === id 
          ? { ...c, notas: [...c.notas, nota] }
          : c
      ))
    }
  }

  const actualizarProgreso = (id, progreso) => {
    setCultivos(cultivos.map(c => 
      c.id === id 
        ? { ...c, progreso: Math.min(100, Math.max(0, progreso)) }
        : c
    ))
  }

  const registrarRiego = (id) => {
    setCultivos(cultivos.map(c => 
      c.id === id 
        ? { 
            ...c, 
            ultimoRiego: new Date().toISOString().split('T')[0],
            notas: [...c.notas, `Riego aplicado - ${new Date().toLocaleDateString()}`]
          }
        : c
    ))
  }

  // Filtrar y buscar cultivos
  const cultivosFiltrados = cultivos.filter(cultivo => {
    const coincideBusqueda = cultivo.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                            cultivo.tipo.toLowerCase().includes(busqueda.toLowerCase())
    
    if (filtro === 'todos') return coincideBusqueda
    if (filtro === 'activos') return coincideBusqueda && cultivo.estado === 'activo'
    if (filtro === 'problemas') return coincideBusqueda && cultivo.estado === 'en-problema'
    if (filtro === 'cosechados') return coincideBusqueda && cultivo.estado === 'cosechado'
    
    return coincideBusqueda
  })

  return (
    <main className="relative min-h-screen flex flex-col items-center p-6">
      {/* Fondo */}
      <Image
        src="https://images.unsplash.com/photo-1689331875804-20d85557d440?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Cultivos"
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
              <Leaf className="h-10 w-10 text-green-700" />
              <div>
                <h1 className="text-2xl font-bold text-green-900">Gestión de Cultivos</h1>
                <p className="text-gray-700">
                  Monitorea y gestiona todos tus cultivos con herramientas avanzadas
                </p>
              </div>
            </div>

            {/* Estadísticas Rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-900">{cultivos.length}</p>
                <p className="text-green-700 text-sm">Total Cultivos</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-900">
                  {cultivos.filter(c => c.estado === 'activo').length}
                </p>
                <p className="text-green-700 text-sm">Activos</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-900">
                  {cultivos.filter(c => c.estado === 'en-problema').length}
                </p>
                <p className="text-green-700 text-sm">Con Problemas</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-900">
                  {Math.round(cultivos.reduce((acc, c) => acc + c.progreso, 0) / (cultivos.length || 1))}%
                </p>
                <p className="text-green-700 text-sm">Progreso Promedio</p>
              </div>
            </div>

            {/* Búsqueda y Filtros */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                <Input
                  placeholder="Buscar cultivos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10 bg-white/70 border-green-200"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {['todos', 'activos', 'problemas', 'cosechados'].map((filtroItem) => (
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

            {/* Formulario */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                name="nombre"
                placeholder="Nombre del cultivo *"
                value={form.nombre}
                onChange={handleChange}
                className="bg-white/70 border-green-200"
              />
              <Input
                name="area"
                placeholder="Área (hectáreas) *"
                value={form.area}
                onChange={handleChange}
                className="bg-white/70 border-green-200"
              />
              <Input
                name="tipo"
                placeholder="Tipo (fruta, verdura, grano) *"
                value={form.tipo}
                onChange={handleChange}
                className="bg-white/70 border-green-200"
              />
              <Input
                name="fechaSiembra"
                type="date"
                placeholder="Fecha de siembra"
                value={form.fechaSiembra}
                onChange={handleChange}
                className="bg-white/70 border-green-200"
              />
              <Input
                name="fechaCosechaEstimada"
                type="date"
                placeholder="Fecha cosecha estimada"
                value={form.fechaCosechaEstimada}
                onChange={handleChange}
                className="bg-white/70 border-green-200"
              />
              <Input
                name="ubicacion"
                placeholder="Ubicación en la finca"
                value={form.ubicacion}
                onChange={handleChange}
                className="bg-white/70 border-green-200"
              />
            </div>

            <Button
              onClick={editandoId ? handleUpdate : handleAdd}
              className="bg-green-600 hover:bg-green-700 text-white w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              {editandoId ? 'Actualizar Cultivo' : 'Agregar Cultivo'}
            </Button>

            {editandoId && (
              <Button
                onClick={() => {
                  setEditandoId(null)
                  setForm({ 
                    nombre: "", 
                    area: "", 
                    tipo: "",
                    fechaSiembra: "",
                    fechaCosechaEstimada: "",
                    ubicacion: ""
                  })
                }}
                variant="outline"
                className="w-full border-green-200 text-green-700"
              >
                Cancelar Edición
              </Button>
            )}

            {/* Lista de Cultivos */}
            <div className="mt-6 space-y-4">
              {cultivosFiltrados.map((cultivo) => (
                <div
                  key={cultivo.id}
                  className="p-4 bg-white/70 rounded-lg shadow-md space-y-3"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-green-800 text-lg">{cultivo.nombre}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cultivo.estado === 'activo' ? 'bg-green-100 text-green-800' :
                          cultivo.estado === 'en-problema' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {cultivo.estado}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {cultivo.area} ha · {cultivo.tipo}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(cultivo)}
                        className="border-green-200 text-green-700"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(cultivo.id)}
                        className="border-red-200 text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Información Detallada */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{cultivo.ubicacion}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Siembra: {new Date(cultivo.fechaSiembra).toLocaleDateString()}</span>
                      </div>
                      {cultivo.fechaCosechaEstimada && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Cosecha: {new Date(cultivo.fechaCosechaEstimada).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {/* Barra de Progreso */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progreso</span>
                          <span>{cultivo.progreso}%</span>
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${cultivo.progreso}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Último Riego */}
                      {cultivo.ultimoRiego && (
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4" />
                          <span>Último riego: {new Date(cultivo.ultimoRiego).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Alertas de Plagas */}
                  {cultivo.plagas.length > 0 && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <Bug className="h-4 w-4" />
                      <span>Plagas: {cultivo.plagas.join(', ')}</span>
                    </div>
                  )}

                  {/* Acciones Rápidas */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => registrarRiego(cultivo.id)}
                      className="border-blue-200 text-blue-700 text-xs"
                    >
                      <Droplets className="h-3 w-3 mr-1" />
                      Registrar Riego
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const plaga = prompt('¿Qué plaga detectaste?')
                        if (plaga) agregarPlaga(cultivo.id, plaga)
                      }}
                      className="border-red-200 text-red-700 text-xs"
                    >
                      <Bug className="h-3 w-3 mr-1" />
                      Reportar Plaga
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const progreso = parseInt(prompt('Nuevo progreso (0-100):') || '0')
                        actualizarProgreso(cultivo.id, progreso)
                      }}
                      className="border-orange-200 text-orange-700 text-xs"
                    >
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Actualizar Progreso
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const nota = prompt('Agregar nota:')
                        if (nota) agregarNota(cultivo.id, nota)
                      }}
                      className="border-purple-200 text-purple-700 text-xs"
                    >
                      <Edit3 className="h-3 w-3 mr-1" />
                      Agregar Nota
                    </Button>
                  </div>

                  {/* Notas Recientes */}
                  {cultivo.notas.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-green-200">
                      <p className="text-xs text-green-600 font-medium mb-1">Notas recientes:</p>
                      <p className="text-xs text-green-700">{cultivo.notas[cultivo.notas.length - 1]}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {cultivosFiltrados.length === 0 && (
              <div className="text-center py-8">
                <Leaf className="h-12 w-12 text-green-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-green-900 mb-2">
                  {busqueda ? 'No se encontraron cultivos' : 'No hay cultivos registrados'}
                </h3>
                <p className="text-green-600">
                  {busqueda ? 'Intenta con otros términos de búsqueda' : 'Comienza agregando tu primer cultivo'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}