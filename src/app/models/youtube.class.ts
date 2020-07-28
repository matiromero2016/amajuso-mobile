export class Youtube {
    id?: number;
    youtubeId?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    publishedAt?: Date;

    constructor(id, youtubeId, title, description, imageUrl, publishedAt) {
        this.id = id;
        this.youtubeId = youtubeId;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.publishedAt = publishedAt;
    }
    
    getDateFormated(): string {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('es-AR', options).format(this.publishedAt);
    }
}