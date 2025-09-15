import type ILineaCotizacionRepository from "../Irepositorys/ILineaCotizacionRepository";

export class LineaCotizacionRepository implements ILineaCotizacionRepository {
  private data: Linea_Cotizacion[] = [];

  constructor(data: Linea_Cotizacion[]) {
    this.data = data;
  }

  getLineaCotizacion(): Promise<Linea_Cotizacion[]> {
    return Promise.resolve(this.data);
  }

  getLineaCotizacionByCotizacionId(id: string): Promise<Linea_Cotizacion[]> {
    const lineas = this.data.filter(
      (line) => line.cotizacion?.id === Number(id)
    );
    return Promise.resolve(lineas);
  }
}
