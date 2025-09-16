export abstract class BaseRepository<T> {
  protected apiUrl?: string;
  protected data: T[] = [];

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl;
  }
 
  protected async fetchData(): Promise<T[]> {
    if (!this.apiUrl) {
      return Promise.reject(new Error("API URL is not defined"));
    }

    return fetch(this.apiUrl)
      .then(async (response) => {
        if (!response.ok) {
          // Intentar obtener el error detallado del backend
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
            console.error("Backend Error Details:", errorData);
          } catch (parseError) {
            console.error("Could not parse error response:", parseError);
          }
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .then((data) => {
        this.data = data.data;
        return this.data;
      });
  }

  // Método genérico para POST
  protected async postData(endpoint: string, body: Partial<T>): Promise<T> {
    if (!this.apiUrl) {
      return Promise.reject(new Error("API URL is not defined"));
    }

    const url = `${this.apiUrl}${endpoint}`;
    
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (!response.ok) {
          // Intentar obtener el error detallado del backend
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
            console.error("Backend Error Details:", errorData);
          } catch (parseError) {
            console.error("Could not parse error response:", parseError);
          }
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .then((data) => data.data);
  }

  // Método genérico para PUT
  protected async putData(endpoint: string, body: Partial<T>): Promise<T> {
    if (!this.apiUrl) {
      return Promise.reject(new Error("API URL is not defined"));
    }

    const url = `${this.apiUrl}${endpoint}`;
    
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (!response.ok) {
          // Intentar obtener el error detallado del backend
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
            console.error("Backend Error Details:", errorData);
          } catch (parseError) {
            console.error("Could not parse error response:", parseError);
          }
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .then((data) => data.data);
  }

  // Método genérico para DELETE
  protected async logicalDeleteData(endpoint: string): Promise<void> {
    if (!this.apiUrl) {
      return Promise.reject(new Error("API URL is not defined"));
    }

    const url = `${this.apiUrl}${endpoint}`;
    
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          // Intentar obtener el error detallado del backend
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
            console.error("Backend Error Details:", errorData);
          } catch (parseError) {
            console.error("Could not parse error response:", parseError);
          }
          throw new Error(errorMessage);
        }
      });
  }

  // Método para obtener datos cacheados
  getCachedData(): T[] {
    return this.data;
  }

  // Método para limpiar caché
  clearCache(): void {
    this.data = [];
  }
}