import { Channel } from "./channel";

export interface Video {
  id: number;
  image: string;
  duration: number;
  avatar: string;
  title: string;
  views: number;
  createdOn: string;
  channel: Channel;
}