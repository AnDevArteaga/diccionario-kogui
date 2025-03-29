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
import { EditInfo } from "@/interfaces/info.interface";
import Loading from "@/common/loading";
import { areFieldsFilled } from "@/utils/buttonDisabled";

interface WordDialogProps {
    isEditing: boolean;
    currentInfo: EditInfo;
    setCurrentInfo: React.Dispatch<React.SetStateAction<EditInfo>>;
    handleSaveInfo: () => void;
    isLoading: boolean;
    closeModal: () => void;
    isOpen: boolean;
}

const WordDialog = (
    {
        handleSaveInfo,
        isLoading,
        closeModal,
        isOpen,
        currentInfo,
        setCurrentInfo,
    }: WordDialogProps,
) => {
    const isDisabled = !areFieldsFilled(currentInfo, ['info', 'significado']);
    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-orange-800">Editar Información</DialogTitle>
                    <DialogDescription>
                        Actualice los detalles de la información seleccionada.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-title">Título</Label>
                        <Input
                            id="edit-title"
                            value={currentInfo.info}
                            onChange={(e) =>
                                setCurrentInfo({
                                    ...currentInfo,
                                    info: e.target.value,
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
                            value={currentInfo.significado}
                            onChange={(e) =>
                                setCurrentInfo({
                                    ...currentInfo,
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
                                setCurrentInfo({
                                    ...currentInfo,
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
