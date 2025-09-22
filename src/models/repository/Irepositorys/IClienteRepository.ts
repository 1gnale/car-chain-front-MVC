export default interface IClienteRepository {
  getClientByMail(email: string): Promise<Cliente | null>;
}
