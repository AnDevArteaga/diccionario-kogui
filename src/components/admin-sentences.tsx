"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";

import { addSentences, editSentences, getSentences, deleteSentences } from "@/utils/sentencesApi";

import { EditSentence, NewSentence, Sentence } from "@/interfaces/sentences.interface";

import ImageModal from "@/components/modals/image-admin";
import SenteceDialog from "./modals/sentenceDialog";
import EditSentenceDialog from "./modals/editSentenceDialog";
import useModal from "@/app/hooks/useModal";
import Loading from "@/common/loading";

export default function AdminWords() {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [currentSentece, setCurrentSentence] = useState<EditSentence>({
    id: 0,
    oracion: "",
    significado: "",
    imagen: null,
  });
  const [NewSentence, setNewSentence] = useState<NewSentence>({
    oracion: "",
    significado: "",
    imagen: null,
  });

  const { isOpen, openModal, closeModal } = useModal();

  const getSentecesData = async () => {
    const data = await getSentences();
    setSentences(data);
    setIsLoading(false);
    setNewSentence({
      oracion: "",
      significado: "",
      imagen: null,
    });
    closeModal();
  };

  const newSentenceData = async () => {
    await addSentences(NewSentence);
    getSentecesData();
  };

  const editSentenceData = async () => {
    await editSentences(currentSentece);
    getSentecesData();
  };

  useEffect(() => {
    getSentecesData();
  }, []);

  const handleAddSentece = () => {
    setIsEditing(false);
    setNewSentence({
      oracion: "",
      significado: "",
      imagen: null,
    });
  };

  const handleEditWord = (sentence: EditSentence) => {
    setIsEditing(true);
    setCurrentSentence(sentence);
  };

  const handleDeleteSentence = async (id: number) => {
    setIsLoading(true);
    await deleteSentences(id);
    getSentecesData();
  };

  const handleSaveSentence = () => {
    setIsLoading(true);
    if (isEditing) {
      console.log("edit", currentSentece);
      editSentenceData();
    } else {
      newSentenceData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-orange-800">Gestión de Oraciones</h2>
        <SenteceDialog
          isEditing={isEditing}
          newSentence={NewSentence}
          setNewSentence={setNewSentence}
          handleAddSentence={handleAddSentece}
          handleSaveSentence={handleSaveSentence}
          isLoading={isLoading}
          closeModal={closeModal}
          isOpen={isOpen()}
          openModal={openModal}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-600">Lista de Oraciones</CardTitle>
          <CardDescription>
            Administre las oraciones del diccionario. Puede editar o eliminar
            oraciones existentes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead className="hidden md:table-cell">
                  Descripción
                </TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      <Loading width="w-16 h-16" />
                    </TableCell>
                  </TableRow>
                )
                : sentences.length > 0
                ? (
                  sentences.map((sentence) => (
                    <TableRow key={sentence.id}>
                      <TableCell>{sentence.id}</TableCell>
                      <TableCell className="font-medium">
                        {sentence.oracion}
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {sentence.significado}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => {
                              openModal(`edit-${sentence.id}`);
                              handleEditWord(sentence);
                            }}
                            className="cursor-pointer bg-yellow-800 hover:bg-yellow-900"

                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-destructive cursor-pointer hover:bg-destructive/90 hover:text-white"                                
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  ¿Está seguro?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                {`Esta acción eliminará permanentemente la
                                  palabra "${sentence.oracion}" y no se puede
                                  deshacer`}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel  className="cursor-pointer">Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteSentence(sentence.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white cursor-pointer"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <ImageModal
                            image={typeof sentence.imagen === "string"
                              ? sentence.imagen
                              : sentence.imagen
                              ? URL.createObjectURL(sentence.imagen)
                              : ""}
                            format={sentence.formato}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )
                : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-4 text-gray-500"
                    >
                      No hay palabras disponibles.
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
            <EditSentenceDialog
              handleSaveSentence={handleSaveSentence}
              isLoading={isLoading}
              closeModal={closeModal}
              isOpen={isOpen(`edit-${currentSentece?.id}`)}
              currentSentence={currentSentece}
              setCurrentSentence={setCurrentSentence}
              isEditing={isEditing}
            />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
