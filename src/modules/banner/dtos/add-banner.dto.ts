import { IsString, IsUrl, isURL } from "class-validator";

export class AddBannerDTO {
    @IsString()
    bannerName: string;

    @IsUrl({}, { message: 'O dado informado não é uma URL!' })
    bannerUrl: string;
}