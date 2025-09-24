import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Actividades() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-emerald-50 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-green-700 mb-4">📅 Actividades Comunitarias</h1>

          {/* Formulario para nueva actividad */}
          <Input placeholder="Descripción de la actividad" />
          <Input type="date" placeholder="Fecha" />
          <Button className="w-full bg-green-600 hover:bg-green-700">Agregar actividad</Button>

          {/* Lista simulada de actividades */}
          <div className="mt-6 space-y-2">
            <h2 className="font-semibold text-gray-700">Actividades registradas:</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>🌱 Siembra colectiva - 2025-09-30</li>
              <li>📚 Taller de café sostenible - 2025-10-05</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
