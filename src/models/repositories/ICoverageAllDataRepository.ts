export default interface ICoverageAllDataRepository {
  getAllCoveragesData(): Promise<Cobertura_AllData[]>;
}
