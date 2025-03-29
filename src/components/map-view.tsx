import Image from "next/image"
import { Card, CardContent} from "@/components/ui/card"
import mapa from "@/assets/mapa.png"

export default function MapView() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mapa de acceso a Taiku</h2>
      <Card>

        <CardContent>
          <div className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden">
            <Image
              src={mapa}
              alt="Mapa de distribución del español"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-background/80 p-3 rounded-lg shadow-md">
              <p className="text-sm font-medium">Leyenda</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                <span className="text-xs">Ruta a seguir</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                <span className="text-xs">Puntos de interés</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

