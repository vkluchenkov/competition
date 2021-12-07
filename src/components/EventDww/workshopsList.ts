import { basePrices } from "./prices";

interface Teacher {
  id: number;
  name: string;
  sortOrder: number;
}

export interface Workshop {
  teacher: Teacher;
  topic: string;
  start: string;
  end: string;
  price: number;
  id: number;
}

export const workshopsList: Workshop[] = [
  {
    teacher: {
      id: 1,
      name: "Marta Korzun",
      sortOrder: 2,
    },
    topic: "Tarab choreography",
    start: "2022-08-18T10:00",
    end: "2022-08-18T12:00",
    price: basePrices.wsStars,
    id: 1,
  },
  {
    teacher: {
      id: 1,
      name: "Marta Korzun",
      sortOrder: 2,
    },
    topic: "Mejance choreography",
    start: "2022-08-18T12:15",
    end: "2022-08-18T14:15",
    price: basePrices.wsStars,
    id: 2,
  },
  {
    teacher: {
      id: 2,
      name: "Alexey Ryaboshapka",
      sortOrder: 1,
    },
    topic: "TBA",
    start: "2022-08-18T14:30",
    end: "2022-08-18T16:30",
    price: basePrices.wsStars,
    id: 3,
  },
  {
    teacher: {
      id: 2,
      name: "Alexey Ryaboshapka",
      sortOrder: 1,
    },
    topic: "TBA",
    start: "2022-08-18T16:45",
    end: "2022-08-18T18:45",
    price: basePrices.wsStars,
    id: 4,
  },
  {
    teacher: {
      id: 3,
      name: "Daliya",
      sortOrder: 3,
    },
    topic: "Pop song choreography",
    start: "2022-08-19T10:00",
    end: "2022-08-19T12:00",
    price: basePrices.wsStars,
    id: 5,
  },
  {
    teacher: {
      id: 4,
      name: "Chronis Taxidis",
      sortOrder: 4,
    },
    topic: "Theory and practice of live drum solo improvisation",
    start: "2022-08-19T12:15",
    end: "2022-08-19T15:45",
    price: basePrices.wsStars,
    id: 6,
  },
  {
    teacher: {
      id: 5,
      name: "Leandro Ferreyra",
      sortOrder: 5,
    },
    topic: "Bollywood choreography",
    start: "2022-08-20T10:00",
    end: "2022-08-20T12:00",
    price: basePrices.wsStars,
    id: 7,
  },
  {
    teacher: {
      id: 5,
      name: "Leandro Ferreyra",
      sortOrder: 5,
    },
    topic: "Oriental tango choreography",
    start: "2022-08-20T12:15",
    end: "2022-08-20T14:15",
    price: basePrices.wsStars,
    id: 8,
  },
  {
    teacher: {
      id: 6,
      name: "Aliah",
      sortOrder: 6,
    },
    topic: "Drum solo fusion choreography",
    start: "2022-08-20T14:30",
    end: "2022-08-20T16:30",
    price: basePrices.wsOther,
    id: 9,
  },
  {
    teacher: {
      id: 7,
      name: "Nathalie",
      sortOrder: 7,
    },
    topic: "TBA",
    start: "2022-08-20T16:45",
    end: "2022-08-20T18:15",
    price: basePrices.wsOther,
    id: 10,
  },
  {
    teacher: {
      id: 8,
      name: "Darya",
      sortOrder: 8,
    },
    topic: "Baladi choreography",
    start: "2022-08-21T10:00",
    end: "2022-08-21T12:00",
    price: basePrices.wsOther,
    id: 11,
  },
  {
    teacher: {
      id: 9,
      name: "Polina Ostrovska",
      sortOrder: 9,
    },
    topic: "Mejance with veil choreography",
    start: "2022-08-21T12:15",
    end: "2022-08-21T14:15",
    price: basePrices.wsOther,
    id: 12,
  },
];
