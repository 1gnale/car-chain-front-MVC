import type ILineaCotizacionRepository from "../Irepositorys/ILineaCotizacionRepository";
import { BaseRepository } from "./BaseRepository";

export class LineaCotizacionRepository extends BaseRepository<Linea_Cotizacion> implements ILineaCotizacionRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getLineaCotizacion(): Promise<Linea_Cotizacion[]> {
    return this.fetchData();
  }

  async getLineaCotizacionByCotizacionId(id: string): Promise<Linea_Cotizacion[]> {
    const data = await this.fetchData();
    const lineas = data.filter(
      (line) => line.cotizacion?.id === Number(id)
    );
    return lineas;
  }
}
