import type ILineaCotizacionRepository from "../Irepositorys/ILineaCotizacionRepository";

export class LineaCotizacionRepository implements ILineaCotizacionRepository {
  private data: Linea_Cotizacion[] = [];

  constructor(data: Linea_Cotizacion[]) {
    this.data = data;
  }

  getLineaCotizacion(): Promise<Linea_Cotizacion[]> {
    return Promise.resolve(this.data);
  }

  getLineaCotizacionById(id: string): Promise<Linea_Cotizacion | null> {
    const linea = this.data.find((line) => line.id === Number(id));
    return Promise.resolve(linea || null);
  }
}
