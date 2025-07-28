import type { allConfigs } from "../types";

export default interface IAllConfigsRepository {
  getAllConfigs(): Promise<allConfigs>;
}
