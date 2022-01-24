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

export interface FormFields {
  workshops: (Workshop & { selected: boolean })[];
}
