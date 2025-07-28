export default function getFromLocalStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  if (!item) return null;
  try {
    return JSON.parse(item) as T;
  } catch (error) {
    console.error("Error al parsear JSON del localStorage:", error);
    return null;
  }
}
