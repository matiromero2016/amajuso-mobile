import { IUser } from './user.interface';
import { ICategory } from './category.interface';

export interface IArticle {
    id? : number;
    title?: string;
    content?: string;
    created?: Date;
    user?: IUser;
    category?: ICategory;
    getDateFormated(): string;
}
