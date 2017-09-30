import { ElementTypes } from './element_types';

export const RequiredElements  = {
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
    ]
};
