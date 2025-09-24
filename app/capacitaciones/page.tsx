import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Capacitaciones() {
  const recursos = [
    { id: 1, titulo: "Buenas prácticas en cultivo de café", tipo: "📄 Documento" },
    { id: 2, titulo: "Uso responsable del agua en agricultura", tipo: "🎥 Video" },
    { id: 3, titulo: "Manejo de plagas de manera sostenible", tipo: "🎧 Audio" },
  ]

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-green-700 mb-4">📚 Capacitaciones</h1>
          <ul className="space-y-3">
            {recursos.map((r) => (
              <li key={r.id} className="p-4 bg-emerald-50 rounded-lg border border-green-200 flex justify-between items-center">
                <span className="text-gray-700">{r.tipo} {r.titulo}</span>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">Ver</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}
