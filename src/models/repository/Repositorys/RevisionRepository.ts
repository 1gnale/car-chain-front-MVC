import type IRevisionsRepository from "../Irepositorys/IRevisionRepository";
import { BaseRepository } from "./BaseRepository";

export class RevisionRepository
  extends BaseRepository<Revision>
  implements IRevisionsRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getRevisiones(): Promise<Revision[]> {
    return this.fetchData();
  }

  async getRevisionById(id: string): Promise<Revision> {
    return this.fetchDataById("/", id);
  }

  async createReview(RevisionData: Revision): Promise<Revision> {
    const body = {
      poliza: RevisionData.poliza,
    };
    const newCreateReview = await this.postData("/createRevision", body);
    this.data.push(newCreateReview);
    return newCreateReview;
  }

  async updateStateRevision(id: number): Promise<Revision> {
    const updatedRecreateReview = await this.logicalDeleteData(`/delete/${id}`);
    this.data = this.data.map((RecreateReview) =>
      RecreateReview.id === updatedRecreateReview.id
        ? updatedRecreateReview
        : RecreateReview
    );
    return updatedRecreateReview;
  }
}
