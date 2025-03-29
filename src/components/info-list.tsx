"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
import { toggleExpand } from "@/utils/toggleExpand";
import { AnimatePresence, motion } from "framer-motion";

interface Information {
  info: string;
  formato: string;
  imagen: string;
  significado: string;
}

export default function InfoList(
  { informations }: { informations: Information[] },
) {
  const [expandedId, setExpandedId] = useState<string[]>([]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-600 mb-4">Información</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {informations.map((information) => (
          <Card
            key={information.info}
            className={`transition-all duration-300 ${
              expandedId.includes(information.info)
                ? "h-auto"
                : "h-[120px] overflow-hidden"
            }`}
          >
            <CardHeader>
              <CardTitle>{information.info}</CardTitle>
            </CardHeader>
            <AnimatePresence initial={false}>
              {expandedId.includes(information.info) && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, scale: 0.98, height: 0 }}
                  animate={{ opacity: 1, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, scale: 0.98, height: 0 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                >
                  <CardContent>
                    <CardDescription className="mb-4">
                      {information.significado}
                    </CardDescription>
                    <div className="relative h-auto w-full flex justify-center">

                    <Image
                      src={getImageUrl(information.imagen, information.formato)}
                      alt={information.info}
                      className="object-cover rounded-md"
                      width={250}
                      height={250}
                      unoptimized
                      style={{ userSelect: "none", pointerEvents: "none" }}
                    />
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
            <CardFooter className="justify-center">
              <Button
                variant="outline"
                onClick={() => toggleExpand(information.info, setExpandedId)}
                className="w-1/2 cursor-pointer bg-yellow-800 text-white hover:bg-yellow-900 hover:text-white"
              >
                {expandedId.includes(information.info)
                  ? "Ver menos"
                  : "Ver más"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
