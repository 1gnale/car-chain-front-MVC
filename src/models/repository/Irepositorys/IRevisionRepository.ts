export default interface IRevisionRepository {
  getRevisiones(): Promise<Revision[]>;
  getRevisionById(email: string): Promise<Revision>;
  createReview(RevisionData: Revision): Promise<Revision>;
}
