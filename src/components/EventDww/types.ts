import { Workshop } from "./workshopsList";

export interface FormFields {
    workshops: (Workshop & { selected: boolean })[];
}