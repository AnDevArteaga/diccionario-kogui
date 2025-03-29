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

import { addInfo, editInfo, getInfo, deleteInfo } from "@/utils/infoApi";

import { EditInfo, NewInfo, Info } from "@/interfaces/info.interface";

import ImageModal from "@/components/modals/image-admin";
import InfoDialog from "./modals/infoDialog";
import EditInfoDialog from "./modals/editInfoDialog";
import useModal from "@/app/hooks/useModal";
import Loading from "@/common/loading";

export default function AdminWords() {
  const [info, setInfo] = useState<Info[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [currentInfo, setCurrentInfo] = useState<EditInfo>({
    id: 0,
    info: "",
    significado: "",
    imagen: null,
  });
  const [newInfo, setNewInfo] = useState<NewInfo>({
    info: "",
    significado: "",
    imagen: null,
  });

  const { isOpen, openModal, closeModal } = useModal();

  const getInfoData = async () => {
    const data = await getInfo();
    setInfo(data);
    setIsLoading(false);
    setNewInfo({
      info: "",
      significado: "",
      imagen: null,
    });
    closeModal();
  };

  const newInfoData = async () => {
    await addInfo(newInfo);
    getInfoData();
  };

  const editInfoData = async () => {
    await editInfo(currentInfo);
    getInfoData();
  };

  useEffect(() => {
    getInfoData();
  }, []);

  const handleAddInfo = () => {
    setIsEditing(false);
    setNewInfo({
      info: "",
      significado: "",
      imagen: null,
    });
  };

  const handleEditInfo = (info: EditInfo) => {
    setIsEditing(true);
    setCurrentInfo(info);
  };

  const handleDeleteInfo = async (id: number) => {
    setIsLoading(true);
    await deleteInfo(id);
    getInfoData();
  };

  const handleSaveInfo = () => {
    setIsLoading(true);
    if (isEditing) {
      console.log("edit", currentInfo);
      editInfoData();
      
    } else {
      newInfoData();
      
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-orange-800">Gestión de Información</h2>
        <InfoDialog
          isEditing={isEditing}
          newInfo={newInfo}
          setNewInfo={setNewInfo}
          handleAddInfo={handleAddInfo}
          handleSaveInfo={handleSaveInfo}
          isLoading={isLoading}
          closeModal={closeModal}
          isOpen={isOpen()}
          openModal={openModal}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-600">Lista de informaciones</CardTitle>
          <CardDescription>
            Administre las informaciones del diccionario. Puede editar o eliminar
            informaciones existentes.
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
                : info.length > 0
                ? (
                  info.map((inf) => (
                    <TableRow key={inf.id}>
                      <TableCell>{inf.id}</TableCell>
                      <TableCell className="font-medium">
                        {inf.info}
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {inf.significado}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => {
                              openModal(`edit-${inf.id}`);
                              handleEditInfo(inf);
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
                                  palabra "${inf.info}" y no se puede
                                  deshacer`}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteInfo(inf.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white cursor-pointer"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <ImageModal
                            image={typeof inf.imagen === "string"
                              ? inf.imagen
                              : inf.imagen
                              ? URL.createObjectURL(inf.imagen)
                              : ""}
                            format={inf.formato}
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
            <EditInfoDialog
              handleSaveInfo={handleSaveInfo}
              isLoading={isLoading}
              closeModal={closeModal}
              isOpen={isOpen(`edit-${currentInfo?.id}`)}
              currentInfo={currentInfo}
              setCurrentInfo={setCurrentInfo}
              isEditing={isEditing}
            />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
 