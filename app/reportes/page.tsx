"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import BackButton from "@/components/BackButton"
import Image from "next/image"
import { 
  BarChart3, TrendingUp, DollarSign, Calendar, 
  AlertTriangle, Download, RefreshCw,
  ArrowUp, ArrowDown, FileText, Target, Leaf
} from "lucide-react"

// Interfaces para los tipos de datos
interface RendimientoItem {
  cultivo: string;
  rendimiento: number;
  tendencia: string;
  cambio: number;
}

interface HistoricoMensual {
  mes: string;
  produccion: number;
  costos: number;
  ganancias: number;
  eficiencia: number;
}

interface AnalisisCosto {
  cultivo: string;
  costo: number;
  ganancia: number;
  roi: number;
  rentable: boolean;
}

interface Alerta {
  tipo: string;
  severidad: string;
  mensaje: string;
  detalle: string;
  fecha: string;
}

interface ComparativaAnual {
  año: string;
  rendimiento: number;
  costos: number;
  ganancias: number;
}

interface Recomendacion {
  tipo: string;
  titulo: string;
  descripcion: string;
  impacto: string;
  accion: string;
}

interface Resumen {
  cultivosActivos: number;
  hectareasTotales: number;
  rendimientoPromedio: number;
  eficienciaGeneral: number;
  gananciaTotal: number;
  crecimiento: number;
}

interface DatosReporte {
  rendimiento: RendimientoItem[];
  historicoMensual: HistoricoMensual[];
  analisisCostos: AnalisisCosto[];
  alertas: Alerta[];
  comparativaAnual: ComparativaAnual[];
  recomendaciones: Recomendacion[];
  resumen: Resumen;
}

export default function Reportes() {
  const [periodo, setPeriodo] = useState('2024')
  const [datos, setDatos] = useState<DatosReporte | null>(null) // ← CORREGIDO AQUÍ
  const [cargando, setCargando] = useState(true)

  // Generar datos sintéticos realistas
  const generarDatosSinteticos = (): DatosReporte => { // ← Agregar tipo de retorno
    const cultivos = ['Maíz', 'Tomate', 'Papa', 'Frijol', 'Café', 'Arroz']
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    
    // Datos de rendimiento por cultivo
    const rendimiento = cultivos.map(cultivo => {
      const base = Math.random() * 1000 + 500 // 500-1500 kg/hectárea
      return {
        cultivo,
        rendimiento: Math.round(base),
        tendencia: Math.random() > 0.5 ? 'subiendo' : 'bajando',
        cambio: Math.round((Math.random() - 0.5) * 20) // -10% a +10%
      }
    })

    // Datos mensuales para gráficas de líneas
    const historicoMensual = meses.map((mes, index) => {
      const baseProduccion = 1000 + Math.sin(index * 0.5) * 300
      const baseCosto = 500 + Math.cos(index * 0.3) * 100
      const baseGanancia = baseProduccion * 2.5 - baseCosto
      
      return {
        mes,
        produccion: Math.round(baseProduccion + (Math.random() - 0.5) * 100),
        costos: Math.round(baseCosto + (Math.random() - 0.5) * 50),
        ganancias: Math.round(baseGanancia + (Math.random() - 0.5) * 200),
        eficiencia: Math.round(70 + (Math.random() - 0.5) * 20)
      }
    })

    // Análisis de costos vs ganancias
    const analisisCostos = cultivos.map(cultivo => {
      const costo = Math.random() * 2000 + 1000
      const ganancia = costo * (1.5 + Math.random() * 1.0)
      const roi = ((ganancia - costo) / costo * 100)
      
      return {
        cultivo,
        costo: Math.round(costo),
        ganancia: Math.round(ganancia),
        roi: Math.round(roi * 100) / 100,
        rentable: roi > 25
      }
    })

    // Alertas inteligentes
    const alertas = [
      {
        tipo: 'rendimiento',
        severidad: 'alta',
        mensaje: 'Bajo rendimiento en cultivo de Maíz',
        detalle: 'Rendimiento 15% por debajo del promedio histórico',
        fecha: '2024-03-15'
      },
      {
        tipo: 'plaga',
        severidad: 'media',
        mensaje: 'Posible plaga detectada en Tomate',
        detalle: 'Aumento del 30% en aplicaciones de pesticidas',
        fecha: '2024-03-10'
      },
      {
        tipo: 'clima',
        severidad: 'baja',
        mensaje: 'Condiciones climáticas favorables',
        detalle: 'Precipitaciones óptimas para los próximos días',
        fecha: '2024-03-12'
      }
    ]

    // Comparativa histórica
    const comparativaAnual = [
      { año: '2022', rendimiento: 850, costos: 42000, ganancias: 125000 },
      { año: '2023', rendimiento: 920, costos: 45000, ganancias: 138000 },
      { año: '2024', rendimiento: 1050, costos: 48000, ganancias: 152000 }
    ]

    // Recomendaciones basadas en datos
    const recomendaciones = [
      {
        tipo: 'optimizacion',
        titulo: 'Optimizar riego en Maíz',
        descripcion: 'El consumo de agua está 20% por encima del óptimo',
        impacto: 'alto',
        accion: 'Ajustar programa de riego'
      },
      {
        tipo: 'inversion',
        titulo: 'Invertir en fertilizantes orgánicos',
        descripcion: 'Podría aumentar rendimiento en 15% con menor costo',
        impacto: 'medio',
        accion: 'Evaluar proveedores'
      },
      {
        tipo: 'diversificacion',
        titulo: 'Diversificar con cultivo de Aguacate',
        descripcion: 'Mercado en crecimiento con alta rentabilidad',
        impacto: 'alto',
        accion: 'Estudio de viabilidad'
      }
    ]

    return {
      rendimiento,
      historicoMensual,
      analisisCostos,
      alertas,
      comparativaAnual,
      recomendaciones,
      resumen: {
        cultivosActivos: 6,
        hectareasTotales: 45,
        rendimientoPromedio: 980,
        eficienciaGeneral: 78,
        gananciaTotal: 152000,
        crecimiento: 10.2
      }
    }
  }

  useEffect(() => {
    // Simular carga de datos
    setCargando(true)
    setTimeout(() => {
      setDatos(generarDatosSinteticos())
      setCargando(false)
    }, 1500)
  }, [periodo])

  const exportarPDF = () => {
    alert('📊 Generando reporte PDF... (Funcionalidad simulada)')
  }

  const exportarExcel = () => {
    alert('📈 Exportando a Excel... (Funcionalidad simulada)')
  }

  const getColorSeveridad = (severidad: string) => {
    switch (severidad) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200'
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'baja': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getColorImpacto = (impacto: string) => {
    switch (impacto) {
      case 'alto': return 'text-green-600'
      case 'medio': return 'text-yellow-600'
      case 'bajo': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  if (cargando) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center p-6">
        <Image
          src="https://images.unsplash.com/photo-1689331875804-20d85557d440?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Reportes agrícolas"
          fill
          priority
          quality={100}
          className="object-cover object-center brightness-70 -z-10"
        />
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-800 text-lg font-medium">Cargando análisis de datos...</p>
          <p className="text-green-600">Generando reportes inteligentes</p>
        </div>
      </main>
    )
  }

  // Verificar que datos no sea null
  if (!datos) {
    return <div>Error: No se pudieron cargar los datos</div>
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center p-6">
      {/* Fondo */}
      <Image
        src="https://images.unsplash.com/photo-1689331875804-20d85557d440?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Reportes agrícolas"
        fill
        priority
        quality={100}
        className="object-cover object-center brightness-70 -z-10"
      />

      <div className="w-full max-w-7xl space-y-6">
        <BackButton />

        {/* Tarjeta Principal */}
        <Card className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-xl">
          <CardContent className="p-6 space-y-6">
            {/* Header con Controles */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-10 w-10 text-green-700" />
                <div>
                  <h1 className="text-2xl font-bold text-green-900">Dashboard de Reportes</h1>
                  <p className="text-gray-700">Análisis inteligente y visualización de datos agrícolas</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <select
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  className="bg-white/70 border border-green-200 rounded-lg px-3 py-2 text-green-900"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setCargando(true)
                    setTimeout(() => {
                      setDatos(generarDatosSinteticos())
                      setCargando(false)
                    }, 1000)
                  }}
                  className="border-green-200 text-green-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualizar
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    onClick={exportarPDF}
                    variant="outline"
                    className="border-green-200 text-green-700"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    onClick={exportarExcel}
                    variant="outline"
                    className="border-green-200 text-green-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </div>
            </div>

            {/* KPI Cards - Resumen Ejecutivo */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white/70 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Rendimiento Promedio</p>
                      <p className="text-2xl font-bold text-green-900">{datos.resumen.rendimientoPromedio} kg/ha</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">{datos.resumen.crecimiento}% vs año anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Ganancia Total</p>
                      <p className="text-2xl font-bold text-green-900">${datos.resumen.gananciaTotal.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-sm text-green-600 mt-2">+12.5% crecimiento anual</div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Eficiencia General</p>
                      <p className="text-2xl font-bold text-green-900">{datos.resumen.eficienciaGeneral}%</p>
                    </div>
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-sm text-green-600 mt-2">+8pts vs trimestre anterior</div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Cultivos Activos</p>
                      <p className="text-2xl font-bold text-green-900">{datos.resumen.cultivosActivos}</p>
                    </div>
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-sm text-green-600 mt-2">{datos.resumen.hectareasTotales} hectáreas</div>
                </CardContent>
              </Card>
            </div>

            {/* Gráficas y Análisis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Rendimiento por Cultivo */}
              <Card className="bg-white/70 border-green-200">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Rendimiento por Cultivo (kg/hectárea)
                  </h3>
                  <div className="space-y-3">
                    {datos.rendimiento.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-800">{item.cultivo}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-green-200 rounded-full h-3">
                            <div 
                              className="bg-green-600 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${(item.rendimiento / 1500) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center gap-1 w-16 justify-end">
                            <span className="text-sm font-bold text-green-900">{item.rendimiento}</span>
                            {item.tendencia === 'subiendo' ? (
                              <ArrowUp className="h-3 w-3 text-green-600" />
                            ) : (
                              <ArrowDown className="h-3 w-3 text-red-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Análisis de Costos vs Ganancias */}
              <Card className="bg-white/70 border-green-200">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    ROI por Cultivo
                  </h3>
                  <div className="space-y-3">
                    {datos.analisisCostos.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border border-green-100">
                        <div>
                          <span className="text-sm font-medium text-green-800 block">{item.cultivo}</span>
                          <span className="text-xs text-green-600">
                            Inversión: ${item.costo.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-bold ${item.rentable ? 'text-green-600' : 'text-red-600'}`}>
                            {item.roi}% ROI
                          </span>
                          <div className="text-xs text-green-600">
                            Ganancia: ${item.ganancia.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alertas Inteligentes */}
            <Card className="bg-white/70 border-green-200">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Alertas Inteligentes
                </h3>
                <div className="space-y-3">
                  {datos.alertas.map((alerta, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${getColorSeveridad(alerta.severidad)}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{alerta.mensaje}</p>
                          <p className="text-sm opacity-80 mt-1">{alerta.detalle}</p>
                        </div>
                        <span className="text-xs opacity-70">{alerta.fecha}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comparativa Histórica y Recomendaciones */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Comparativa Anual */}
              <Card className="bg-white/70 border-green-200">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Evolución Anual
                  </h3>
                  <div className="space-y-4">
                    {datos.comparativaAnual.map((año, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white rounded border border-green-100">
                        <span className="font-medium text-green-800">{año.año}</span>
                        <div className="text-right">
                          <div className="text-sm text-green-600">Rend: {año.rendimiento}kg/ha</div>
                          <div className="text-sm text-green-600">Gan: ${año.ganancias.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recomendaciones IA */}
              <Card className="bg-white/70 border-green-200">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Recomendaciones Inteligentes
                  </h3>
                  <div className="space-y-3">
                    {datos.recomendaciones.map((rec, index) => (
                      <div key={index} className="p-3 bg-white rounded border border-green-100">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-green-800">{rec.titulo}</span>
                          <span className={`text-xs font-medium ${getColorImpacto(rec.impacto)}`}>
                            Impacto {rec.impacto}
                          </span>
                        </div>
                        <p className="text-sm text-green-600 mb-2">{rec.descripcion}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-green-200 text-green-700 text-xs"
                        >
                          {rec.accion}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Timeline de Tendencia Mensual */}
            <Card className="bg-white/70 border-green-200">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Tendencia Mensual 2024
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {datos.historicoMensual.map((mes, index) => (
                    <div key={index} className="text-center p-2 bg-white rounded border border-green-100">
                      <div className="text-sm font-medium text-green-800">{mes.mes}</div>
                      <div className="text-xs text-green-600 mt-1">
                        <div>Prod: {mes.produccion}kg</div>
                        <div>Gan: ${mes.ganancias}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}