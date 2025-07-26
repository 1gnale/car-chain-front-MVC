import type { allConfigs } from "../types";
import type IAllConfigsRepository from "./IAllConfigsRepository.ts";

export class allConfigsRepository implements IAllConfigsRepository {
  private data: allConfigs;

  constructor(data: allConfigs) {
    this.data = data;
  }

  getAllConfigs(): Promise<allConfigs> {
    return Promise.resolve(this.data);
  }
}
