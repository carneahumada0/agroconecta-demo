import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-green-200">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-green-800 text-center">
            🌱 Agro-Conecta Pantanillo
          </h1>
          <p className="text-center text-gray-600">
            Sistema comunitario de gestión agrícola
          </p>
          <div className="grid gap-3">
            <Link href="/cultivos">
              <Button className="w-full bg-green-600 hover:bg-green-700">📋 Cultivos</Button>
            </Link>
            <Link href="/actividades">
              <Button className="w-full bg-green-600 hover:bg-green-700">📅 Actividades</Button>
            </Link>
            <Link href="/capacitaciones">
              <Button className="w-full bg-green-600 hover:bg-green-700">📚 Capacitaciones</Button>
            </Link>
            <Link href="/reportes">
              <Button className="w-full bg-green-600 hover:bg-green-700">📊 Reportes</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
