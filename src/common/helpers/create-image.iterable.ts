import { TCreateImage } from "src/modules/image/dto/create-image.dto";

export class IterableTCreateImage implements Iterable<TCreateImage> {
    private images: TCreateImage[];

    constructor(images: TCreateImage[]) {
        this.images = images;
    }

    // Implementa o método Symbol.iterator
    [Symbol.iterator](): Iterator<TCreateImage> {
        let index = 0;

        return {
            next: (): IteratorResult<TCreateImage> => {
                if (index < this.images.length) {
                    return {
                        value: this.images[index++],
                        done: false
                    };
                } else {
                    return {
                        value: null!,
                        done: true
                    };
                }
            }
        };
    }
}