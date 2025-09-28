"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BackButton from "@/components/BackButton"
import Image from "next/image"
import { ImagePlus, Trash2 } from "lucide-react"

export default function Gallery() {
  const [images, setImages] = useState<string[]>([])
  const [newImage, setNewImage] = useState("")

  const handleAddImage = () => {
    if (newImage.trim()) {
      setImages([...images, newImage])
      setNewImage("")
    }
  }

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index)
    setImages(updated)
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center p-6">
      {/* Fondo */}
      <Image
        src="https://images.unsplash.com/photo-1554773228-1f38662139db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Galería agrícola"
        fill
        quality={100}
        className="object-cover object-center brightness-70 -z-10"
      />

      <div className="w-full max-w-4xl space-y-6">
        <BackButton />

        {/* Tarjeta */}
        <Card className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-xl">
          <CardContent className="p-6 space-y-6">
            {/* Título */}
            <div className="flex items-center gap-3">
              <ImagePlus className="h-10 w-10 text-green-700" />
              <h1 className="text-2xl font-bold text-green-900">Galería Comunitaria</h1>
            </div>
            <p className="text-gray-700">
              Comparte y explora fotos de tus cultivos, actividades y capacitaciones.
            </p>

            {/* Input para agregar imagen */}
            <div className="flex gap-2">
              <Input
                placeholder="Pega aquí la URL de una imagen..."
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="bg-white/70"
              />
              <Button
                onClick={handleAddImage}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                ➕ Agregar
              </Button>
            </div>

            {/* Grid de imágenes */}
            {images.length === 0 ? (
              <p className="text-gray-600 italic">Aún no hay imágenes en la galería.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="relative group overflow-hidden rounded-xl shadow-md"
                  >
                    <img
                      src={img}
                      alt={`Imagen ${i + 1}`}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-300"
                    />
                    {/* Botón eliminar */}
                    <button
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
