export class Advert {
    id: string;
    name: string;
    value: string;
    shortDescription?: string;
    longDescription?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deleteAt?: Date;
    specificPhone: string;

    ownerId: string;
}
