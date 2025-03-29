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
import { NewSentence } from "@/interfaces/sentences.interface";
import Loading from "@/common/loading";
import { areFieldsFilled } from "@/utils/buttonDisabled";

interface WordDialogProps {
    isEditing: boolean;
    newSentence: NewSentence;
    setNewSentence: React.Dispatch<React.SetStateAction<NewSentence>>;
    handleSaveSentence: () => void;
    handleAddSentence: () => void;
    isLoading: boolean;
    closeModal: () => void;
    isOpen: boolean;
    openModal: () => void;
}

const WordDialog = (
    { isEditing, newSentence, setNewSentence, handleSaveSentence, handleAddSentence, isLoading, closeModal, isOpen, openModal }:
        WordDialogProps,
) => {
    const isDisabled = !areFieldsFilled(newSentence, ['oracion', 'significado']);
    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
                <Button onClick={() => { openModal(); 
                    handleAddSentence()}} className="cursor-pointer bg-yellow-800 hover:bg-yellow-900">
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir Oración
                </Button>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-orange-800">
                        {isEditing ? "Editar Oración" : "Añadir Nueva Oración"}	
                    </DialogTitle>
                    <DialogDescription>
                        Complete el formulario para{" "}
                        {isEditing ? "actualizar la" : "añadir una nueva"}{" "}
                        oración al diccionario.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Oración</Label>
                        <Input
                            id="title"
                            value={newSentence.oracion}
                            onChange={(e) =>
                                setNewSentence({
                                    ...newSentence,
                                    oracion: e.target.value,
                                })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Significado</Label>
                        <Textarea
                            id="description"
                            rows={4}
                            value={newSentence.significado}
                            onChange={(e) =>
                                setNewSentence({
                                    ...newSentence,
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
                                setNewSentence({
                                    ...newSentence,
                                    imagen: e.target.files?.[0] || null,
                                })}
                            accept="image/*"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSaveSentence}
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
