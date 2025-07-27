export default interface IConfigLocalidadRepository {
  getConfigLocalidades(): Promise<ConfigLocalidad[]>;
}
