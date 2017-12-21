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
        },
        {
            name: 'Datum',
            type: ElementTypes.date,
            mappedClassPropertyName: 'date'
        },
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
        },
        {
            name: 'Bild',
            type: ElementTypes.files,
            mappedClassPropertyName: 'image'
        }
    ],
    team: [
        {
            name: 'Name',
            type: ElementTypes.text,
            mappedClassPropertyName: 'name'
        },
        {
            name: 'Vorname',
            type: ElementTypes.text,
            mappedClassPropertyName: 'firstName'
        },
        {
            name: 'Nachname',
            type: ElementTypes.text,
            mappedClassPropertyName: 'lastName'
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
    locations: [
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
            name: 'Adresse-Name',
            type: ElementTypes.text,
            mappedClassPropertyName: 'addressName'
        },
        {
            name: 'Adresse-Strasse',
            type: ElementTypes.text,
            mappedClassPropertyName: 'addressStreet'
        },
        {
            name: 'Adresse-PLZ',
            type: ElementTypes.text,
            mappedClassPropertyName: 'addressZIP'
        },
        {
            name: 'Adresse-Stadt',
            type: ElementTypes.text,
            mappedClassPropertyName: 'addressCity'
        },
        {
            name: 'Google Maps',
            type: ElementTypes.text,
            mappedClassPropertyName: 'embed'
        },
        {
            name: 'Bildergalerie',
            type: ElementTypes.files,
            mappedClassPropertyName: 'gallery'
        },
        {
            name: 'Initialien',
            type: ElementTypes.text,
            mappedClassPropertyName: 'initials'
        }
    ],
    contact: [
        {
            name: 'Name',
            type: ElementTypes.text,
            mappedClassPropertyName: 'name'
        },
        {
            name: 'E-Mail',
            type: ElementTypes.text,
            mappedClassPropertyName: 'email'
        },
        {
            name: 'Telefon',
            type: ElementTypes.text,
            mappedClassPropertyName: 'phone'
        }
    ]
};
