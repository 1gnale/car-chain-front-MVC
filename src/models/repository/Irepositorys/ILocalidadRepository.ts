export default interface ILocalidadRepository {
  getLocalidades(): Promise<Localidad[]>;
}
