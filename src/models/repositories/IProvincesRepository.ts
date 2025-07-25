export default interface IProvincesRepository {
  getProvinces(): Promise<Provincias[]>;
}
