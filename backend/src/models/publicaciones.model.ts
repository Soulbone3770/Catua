
export interface PublicacionType{
    id: number;
    titulo: string;
    userId: number;
    imgUrl: string;
    createdAt: string;
    imgPublicId: string;
}

export type PublicacionToInsertType = Omit<PublicacionType, "id" | "createdAt">

export type PublicPublicacionType = Omit<PublicacionType, "imgPublicId">