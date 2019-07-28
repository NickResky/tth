import { RequiredElements } from './required-elements';
import { ZenkitCollectionsConfig } from 'webapps-reschke-common';

export const ZenkitCollections: ZenkitCollectionsConfig  = {
    apiUrl : 'https://zenkit.com/api/v1/',
    workspaceName: 'Tanztheater Hanke',
    home: {
        shortId: 'S1k_AYFu-',
        requiredElements: RequiredElements.home
    },
    current: {
        shortId: 'SyNHkctub',
        requiredElements: RequiredElements.current
    },
    performances: {
        shortId: 'HyltubcKub',
        requiredElements: RequiredElements.performances
    },
    courses: {
        shortId: 'rkmtZcFu-',
        requiredElements: RequiredElements.courses
    },
    schedule: {
        shortId: 'Bkgc6Bs3r7',
        requiredElements: RequiredElements.schedule
    },
    team: {
        shortId: 'BJ6t-cFub',
        requiredElements: RequiredElements.team
    },
    locations: {
        shortId: 'Syd9b9F_W',
        requiredElements: RequiredElements.locations
    },
    contact: {
        shortId: 'B1xo-5tub',
        requiredElements: RequiredElements.contact
    },
    imprint: {
        shortId: 'HkLziF2WUm',
        requiredElements: RequiredElements.imprint
    }
};
