import { el } from "date-fns/locale";

export default async function saveDocumentacionToLocalStorage(
  doc: Documentacion
) {
  const serializableDoc: any = {};

  for (const key in doc) {
    const file = doc[key as keyof Documentacion];
    if (file instanceof File) {
      serializableDoc[key] = await fileToBase64(file);
      console.log(JSON.stringify(serializableDoc));
    }
  }
  return JSON.stringify(serializableDoc);
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
