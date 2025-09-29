export default interface IUsuarioRepository {
  getUsuarios(): Promise<Usuario[]>;
  getPersonByEmail(email: string): Promise<Usuario>;
  createUser(personaData: Persona, tipoUsuario: string): Promise<Usuario>;
  updateUser(
    legajo: number,
    personaData: Persona,
    tipoUsuario: string,
    activo: boolean
  ): Promise<Usuario>;
}
