import type IUsuarioRepository from "../Irepositorys/IUsuarioRepository";
import { BaseRepository } from "./BaseRepository";

export class UsuarioRepository
  extends BaseRepository<Usuario>
  implements IUsuarioRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async getUsuarios(): Promise<Usuario[]> {
    return this.fetchData();
  }

  async getPersonByEmail(email: string): Promise<Usuario> {
    return this.fetchDataById("get-person-by-email", email);
  }

  async createUser(
    personaData: Persona,
    tipoUsuario: string
  ): Promise<Usuario> {
    const body = { personaData: personaData, tipoUsuario: tipoUsuario };
    const newUser = await this.postData("/create-user", body);
    this.data.push(newUser);
    return newUser;
  }

  async updateUser(
    legajo: number,
    personaData: Persona,
    tipoUsuario: string,
    activo: boolean
  ): Promise<Usuario> {
    const body = {
      personaData: personaData,
      tipoUsuario: tipoUsuario,
      activo: activo,
    };
    const updatedUser = await this.putData(`/update-user/${legajo}`, body);
    this.data = this.data.map((user) =>
      user.legajo === updatedUser.legajo ? updatedUser : user
    );
    return updatedUser;
  }

  async updateStateUser(legajo: number): Promise<Usuario> {
    const updatedUser = await this.putData(`/update-user-state/${legajo}`, {
      activo: false,
    });
    this.data = this.data.map((user) =>
      user.legajo === updatedUser.legajo ? updatedUser : user
    );
    return updatedUser;
  }
}
