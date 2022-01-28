interface Teacher {
  id: number;
  name: string;
  sort_order: number;
}

export interface Workshop {
  teacher: Teacher;
  topic: string;
  start: string;
  end: string;
  price: number;
  id: number;
  limit: number;
  counter: number;
}

export interface ContestCategory {
  id: number;
  title: string;
  priceFullPass: number;
  price: number;
}

export interface FormFields {
  workshops: (Workshop & { selected: boolean })[];
  contest: (ContestCategory & { selected: boolean })[];
}
