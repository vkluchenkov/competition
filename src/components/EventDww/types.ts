interface Teacher {
  id: number;
  name: string;
  sortOrder: number;
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
  festivalId?: number;
}

export interface FormFields {
  workshops: (Workshop & { selected: boolean; disabled: boolean })[];
  contest: (ContestCategory & { selected: boolean; disabled: boolean })[];
}

export interface Registration {
  festivalId: number;
  isFullPass: boolean;
  isSoloPass: boolean;
  workshops: Workshop[];
  contest: ContestCategory[];
}
