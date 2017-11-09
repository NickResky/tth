import { ElementTypes } from './element_types';

export const RequiredElements  = {
    home: [
        {
            name: 'Titel',
            type: ElementTypes.text,
            mappedClassPropertyName: 'title'
        },
        {
            name: 'Beschreibung',
            type: ElementTypes.text,
            mappedClassPropertyName: 'description'
        },
        {
            name: 'Bild',
            type: ElementTypes.files,
            mappedClassPropertyName: 'image'
        },
        {
            name: 'Youtube',
            type: ElementTypes.text,
            mappedClassPropertyName: 'videoEmbed'
        }
    ],
    current: [
        {
            name: 'Titel',
            type: ElementTypes.text,
            mappedClassPropertyName: 'title'
        },
        {
            name: 'Beschreibung',
            type: ElementTypes.text,
            mappedClassPropertyName: 'description'
        },
        {
            name: 'Bilder',
            type: ElementTypes.files,
            mappedClassPropertyName: 'images'
        },
        {
            name: 'YouTube Link',
            type: ElementTypes.text,
            mappedClassPropertyName: 'embed'
        }
    ],
    performances: [
        {
            name: 'Titel',
            type: ElementTypes.text,
            mappedClassPropertyName: 'title'
        },
        {
            name: 'Beschreibung',
            type: ElementTypes.text,
            mappedClassPropertyName: 'description'
        },
        {
            name: 'Bild des Posters',
            type: ElementTypes.files,
            mappedClassPropertyName: 'poster'
        },
        {
            name: 'Bildergallerie',
            type: ElementTypes.files,
            mappedClassPropertyName: 'gallery'
        }
    ],
    courses: [
        {
            name: 'Titel',
            type: ElementTypes.text,
            mappedClassPropertyName: 'title'
        },
        {
            name: 'Beschreibung',
            type: ElementTypes.text,
            mappedClassPropertyName: 'description'
        },
        {
            name: 'Stundenplan',
            type: ElementTypes.files,
            mappedClassPropertyName: 'schedule'
        }
    ],
    team: [
        {
            name: 'Name',
            type: ElementTypes.text,
            mappedClassPropertyName: 'name'
        },
        {
            name: 'Beschreibung',
            type: ElementTypes.text,
            mappedClassPropertyName: 'description'
        },
        {
            name: 'Aufgabe',
            type: ElementTypes.text,
            mappedClassPropertyName: 'task'
        },
        {
            name: 'Bild',
            type: ElementTypes.files,
            mappedClassPropertyName: 'image'
        }
    ],
    ]
};
