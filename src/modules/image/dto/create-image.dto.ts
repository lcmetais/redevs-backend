import { IsString } from "class-validator"

export class TCreateImage {
    @IsString({ message: 'Id do Anuncio - O id do anuncio deve ser informado para a criação da imagem' })
    advertId: string

    @IsString({ message: 'Nome - O Nome da imagem deve ser informado para que ela seja criada com sucesso' })
    originalName: string

    @IsString({ message: 'URL da Imagem - A url da imagem deve ser informada para que seja salvo a imagem.' })
    imageStorageUrl: string
}