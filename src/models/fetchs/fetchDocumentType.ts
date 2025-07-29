import type IDocumentTypeRepository from "../repositories/IDocumentTypeRepository";

const fetchDocumentTypes = async (
  brandRepo: IDocumentTypeRepository
): Promise<string[]> => {
  try {
    return await brandRepo.getDocumentTypes();
  } catch (error) {
    console.error("Error fetching Documents Types:", error);
    return [];
  }
};

export default fetchDocumentTypes;
