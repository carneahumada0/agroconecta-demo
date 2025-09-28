"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BackButton from "@/components/BackButton"
import Image from "next/image"
import { 
  Calendar, Clock, User, DollarSign, Camera, 
  Play, Square, Plus, Search, Filter, 
  BarChart3, CheckCircle, AlertTriangle, 
  Edit3, Trash2, Users, Target, ChevronLeft, ChevronRight
} from "lucide-react"

export default function Actividades() {
  const [actividades, setActividades] = useState([])
  const [form, setForm] = useState({ 
    tarea: "", 
    fecha: "", 
    fechaFin: "",
    responsable: "", 
    estado: "pendiente",
    prioridad: "media",
    costoEstimado: "",
    descripcion: "",
    equipo: ""
  })
  
  const [filtro, setFiltro] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [actividadEnCurso, setActividadEnCurso] = useState(null)
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0)
  const [costoReal, setCostoReal] = useState({})
  const [evidencias, setEvidencias] = useState({})
  const [vistaCalendario, setVistaCalendario] = useState(false)
  const [fechaCalendario, setFechaCalendario] = useState(new Date())
  const intervalRef = useRef(null)

  // Timer functions
  const iniciarTimer = (id) => {
    if (actividadEnCurso && actividadEnCurso !== id) {
      alert('Ya hay una actividad en curso. Deténla primero.')
      return
    }
    
    setActividadEnCurso(id)
    setTiempoTranscurrido(0)
    
    intervalRef.current = setInterval(() => {
      setTiempoTranscurrido(prev => prev + 1)
    }, 1000)
  }

  const detenerTimer = (id) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    // Guardar tiempo en la actividad
    if (actividadEnCurso === id) {
      const minutos = Math.floor(tiempoTranscurrido / 60)
      setActividades(prev => prev.map(act => 
        act.id === id 
          ? { 
              ...act, 
              tiempoReal: (act.tiempoReal || 0) + minutos,
              notas: [...(act.notas || []), `Tarea ejecutada: ${minutos} minutos`]
            }
          : act
      ))
    }
    
    setActividadEnCurso(null)
    setTiempoTranscurrido(0)
  }

  const formatearTiempo = (segundos) => {
    const horas = Math.floor(segundos / 3600)
    const minutos = Math.floor((segundos % 3600) / 60)
    const segs = segundos % 60
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`
  }

  // Funciones del Calendario
  const cambiarMes = (direccion) => {
    setFechaCalendario(prev => {
      const nuevoMes = new Date(prev)
      nuevoMes.setMonth(prev.getMonth() + direccion)
      return nuevoMes
    })
  }

  const obtenerDiasDelMes = (fecha) => {
    const año = fecha.getFullYear()
    const mes = fecha.getMonth()
    const primerDia = new Date(año, mes, 1)
    const ultimoDia = new Date(año, mes + 1, 0)
    const diasEnMes = ultimoDia.getDate()
    
    const dias = []
    for (let i = 1; i <= diasEnMes; i++) {
      dias.push(new Date(año, mes, i))
    }
    
    return dias
  }

  const obtenerActividadesDelDia = (fecha) => {
    return actividades.filter(actividad => {
      const fechaActividad = new Date(actividad.fecha)
      return fechaActividad.toDateString() === fecha.toDateString()
    })
  }

  const obtenerNombreMes = (fecha) => {
    return fecha.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
  }

  const obtenerNombreDia = (fecha) => {
    return fecha.toLocaleDateString('es-ES', { weekday: 'short' })
  }

  // Cargar actividades al iniciar
  useEffect(() => {
    const actividadesGuardadas = localStorage.getItem('actividades')
    if (actividadesGuardadas) {
      setActividades(JSON.parse(actividadesGuardadas))
    }
  }, [])

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('actividades', JSON.stringify(actividades))
  }, [actividades])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (form.tarea && form.fecha && form.responsable) {
      const nuevaActividad = {
        id: Date.now().toString(),
        tarea: form.tarea,
        fecha: form.fecha,
        fechaFin: form.fechaFin || form.fecha,
        responsable: form.responsable,
        estado: form.estado,
        prioridad: form.prioridad,
        costoEstimado: parseFloat(form.costoEstimado) || 0,
        costoReal: 0,
        descripcion: form.descripcion,
        equipo: form.equipo || '',
        tiempoEstimado: 0,
        tiempoReal: 0,
        evidencias: [],
        notas: ['Actividad creada'],
        fechaCreacion: new Date().toISOString()
      }

      setActividades([...actividades, nuevaActividad])
      setForm({ 
        tarea: "", 
        fecha: "", 
        fechaFin: "",
        responsable: "", 
        estado: "pendiente",
        prioridad: "media",
        costoEstimado: "",
        descripcion: "",
        equipo: ""
      })
    }
  }

  const handleEdit = (actividad) => {
    setForm({
      tarea: actividad.tarea,
      fecha: actividad.fecha,
      fechaFin: actividad.fechaFin,
      responsable: actividad.responsable,
      estado: actividad.estado,
      prioridad: actividad.prioridad,
      costoEstimado: actividad.costoEstimado.toString(),
      descripcion: actividad.descripcion,
      equipo: actividad.equipo
    })
    setEditandoId(actividad.id)
  }

  const handleUpdate = () => {
    if (editandoId && form.tarea && form.fecha && form.responsable) {
      setActividades(actividades.map(a => 
        a.id === editandoId 
          ? { 
              ...a, 
              ...form,
              costoEstimado: parseFloat(form.costoEstimado) || 0
            }
          : a
      ))
      setForm({ 
        tarea: "", 
        fecha: "", 
        fechaFin: "",
        responsable: "", 
        estado: "pendiente",
        prioridad: "media",
        costoEstimado: "",
        descripcion: "",
        equipo: ""
      })
      setEditandoId(null)
    }
  }

  const handleDelete = (id) => {
    setActividades(actividades.filter(a => a.id !== id))
  }

  const cambiarEstado = (id, nuevoEstado) => {
    setActividades(actividades.map(a => 
      a.id === id 
        ? { 
            ...a, 
            estado: nuevoEstado,
            notas: [...a.notas, `Estado cambiado a: ${nuevoEstado}`]
          }
        : a
    ))
  }

  const agregarCostoReal = (id, costo) => {
    const costoNum = parseFloat(costo)
    if (!isNaN(costoNum)) {
      setActividades(actividades.map(a => 
        a.id === id 
          ? { 
              ...a, 
              costoReal: costoNum,
              notas: [...a.notas, `Costo real registrado: $${costoNum}`]
            }
          : a
      ))
    }
  }

  const agregarEvidencia = (id, archivo) => {
    if (archivo) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setActividades(actividades.map(a => 
          a.id === id 
            ? { 
                ...a, 
                evidencias: [...a.evidencias, e.target.result],
                notas: [...a.notas, 'Evidencia fotográfica agregada']
              }
            : a
        ))
      }
      reader.readAsDataURL(archivo)
    }
  }

  const agregarNota = (id, nota) => {
    if (nota.trim()) {
      setActividades(actividades.map(a => 
        a.id === id 
          ? { ...a, notas: [...a.notas, nota] }
          : a
      ))
    }
  }

  // Filtrar actividades
  const actividadesFiltradas = actividades.filter(actividad => {
    const coincideBusqueda = actividad.tarea.toLowerCase().includes(busqueda.toLowerCase()) ||
                            actividad.responsable.toLowerCase().includes(busqueda.toLowerCase())
    
    if (filtro === 'todas') return coincideBusqueda
    if (filtro === 'pendientes') return coincideBusqueda && actividad.estado === 'pendiente'
    if (filtro === 'progreso') return coincideBusqueda && actividad.estado === 'en progreso'
    if (filtro === 'completadas') return coincideBusqueda && actividad.estado === 'completada'
    if (filtro === 'urgentes') return coincideBusqueda && actividad.prioridad === 'alta'
    
    return coincideBusqueda
  })

  // Estadísticas
  const estadisticas = {
    total: actividades.length,
    pendientes: actividades.filter(a => a.estado === 'pendiente').length,
    enProgreso: actividades.filter(a => a.estado === 'en progreso').length,
    completadas: actividades.filter(a => a.estado === 'completada').length,
    costoTotal: actividades.reduce((sum, a) => sum + a.costoReal, 0),
    eficiencia: actividades.length > 0 ? 
      (actividades.filter(a => a.estado === 'completada').length / actividades.length * 100).toFixed(1) : 0
  }

  // Componente del Calendario
  const Calendario = () => {
    const dias = obtenerDiasDelMes(fechaCalendario)
    const hoy = new Date()
    
    return (
      <div className="bg-white/70 rounded-lg p-4 border border-green-200">
        {/* Header del Calendario */}
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => cambiarMes(-1)}
            className="border-green-200 text-green-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h3 className="text-lg font-bold text-green-900 capitalize">
            {obtenerNombreMes(fechaCalendario)}
          </h3>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => cambiarMes(1)}
            className="border-green-200 text-green-700"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(dia => (
            <div key={dia} className="text-center text-sm font-medium text-green-700 py-2">
              {dia}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-1">
          {dias.map((dia, index) => {
            const actividadesDelDia = obtenerActividadesDelDia(dia)
            const esHoy = dia.toDateString() === hoy.toDateString()
            const esMesActual = dia.getMonth() === fechaCalendario.getMonth()
            
            return (
              <div
                key={index}
                className={`min-h-20 p-1 border border-green-100 rounded text-sm ${
                  esMesActual ? 'bg-white' : 'bg-green-50'
                } ${esHoy ? 'ring-2 ring-green-500' : ''}`}
              >
                <div className={`text-center mb-1 ${
                  esHoy ? 'font-bold text-green-700' : 'text-green-600'
                }`}>
                  {dia.getDate()}
                </div>
                
                {/* Actividades del día */}
                <div className="space-y-1 max-h-24 overflow-y-auto">
                  {actividadesDelDia.slice(0, 3).map((actividad, idx) => (
                    <div
                      key={idx}
                      className={`text-xs p-1 rounded truncate cursor-pointer ${
                        actividad.estado === 'completada' ? 'bg-green-100 text-green-800' :
                        actividad.estado === 'en progreso' ? 'bg-blue-100 text-blue-800' :
                        actividad.prioridad === 'alta' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                      title={actividad.tarea}
                      onClick={() => {
                        document.getElementById(`actividad-${actividad.id}`)?.scrollIntoView({
                          behavior: 'smooth'
                        })
                      }}
                    >
                      {actividad.tarea}
                    </div>
                  ))}
                  
                  {actividadesDelDia.length > 3 && (
                    <div className="text-xs text-green-600 text-center">
                      +{actividadesDelDia.length - 3} más
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Leyenda */}
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-green-700">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-100 rounded"></div>
            <span>Completadas</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-100 rounded"></div>
            <span>En Progreso</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-100 rounded"></div>
            <span>Urgentes</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-100 rounded"></div>
            <span>Pendientes</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center p-6">
      {/* Fondo */}
      <Image
        src="https://images.unsplash.com/photo-1689331875804-20d85557d440?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Actividades agrícolas"
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
            {/* Título y Botón de Vista */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Calendar className="h-10 w-10 text-green-700" />
                <div>
                  <h1 className="text-2xl font-bold text-green-900">Gestión de Actividades</h1>
                  <p className="text-gray-700">
                    Planifica, ejecuta y monitorea todas las actividades de tu finca
                  </p>
                </div>
              </div>
              
              <Button
                variant={vistaCalendario ? "default" : "outline"}
                onClick={() => setVistaCalendario(!vistaCalendario)}
                className={vistaCalendario ? "bg-green-600 text-white" : "border-green-200 text-green-700"}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {vistaCalendario ? 'Vista Lista' : 'Vista Calendario'}
              </Button>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-900">{estadisticas.total}</p>
                <p className="text-green-700 text-sm">Total Actividades</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-900">{estadisticas.pendientes}</p>
                <p className="text-green-700 text-sm">Pendientes</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-900">{estadisticas.enProgreso}</p>
                <p className="text-green-700 text-sm">En Progreso</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-900">{estadisticas.eficiencia}%</p>
                <p className="text-green-700 text-sm">Eficiencia</p>
              </div>
            </div>

            {/* Calendario o Búsqueda/Filtros */}
            {vistaCalendario ? (
              <Calendario />
            ) : (
              <>
                {/* Búsqueda y Filtros */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                    <Input
                      placeholder="Buscar actividades..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="pl-10 bg-white/70 border-green-200"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {['todas', 'pendientes', 'progreso', 'completadas', 'urgentes'].map((filtroItem) => (
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
                    name="tarea"
                    placeholder="Nombre de la tarea *"
                    value={form.tarea}
                    onChange={handleChange}
                    className="bg-white/70 border-green-200"
                  />
                  <Input
                    type="date"
                    name="fecha"
                    placeholder="Fecha inicio"
                    value={form.fecha}
                    onChange={handleChange}
                    className="bg-white/70 border-green-200"
                  />
                  <Input
                    type="date"
                    name="fechaFin"
                    placeholder="Fecha fin"
                    value={form.fechaFin}
                    onChange={handleChange}
                    className="bg-white/70 border-green-200"
                  />
                  <Input
                    name="responsable"
                    placeholder="Responsable *"
                    value={form.responsable}
                    onChange={handleChange}
                    className="bg-white/70 border-green-200"
                  />
                  <select
                    name="prioridad"
                    value={form.prioridad}
                    onChange={handleChange}
                    className="bg-white/70 border border-green-200 rounded-md px-3 py-2 text-green-900"
                  >
                    <option value="baja">🟢 Baja Prioridad</option>
                    <option value="media">🟡 Media Prioridad</option>
                    <option value="alta">🔴 Alta Prioridad</option>
                  </select>
                  <Input
                    name="costoEstimado"
                    type="number"
                    placeholder="Costo estimado"
                    value={form.costoEstimado}
                    onChange={handleChange}
                    className="bg-white/70 border-green-200"
                  />
                  <Input
                    name="equipo"
                    placeholder="Equipo de trabajo"
                    value={form.equipo}
                    onChange={handleChange}
                    className="bg-white/70 border-green-200 md:col-span-2"
                  />
                  <Input
                    name="descripcion"
                    placeholder="Descripción detallada"
                    value={form.descripcion}
                    onChange={handleChange}
                    className="bg-white/70 border-green-200 md:col-span-3"
                  />
                </div>

                <Button
                  onClick={editandoId ? handleUpdate : handleAdd}
                  className="bg-green-600 hover:bg-green-700 text-white w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {editandoId ? 'Actualizar Actividad' : 'Agregar Actividad'}
                </Button>

                {editandoId && (
                  <Button
                    onClick={() => {
                      setEditandoId(null)
                      setForm({ 
                        tarea: "", 
                        fecha: "", 
                        fechaFin: "",
                        responsable: "", 
                        estado: "pendiente",
                        prioridad: "media",
                        costoEstimado: "",
                        descripcion: "",
                        equipo: ""
                      })
                    }}
                    variant="outline"
                    className="w-full border-green-200 text-green-700"
                  >
                    Cancelar Edición
                  </Button>
                )}
              </>
            )}

            {/* Lista de Actividades (solo en vista lista) */}
            {!vistaCalendario && (
              <div className="mt-6 space-y-4">
                {actividadesFiltradas.map((actividad) => (
                  <div
                    key={actividad.id}
                    id={`actividad-${actividad.id}`}
                    className="p-4 bg-white/70 rounded-lg shadow-md space-y-3"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-green-800 text-lg">{actividad.tarea}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            actividad.prioridad === 'alta' ? 'bg-red-100 text-red-800' :
                            actividad.prioridad === 'media' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {actividad.prioridad}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            actividad.estado === 'completada' ? 'bg-green-100 text-green-800' :
                            actividad.estado === 'en progreso' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {actividad.estado}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{actividad.descripcion}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(actividad)}
                          className="border-green-200 text-green-700"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(actividad.id)}
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
                          <User className="h-4 w-4" />
                          <span>{actividad.responsable}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>Equipo: {actividad.equipo || 'Individual'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(actividad.fecha).toLocaleDateString()} - {new Date(actividad.fechaFin).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span>
                            Costo: ${actividad.costoReal || 0} / ${actividad.costoEstimado}
                            {actividad.costoReal > actividad.costoEstimado && actividad.costoEstimado > 0 && (
                              <span className="text-red-600 ml-1">(↑ Sobrecosto)</span>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Tiempo: {actividad.tiempoReal || 0}min</span>
                        </div>
                        {actividadEnCurso === actividad.id && (
                          <div className="flex items-center gap-2 text-blue-600">
                            <Clock className="h-4 w-4" />
                            <span>En curso: {formatearTiempo(tiempoTranscurrido)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Evidencias */}
                    {actividad.evidencias && actividad.evidencias.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {actividad.evidencias.map((evidencia, index) => (
                          <img
                            key={index}
                            src={evidencia}
                            alt={`Evidencia ${index + 1}`}
                            className="w-16 h-16 object-cover rounded border border-green-200"
                          />
                        ))}
                      </div>
                    )}

                    {/* Acciones Rápidas */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {/* Timer */}
                      {actividad.estado !== 'completada' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => 
                            actividadEnCurso === actividad.id 
                              ? detenerTimer(actividad.id)
                              : iniciarTimer(actividad.id)
                          }
                          className={`text-xs ${
                            actividadEnCurso === actividad.id 
                              ? 'bg-red-100 border-red-200 text-red-700'
                              : 'bg-blue-100 border-blue-200 text-blue-700'
                          }`}
                        >
                          {actividadEnCurso === actividad.id ? (
                            <>
                              <Square className="h-3 w-3 mr-1" />
                              Detener
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3 mr-1" />
                              Iniciar Timer
                            </>
                          )}
                        </Button>
                      )}

                      {/* Cambiar Estado */}
                      <select
                        value={actividad.estado}
                        onChange={(e) => cambiarEstado(actividad.id, e.target.value)}
                        className="bg-white border border-green-200 rounded px-2 py-1 text-xs text-green-700"
                      >
                        <option value="pendiente">⏳ Pendiente</option>
                        <option value="en progreso">🔄 En Progreso</option>
                        <option value="completada">✅ Completada</option>
                      </select>

                      {/* Costo Real */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const costo = prompt('Costo real de la actividad:')
                          if (costo) agregarCostoReal(actividad.id, costo)
                        }}
                        className="border-purple-200 text-purple-700 text-xs"
                      >
                        <DollarSign className="h-3 w-3 mr-1" />
                        Costo Real
                      </Button>

                      {/* Evidencia */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const input = document.createElement('input')
                          input.type = 'file'
                          input.accept = 'image/*'
                          input.onchange = (e) => agregarEvidencia(actividad.id, e.target.files[0])
                          input.click()
                        }}
                        className="border-orange-200 text-orange-700 text-xs"
                      >
                        <Camera className="h-3 w-3 mr-1" />
                        Agregar Foto
                      </Button>

                      {/* Nota */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const nota = prompt('Agregar nota:')
                          if (nota) agregarNota(actividad.id, nota)
                        }}
                        className="border-gray-200 text-gray-700 text-xs"
                      >
                        <Edit3 className="h-3 w-3 mr-1" />
                        Agregar Nota
                      </Button>
                    </div>

                    {/* Notas Recientes */}
                    {actividad.notas && actividad.notas.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-green-200">
                        <p className="text-xs text-green-600 font-medium mb-1">Última nota:</p>
                        <p className="text-xs text-green-700">{actividad.notas[actividad.notas.length - 1]}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!vistaCalendario && actividadesFiltradas.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-green-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-green-900 mb-2">
                  {busqueda ? 'No se encontraron actividades' : 'No hay actividades registradas'}
                </h3>
                <p className="text-green-600">
                  {busqueda ? 'Intenta con otros términos de búsqueda' : 'Comienza planificando tu primera actividad'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}