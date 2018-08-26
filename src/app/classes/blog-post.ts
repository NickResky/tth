import { ElementTypes } from '../shared/constants/element_types';

export class BlogPost {
    shortId: string;
    title: string;
    description: string;
    images: string[];
    embed: string;
    date: Date;
    routerLink: string;
}
