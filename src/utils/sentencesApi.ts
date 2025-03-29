import axios from "axios"
import { NewSentence, EditSentence } from "@/interfaces/sentences.interface"


export async function getSentences() {
    try {
      const response = await axios.get("https://edutlasdeveloper.pythonanywhere.com/api/oraciones")
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  
export async function addSentences(sentence: NewSentence) {
    if (!sentence.imagen) {
      console.log('no imagen')
      return;
    }
    const formData = new FormData();
    formData.append("oracion", sentence.oracion);
    formData.append("significado", sentence.significado);
    formData.append("imagen", sentence.imagen);
  
    try {
      console.log('formData', formData)
      console.log('oracion', sentence)
      const response = await axios.post("https://edutlasdeveloper.pythonanywhere.com/api/guardaroracion", formData)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }
  
  export async function editSentences(sentence: EditSentence) {
    if (!sentence.imagen) {
      console.log('no imagen')
      return;
    }
  
    const formData = new FormData();
    formData.append("oracion", sentence.oracion);
    formData.append("significado", sentence.significado);
    formData.append("imagen", sentence.imagen);
  
    try {
      console.log('word', sentence)
      const response = await axios.put(`https://edutlasdeveloper.pythonanywhere.com/api/oraciones/${sentence.id}`, formData)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }
  
  export async function deleteSentences(id: number) {
    try {
      const response = await axios.delete(`https://edutlasdeveloper.pythonanywhere.com/api/oraciones/${id}`)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }