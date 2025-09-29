export default interface ISiniestroRepository {
  getSiniestros(): Promise<Siniestro[]>;
  getSiniestroById(id: string): Promise<Usuario>;
}
