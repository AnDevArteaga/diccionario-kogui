import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { NewInfo } from "@/interfaces/info.interface";
import Loading from "@/common/loading";
import { areFieldsFilled } from "@/utils/buttonDisabled";

interface WordDialogProps {
    isEditing: boolean;
    newInfo: NewInfo;
    setNewInfo: React.Dispatch<React.SetStateAction<NewInfo>>;
    handleSaveInfo: () => void;
    handleAddInfo: () => void;
    isLoading: boolean;
    closeModal: () => void;
    isOpen: boolean;
    openModal: () => void;
}

const WordDialog = (
    { isEditing, newInfo, setNewInfo, handleSaveInfo, handleAddInfo, isLoading, closeModal, isOpen, openModal }:
        WordDialogProps,
) => {
    const isDisabled = !areFieldsFilled(newInfo, ['info', 'significado']);
    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
                <Button onClick={() => { openModal(); 
                    handleAddInfo()}} className="cursor-pointer bg-yellow-800 hover:bg-yellow-900">
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir Información
                </Button>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-orange-800">
                        {isEditing ? "Editar información" : "Añadir Nueva Información"}
                    </DialogTitle>
                    <DialogDescription>
                        Complete el formulario para{" "}
                        {isEditing ? "actualizar la" : "añadir una nueva"}{" "}
                        información al diccionario.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Infomación</Label>
                        <Input
                            id="title"
                            value={newInfo.info}
                            onChange={(e) =>
                                setNewInfo({
                                    ...newInfo,
                                    info: e.target.value,
                                })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Significado</Label>
                        <Textarea
                            id="description"
                            rows={4}
                            value={newInfo.significado}
                            onChange={(e) =>
                                setNewInfo({
                                    ...newInfo,
                                    significado: e.target.value,
                                })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="imageUrl">Imagen</Label>
                        <Input
                            type="file"
                            id="imageUrl"
                            onChange={(e) =>
                                setNewInfo({
                                    ...newInfo,
                                    imagen: e.target.files?.[0] || null,
                                })}
                            accept="image/*"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSaveInfo}
                        className="bg-orange-900 hover:bg-orange-800 cursor-pointer"
                        disabled={isDisabled}
                    >
                        {isLoading ? <Loading width="w-6 h-6" /> : "Guardar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WordDialog;
