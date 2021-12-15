import cardCover from "../../images/DW21_group_cover_FB.jpg";

interface Festival {
  id: number;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  img: string;
}

export const festivals: Festival[] = [
  {
    id: 1,
    title: "Dance Weekend in Warsaw 2021",
    type: "Virtual / Real",
    startDate: "2021-08-18",
    endDate: "2021-08-18",
    location: "Warsaw, Poland",
    description:
      "Here's some description about the festival. And some more. Way more. Here's some description about the festival. And some more. Way more. Here's some description about the festival. And some more. Way more.",
    img: cardCover,
  },
  {
    id: 2,
    title: "Some other festival 2021",
    type: "Virtual",
    startDate: "2020-08-18",
    endDate: "2020-08-18",
    location: "Hamburg, Germany",
    description:
      "Here's some description about the festival. And some more. Way more. Here's some description about the festival. And some more. Way more. Here's some description about the festival. And some more. Way more.",
    img: cardCover,
  },
  {
    id: 3,
    title: "Dance Weekend in Warsaw 2022",
    type: "Virtual / Real",
    startDate: "2022-08-18",
    endDate: "2022-08-18",
    location: "Warsaw, Poland",
    description:
      "Here's some description about the festival. And some more. Way more. Here's some description about the festival.",
    img: cardCover,
  },
  {
    id: 4,
    title: "Some future festival 2022",
    type: "Real",
    startDate: "2022-09-21",
    endDate: "2022-09-22",
    location: "Tokyo, Japan",
    description:
      "Here's some description about the festival. And some more. Way more. Here's some description about the festival.",
    img: cardCover,
  },
];
