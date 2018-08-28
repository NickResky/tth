import { ElementTypes } from '../shared/constants/element_types';

export class BlogPost {
    shortId: string;
    title: string;
    description: string;
    images: string[];
    youtubeVideoId: string;
    date: Date;
    routerLink: string;
}
