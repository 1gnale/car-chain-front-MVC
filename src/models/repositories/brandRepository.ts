import type IBrandRepository from "./IBrandRepository.ts";

export class BrandRepository implements IBrandRepository {
  private data: Brand[] = [];

  constructor(data: Brand[]) {
    this.data = data;
  }

  getBrands(): Promise<Brand[]> {
    return Promise.resolve(this.data);
  }
}
