import { Video } from "../../models/video";

export interface GridVideoProps {
video: Video;
onClick: () => void;
inQueue: boolean;
}