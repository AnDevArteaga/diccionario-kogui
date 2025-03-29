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
import { EditSentence } from "@/interfaces/sentences.interface";
import Loading from "@/common/loading";
import { areFieldsFilled } from "@/utils/buttonDisabled";

interface WordDialogProps {
    isEditing: boolean;
    currentSentence: EditSentence;
    setCurrentSentence: React.Dispatch<React.SetStateAction<EditSentence>>;
    handleSaveSentence: () => void;
    isLoading: boolean;
    closeModal: () => void;
    isOpen: boolean;
}

const WordDialog = (
    {
        handleSaveSentence,
        isLoading,
        closeModal,
        isOpen,
        currentSentence,
        setCurrentSentence,
    }: WordDialogProps,
) => {
    const isDisabled = !areFieldsFilled(currentSentence, ['oracion', 'significado']);
    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-orange-800">Editar Oración</DialogTitle>
                    <DialogDescription>
                        Actualice los detalles de la oración seleccionada.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-title" >Título</Label>
                        <Input
                            id="edit-title"
                            value={currentSentence.oracion}
                            onChange={(e) =>
                                setCurrentSentence({
                                    ...currentSentence,
                                    oracion: e.target.value,
                                })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-description">
                            Descripción
                        </Label>
                        <Textarea
                            id="edit-description"
                            rows={4}
                            value={currentSentence.significado}
                            onChange={(e) =>
                                setCurrentSentence({
                                    ...currentSentence,
                                    significado: e.target.value,
                                })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-imageUrl">
                            URL de la imagen
                        </Label>
                        <Input
                            type="file"
                            id="imageUrl"
                            onChange={(e) =>
                                setCurrentSentence({
                                    ...currentSentence,
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
                        {isLoading
                            ? <Loading width="w-6 h-6" />
                            : "Guardar cambios"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WordDialog;
