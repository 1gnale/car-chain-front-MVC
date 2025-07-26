import type { Brand } from "../types";

export default interface IBrandRepository {
  getBrands(): Promise<Brand[]>;
}
