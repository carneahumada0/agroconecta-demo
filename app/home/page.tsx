"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Calendar, BookOpen, BarChart3, Map, Target, Zap, Shield } from "lucide-react"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Fondo */}
      <Image
        src="https://images.unsplash.com/photo-1693452968861-d43fd1621b04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Campo agrícola verde"
        fill
        priority
        quality={100}
        className="object-cover object-center brightness-70 -z-10"
      />

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-4 z-20">
        <h1 className="text-2xl font-bold text-white drop-shadow-md">
          🌱 AgroConecta
        </h1>
        <nav className="flex gap-6 text-white font-medium drop-shadow-md">
          <Link href="/about" className="hover:text-green-200">Acerca de</Link>
          <Link href="/gallery" className="hover:text-green-200">Galería</Link>
          <Link href="/blog" className="hover:text-green-200">Foro/Blog</Link>
          <Link href="/faq" className="hover:text-green-200">FAQ</Link>
        </nav>
      </div>

      {/* HERO SECTION - Sin botones */}
      <section className="relative z-10 flex items-center justify-center min-h-[60vh] px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Transforma tu Agricultura
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg leading-relaxed">
            La plataforma integral para gestionar, aprender y crecer en el sector agrícola
          </p>
        </div>
      </section>

      {/* ESTADÍSTICAS ACTUALIZADAS */}
      <section className="relative z-10 py-12 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center text-white">
            <Map className="h-8 w-8 mx-auto mb-2 text-green-300" />
            <div className="text-3xl font-bold drop-shadow-md">32</div>
            <div className="text-white/80">Departamentos en nuestro mapa</div>
          </div>
          <div className="text-center text-white">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-300" />
            <div className="text-3xl font-bold drop-shadow-md">1,200+</div>
            <div className="text-white/80">Hectáreas a gestionar</div>
          </div>
          <div className="text-center text-white">
            <Zap className="h-8 w-8 mx-auto mb-2 text-green-300" />
            <div className="text-3xl font-bold drop-shadow-md">95%</div>
            <div className="text-white/80">Mayor eficiencia</div>
          </div>
          <div className="text-center text-white">
            <Shield className="h-8 w-8 mx-auto mb-2 text-green-300" />
            <div className="text-3xl font-bold drop-shadow-md">24/7</div>
            <div className="text-white/80">Soporte</div>
          </div>
        </div>
      </section>

      {/* TARJETAS PRINCIPALES */}
      <section className="relative z-10 py-8 px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Nuestras Soluciones</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto drop-shadow-md">
            Herramientas diseñadas específicamente para las necesidades del agricultor moderno
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-7xl mx-auto">
          {/* Cultivos */}
          <Link href="/cultivos">
            <Card className="h-[420px] w-[280px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl transition-all duration-300 hover:bg-green-200/30 hover:scale-105 hover:shadow-xl group mx-auto">
              <CardContent className="flex flex-col items-center justify-center gap-8 p-8 text-center h-full">
                <Leaf className="h-24 w-24 text-green-700 group-hover:text-green-800 transition-colors" />
                <div>
                  <h2 className="text-2xl font-bold text-green-900 group-hover:text-green-950 transition-colors mb-4">
                    Cultivos
                  </h2>
                  <p className="text-lg text-gray-700 group-hover:text-gray-800 leading-relaxed transition-colors">
                    Registra y gestiona los cultivos de tu finca con seguimiento en tiempo real.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Actividades */}
          <Link href="/actividades">
            <Card className="h-[420px] w-[280px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl transition-all duration-300 hover:bg-green-200/30 hover:scale-105 hover:shadow-xl group mx-auto">
              <CardContent className="flex flex-col items-center justify-center gap-8 p-8 text-center h-full">
                <Calendar className="h-24 w-24 text-green-700 group-hover:text-green-800 transition-colors" />
                <div>
                  <h2 className="text-2xl font-bold text-green-900 group-hover:text-green-950 transition-colors mb-4">
                    Actividades
                  </h2>
                  <p className="text-lg text-gray-700 group-hover:text-gray-800 leading-relaxed transition-colors">
                    Planifica y registra tareas agrícolas con recordatorios automáticos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Capacitaciones */}
          <Link href="/capacitaciones">
            <Card className="h-[420px] w-[280px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl transition-all duration-300 hover:bg-green-200/30 hover:scale-105 hover:shadow-xl group mx-auto">
              <CardContent className="flex flex-col items-center justify-center gap-8 p-8 text-center h-full">
                <BookOpen className="h-24 w-24 text-green-700 group-hover:text-green-800 transition-colors" />
                <div>
                  <h2 className="text-2xl font-bold text-green-900 group-hover:text-green-950 transition-colors mb-4">
                    Capacitaciones
                  </h2>
                  <p className="text-lg text-gray-700 group-hover:text-gray-800 leading-relaxed transition-colors">
                    Accede a materiales y recursos de formación actualizados.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Reportes */}
          <Link href="/reportes">
            <Card className="h-[420px] w-[280px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl transition-all duration-300 hover:bg-green-200/30 hover:scale-105 hover:shadow-xl group mx-auto">
              <CardContent className="flex flex-col items-center justify-center gap-8 p-8 text-center h-full">
                <BarChart3 className="h-24 w-24 text-green-700 group-hover:text-green-800 transition-colors" />
                <div>
                  <h2 className="text-2xl font-bold text-green-900 group-hover:text-green-950 transition-colors mb-4">
                    Reportes
                  </h2>
                  <p className="text-lg text-gray-700 group-hover:text-gray-800 leading-relaxed transition-colors">
                    Genera informes individuales o comunitarios con análisis detallados.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* NUESTRO PROPÓSITO */}
      <section className="relative z-10 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Nuestro Propósito</h2>
            <p className="text-lg text-white/80 drop-shadow-md">
              Transformando la agricultura mediante tecnología accesible y comunidad
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 md:p-12">
            <div className="grid gap-6 md:gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-3 rounded-lg mt-1">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Plataforma Digital con Funcionalidad Offline</h3>
                  <p className="text-white/80 leading-relaxed">
                    Diseñar una plataforma digital con funcionalidad offline para que los agricultores registren y consulten información de cultivos y actividades sin necesidad de internet constante.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-3 rounded-lg mt-1">
                  <BookOpen className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Capacitación Digital Integral</h3>
                  <p className="text-white/80 leading-relaxed">
                    Implementar un módulo de capacitación digital con guías prácticas (documentos, videos, audios) en temas agrícolas, empresariales y de sostenibilidad.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-3 rounded-lg mt-1">
                  <BarChart3 className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Sistema de Reportes Avanzado</h3>
                  <p className="text-white/80 leading-relaxed">
                    Crear un sistema de reportes de producción individual y comunitaria que facilite la planificación de ventas y la negociación con compradores.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-3 rounded-lg mt-1">
                  <Leaf className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Integración Comunitaria</h3>
                  <p className="text-white/80 leading-relaxed">
                    Promover la participación comunitaria y la integración de jóvenes mediante una herramienta tecnológica de fácil uso.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-3 rounded-lg mt-1">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Estructura para el Futuro</h3>
                  <p className="text-white/80 leading-relaxed">
                    Establecer la estructura de datos y procesos básicos para permitir la futura ampliación del sistema hacia funciones de comercialización en línea y gestión de recursos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER FINAL - Sin redundancias */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-lg border-t border-white/20 py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">🌱 AgroConecta</h3>
            <p className="text-white/70">Transformando la agricultura mediante tecnología innovadora</p>
          </div>
          
          <div className="flex justify-center">
            <div className="text-center">
              <h4 className="text-white font-semibold mb-4 text-lg">Soporte</h4>
              <div className="flex flex-col gap-3 text-white/70">
                <Link href="/contact" className="hover:text-white transition">Contacto</Link>
                <Link href="/privacy" className="hover:text-white transition">Privacidad</Link>
                <Link href="/status" className="hover:text-white transition">Estado del Sistema</Link>
              </div>
            </div>
          </div>
          
          <div className="text-center text-white/50 mt-8 pt-6 border-t border-white/10">
            <p>&copy; 2024 AgroConecta. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}



