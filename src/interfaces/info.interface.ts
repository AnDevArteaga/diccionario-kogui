interface BaseInfo {
    info: string;
    significado: string;
}

export interface Info extends BaseInfo {
    id: number;
    imagen: File | string | null;
    formato: string;
}

export interface NewInfo extends BaseInfo {
    imagen: File | string | null;
}

export interface EditInfo extends NewInfo {
    id: number;
}
