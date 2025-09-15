import type IMarcaRepository from "../Irepositorys/IMarcaRepository";

export class MarcaRepository implements IMarcaRepository {
  private apiUrl?: string;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl;
  }

  async getMarcas(): Promise<any> {
    if (this.apiUrl) {
      // Usar API real
      try {
        const response = await fetch(this.apiUrl);
        const apiData = await response.json();
        console.log("response MARCAS");
        console.log(apiData);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return apiData.data;
      } catch (error) {
        console.error("Error fetching from API:", error);
        // Fallback a datos mock si existen
        throw error;
      }
    }
  }
}
