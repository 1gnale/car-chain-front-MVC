export default interface IBrandRepository {
  getBrands(): Promise<Marca[]>;
  getBrandById(id: number): Promise<Marca | null>;
}
