import { ICategory } from '../interfaces/category.interface';
import { IUser } from '../interfaces/user.interface';
import { IArticle } from '../interfaces/article.interface';

export class Article implements IArticle{
    id: number;
    title: string;
    content: string;
    created: Date;
    user: IUser;
    category: ICategory;
    constructor(id, title, content, created, user, category)
     {
            this.id = id;
            this.title = title;
            this.content = content;
            this.created = created;
            this.user = user;
            this.category = category
    }
    
    getDateFormated(): string {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('es-AR', options).format(this.created);
    }

}
