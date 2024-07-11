import { IsString, IsUrl } from "class-validator";

export class UpdateBannerDTO {
    @IsString()
    newBannerName: string;

    @IsUrl()
    newBannerUrl: string;
}