export interface Video {
  id: Number;
  image: string;
  alt: string;
  time: String;
  avatar: String;
  title: String;
  channel: Channel;
  meta: Meta;
}

interface Channel {
  name: string;
}

interface Meta {
  views: Number;
  date: Date;
}