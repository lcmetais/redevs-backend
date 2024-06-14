import { Image } from "@prisma/client";
import { Advert } from "src/modules/advert/entities/advert.entity";

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    advert?: Advert[]
    image?: Image
}
