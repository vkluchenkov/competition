import { DateTime } from "luxon";
import { ContestCategory, Workshop } from "../../components/EventDww/types";
import { Festival } from "../../models/festival";

export interface OrderFestival {
  festival: Festival;
  isFullPass: boolean;
  workshops: Workshop[];
  contest: ContestCategory[];
  isSoloPass?: boolean;
}

export interface Order {
  id: string;
  status: string;
  updatedAt: DateTime | null;
  paidAt: DateTime | null;
  refundedAmount: number | null;
  refundedAt: DateTime | null;
  createdAt: DateTime | null;
  festivals: OrderFestival[];
}
