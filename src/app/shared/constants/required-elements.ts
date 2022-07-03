import { ElementTypes } from "./element_types";

export const RequiredElements = {
  home: [
    {
      name: "Titel",
      type: ElementTypes.text,
      mappedClassPropertyName: "title",
    },
    {
      name: "Beschreibung",
      type: ElementTypes.text,
      mappedClassPropertyName: "description",
    },
    {
      name: "Bild",
      type: ElementTypes.files,
      mappedClassPropertyName: "image",
    },
    {
      name: "YouTube Video ID",
      type: ElementTypes.text,
      mappedClassPropertyName: "youtubeVideoId",
    },
    {
      name: "Kosten",
      type: ElementTypes.text,
      mappedClassPropertyName: "prices",
    },
    {
      name: "Sprechblase",
      type: ElementTypes.text,
      mappedClassPropertyName: "speechBubble",
    },
    {
      name: "Sprechblase Bild",
      type: ElementTypes.files,
      mappedClassPropertyName: "speechBubbleImage",
    },
  ],
  current: [
    {
      name: "Titel",
      type: ElementTypes.text,
      mappedClassPropertyName: "title",
    },
    {
      name: "Beschreibung",
      type: ElementTypes.text,
      mappedClassPropertyName: "description",
    },
    {
      name: "Bilder",
      type: ElementTypes.files,
      mappedClassPropertyName: "images",
    },
    {
      name: "YouTube Video ID",
      type: ElementTypes.text,
      mappedClassPropertyName: "youtubeVideoId",
    },
    {
      name: "Datum",
      type: ElementTypes.date,
      mappedClassPropertyName: "date",
    },
  ],
  performances: [
    {
      name: "Titel",
      type: ElementTypes.text,
      mappedClassPropertyName: "title",
    },
    {
      name: "Beschreibung",
      type: ElementTypes.text,
      mappedClassPropertyName: "description",
    },
    {
      name: "Bild des Posters",
      type: ElementTypes.files,
      mappedClassPropertyName: "poster",
    },
    {
      name: "Bildergallerie",
      type: ElementTypes.files,
      mappedClassPropertyName: "gallery",
    },
    {
      name: "Datum",
      type: ElementTypes.date,
      mappedClassPropertyName: "date",
    },
  ],
  courses: [
    {
      name: "Titel",
      type: ElementTypes.text,
      mappedClassPropertyName: "title",
    },
    {
      name: "Beschreibung",
      type: ElementTypes.text,
      mappedClassPropertyName: "description",
    },
    {
      name: "Datei",
      type: ElementTypes.files,
      mappedClassPropertyName: "file",
    },
    {
      name: "Bild",
      type: ElementTypes.files,
      mappedClassPropertyName: "image",
    },
    {
      name: "YouTube Video ID",
      type: ElementTypes.text,
      mappedClassPropertyName: "youtubeId",
    },
  ],
  schedule: [
    {
      name: "Titel",
      type: ElementTypes.text,
      mappedClassPropertyName: "title",
    },
    {
      name: "Labels",
      type: ElementTypes.labels,
      mappedClassPropertyName: "days",
    },
    {
      name: "Standort",
      type: ElementTypes.reference,
      mappedClassPropertyName: "location",
    },
    {
      name: "Altersgruppen",
      type: ElementTypes.labels,
      mappedClassPropertyName: "ageGroups",
    },
    {
      name: "Startzeit Stunden",
      type: ElementTypes.number,
      mappedClassPropertyName: "timeStartHours",
    },
    {
      name: "Startzeit Minuten",
      type: ElementTypes.number,
      mappedClassPropertyName: "timeStartMinutes",
    },
    {
      name: "Endzeit Stunden",
      type: ElementTypes.number,
      mappedClassPropertyName: "timeEndHours",
    },
    {
      name: "Endzeit Minuten",
      type: ElementTypes.number,
      mappedClassPropertyName: "timeEndMinutes",
    },
    {
      name: "Ferienzeit",
      type: ElementTypes.text,
      mappedClassPropertyName: "holidays",
    },
  ],
  team: [
    {
      name: "Name",
      type: ElementTypes.text,
      mappedClassPropertyName: "name",
    },
    {
      name: "Vorname",
      type: ElementTypes.text,
      mappedClassPropertyName: "firstName",
    },
    {
      name: "Nachname",
      type: ElementTypes.text,
      mappedClassPropertyName: "lastName",
    },
    {
      name: "Beschreibung",
      type: ElementTypes.text,
      mappedClassPropertyName: "description",
    },
    {
      name: "Aufgabe",
      type: ElementTypes.text,
      mappedClassPropertyName: "task",
    },
    {
      name: "Bild",
      type: ElementTypes.files,
      mappedClassPropertyName: "image",
    },
  ],
  locations: [
    {
      name: "Name",
      type: ElementTypes.text,
      mappedClassPropertyName: "name",
    },
    {
      name: "Beschreibung",
      type: ElementTypes.text,
      mappedClassPropertyName: "description",
    },
    {
      name: "Adresse-Name",
      type: ElementTypes.text,
      mappedClassPropertyName: "addressName",
    },
    {
      name: "Adresse-Strasse",
      type: ElementTypes.text,
      mappedClassPropertyName: "addressStreet",
    },
    {
      name: "Adresse-PLZ",
      type: ElementTypes.text,
      mappedClassPropertyName: "addressZIP",
    },
    {
      name: "Adresse-Stadt",
      type: ElementTypes.text,
      mappedClassPropertyName: "addressCity",
    },
    {
      name: "Google Maps",
      type: ElementTypes.text,
      mappedClassPropertyName: "embed",
    },
    {
      name: "Bild",
      type: ElementTypes.files,
      mappedClassPropertyName: "image",
    },
    {
      name: "Bildergalerie",
      type: ElementTypes.files,
      mappedClassPropertyName: "gallery",
    },
    {
      name: "Initialien",
      type: ElementTypes.text,
      mappedClassPropertyName: "initials",
    },
  ],
  contact: [
    {
      name: "Name",
      type: ElementTypes.text,
      mappedClassPropertyName: "name",
    },
    {
      name: "E-Mail",
      type: ElementTypes.text,
      mappedClassPropertyName: "email",
    },
    {
      name: "Telefon",
      type: ElementTypes.text,
      mappedClassPropertyName: "phone",
    },
    {
      name: "Beschreibung",
      type: ElementTypes.text,
      mappedClassPropertyName: "description",
    },
    {
      name: "Bild",
      type: ElementTypes.files,
      mappedClassPropertyName: "image",
    },
    {
      name: "Straße",
      type: ElementTypes.text,
      mappedClassPropertyName: "street",
    },
    {
      name: "ZIP & Stadt",
      type: ElementTypes.text,
      mappedClassPropertyName: "zipAndCity",
    },
    {
      name: "Impressum",
      type: ElementTypes.text,
      mappedClassPropertyName: "imprint",
    },
    {
      name: "Datenschutz",
      type: ElementTypes.text,
      mappedClassPropertyName: "privacy",
    },
  ],
  imprint: [
    {
      name: "Titel",
      type: ElementTypes.text,
      mappedClassPropertyName: "title",
    },
    {
      name: "Beschreibung",
      type: ElementTypes.text,
      mappedClassPropertyName: "description",
    },
  ],
};
