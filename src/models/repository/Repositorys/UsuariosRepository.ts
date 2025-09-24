import type IUsuarioRepository from "../Irepositorys/IUsuarioRepository";
import { BaseRepository } from "./BaseRepository";

export class UsuarioRepository
  extends BaseRepository<Usuario>
  implements IUsuarioRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getUsuarios(): Promise<Usuario[]> {
    return this.fetchData();
  }
}
