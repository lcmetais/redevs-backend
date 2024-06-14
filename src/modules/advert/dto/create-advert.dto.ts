import { IsInt, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAdvertDto {
    @IsString({ message: "Name - Must be a string" })
    @MinLength(3, { message: "Name - Cannot be have less than 3 characters long" })
    name: string;

    @IsInt({ message: "Value - Must be a integer number" })
    value: number;

    @MaxLength(150, { message: "Short Description - The number of characters cannot exceed 150" })
    shortDescription?: string;

    @IsString({ message: "Long Description - Must be a string" })
    longDescription?: string;

    @IsString({ message: "Specific Phone - Must be a string" })
    specificPhone: string;

    @IsString({message: "Category - Must be a string"})
    category: string;
}
