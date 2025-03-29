import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WordsList from "@/components/word-list";
import SentencesList from "@/components/sentences-list";
import InfoList from "@/components/info-list";
import MapView from "@/components/map-view";

import { getWords } from "@/utils/wordsApi";
import { getSentences } from "@/utils/sentencesApi";
import { getInfo } from "@/utils/infoApi";

export default async function Home() {
  let words = [];
  let sentences = [];
  let info = [];

  try {
    words = await getWords();
    sentences = await getSentences();
    info = await getInfo();
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
  return (
    <main className="container mx-auto px-4 py-6 flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-yellow-900">
        Diccionario Kogui
      </h1>

      <Tabs defaultValue="words" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-100 rounded-lg">
          <TabsTrigger
            value="words"
            className="cursor-pointer text-gray-500 data-[state=active]:text-orange-800 hover:text-orange-800 transition-all rounded-md"
          >
            Palabras
          </TabsTrigger>
          <TabsTrigger
            value="sentences"
            className="cursor-pointer text-gray-500 data-[state=active]:text-orange-800 hover:text-orange-800 transition-all rounded-md"
          >
            Oraciones
          </TabsTrigger>
          <TabsTrigger
            value="info"
            className="cursor-pointer text-gray-500 data-[state=active]:text-orange-800 hover:text-orange-800 transition-all rounded-md"
          >
            Información
          </TabsTrigger>
          <TabsTrigger
            value="map"
            className="cursor-pointer text-gray-500 data-[state=active]:text-orange-800 hover:text-orange-800 transition-all rounded-md"
          >
            Mapa
          </TabsTrigger>
        </TabsList>
        <TabsContent value="words">
          <WordsList words={words} />
        </TabsContent>
        <TabsContent value="sentences">
          <SentencesList sentences={sentences} />
        </TabsContent>
        <TabsContent value="info">
          <InfoList informations={info} />
        </TabsContent>
        <TabsContent value="map">
          <MapView />
        </TabsContent>
      </Tabs>
    </main>
  );
}
