export default interface IProvinciaRepository {
  getProvincias(): Promise<Provincia[]>;
}
