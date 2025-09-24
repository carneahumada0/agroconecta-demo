import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Cultivos() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-green-700 mb-4">📋 Registro de Cultivos</h1>
          <Input placeholder="Tipo de cultivo (ej: café, plátano)" />
          <Input type="date" placeholder="Fecha de siembra" />
          <Input placeholder="Estado (ej: en crecimiento, cosechado)" />
          <Button className="w-full bg-green-600 hover:bg-green-700">Guardar cultivo</Button>
        </CardContent>
      </Card>
    </main>
  )
}
