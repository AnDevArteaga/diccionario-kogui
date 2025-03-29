interface BaseSentences {
    oracion: string;
    significado: string;
  }
  
  export interface Sentence extends BaseSentences {
    id: number;
    imagen: File | string | null;
    formato: string;
  }
  
  export interface NewSentence extends BaseSentences {
    imagen: File | string | null;
  }
  
  export interface EditSentence extends NewSentence {
    id: number;
  }
  