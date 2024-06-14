import { Advert } from "@prisma/client"

export const advertToReturnMapper = (advert: Advert) => {
    return {
        id: advert.id,
        name: advert.name,
        value: advert.value,
        shortDescription: advert.shortDescription,
        longDescription: advert.longDescription,
        specificPhone: advert.specificPhone,
        category: advert.category,
        createdAt: advert.createdAt,
        updatedAt: advert.updatedAt,
        ownerId: advert.ownerId,
    }
}