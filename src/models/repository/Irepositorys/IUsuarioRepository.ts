export default interface IUsuarioRepository {
  getUsuarios(): Promise<Usuario[]>;
}
