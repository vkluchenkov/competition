import { Channel } from "./channel";

export interface Video {
  id: string;
  image: string;
  duration: number;
  avatar: string;
  title: string;
  views: number;
  createdAt: string;
  channel: Channel;
}