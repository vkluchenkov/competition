import { DateTime } from "luxon";
import { Workshop } from "../../components/EventDww/types";
import { Festival } from "../../models/festival";

export interface OrderFestival {
  festival: Festival;
  is_fullPass: boolean;
  workshops: Array<Workshop>;
  contest: Array<number>;
  is_soloPass?: boolean;
}

export interface OrderProps {
  id: string;
  status: string;
  updated_at: DateTime | null;
  paid_at: DateTime | null;
  refunded_amount: number | null;
  refunded_at: DateTime | null;
  created_at: DateTime | null;
  festivals: OrderFestival[];
}
