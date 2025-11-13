import type ISiniestroRepository from "../Irepositorys/ISiniestroRepository,";
import { BaseRepository } from "./BaseRepository";

export class SiniestroRepository
  extends BaseRepository<Siniestro>
  implements ISiniestroRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getSiniestros(): Promise<Siniestro[]> {
    return this.fetchData();
  }

  async getSiniestroById(idPoliza: string): Promise<Siniestro> {
    const siniestro = await this.fetchDataById("getSiniestroById", idPoliza);
    console.log("fetch");
    console.log(siniestro);
    return siniestro;
  }

  async createSiniestro(
    SiniestroData: any,
    idPoliza: number
  ): Promise<Siniestro> {
    const body = {
      poliza_numero: idPoliza,
      horaSiniestro: SiniestroData.horaSiniestro,
      fechaSiniestro: SiniestroData.fechaSiniestro,
      fotoDenuncia: SiniestroData.fotoDenuncia,
      fotoVehiculo: SiniestroData.fotoVehiculo,
    };
    console.log(body);
    const newSiniestro = await this.postData("/createSiniestro", body);
    this.data.push(newSiniestro);
    return newSiniestro;
  }

  async updateStateSiniestro(
    idSiniestro: Number,
    estado: string
  ): Promise<Siniestro> {
    const body = {
      estado: estado,
    };

    const updatedRecreateReview = await this.putData(
      `/updateStateSiniestro/${idSiniestro}`,
      body
    );

    return updatedRecreateReview;
  }
}
