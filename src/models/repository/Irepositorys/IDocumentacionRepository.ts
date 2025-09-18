export interface DocumentacionPayload {
  fotoFrontal: string;
  fotoTrasera: string;
  fotoLateral1: string;
  fotoLateral2: string;
  fotoTecho: string;
  cedulaVerde: string;
}

export default interface IDocumentacionRepository {
  createDocumentacion(data: DocumentacionPayload, authToken?: string): Promise<any>;
}