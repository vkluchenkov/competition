export interface LoginPayload {
  email: string;
  password: string;
}

export interface ValidateCodePayload {
  email: string;
  code: string;
}

export interface ValidateEmailPayload {
  email: string;
}

export interface SetUserPayload {
  email: string;
  code: string;
  password: string;
}

export interface SetOrderPayload {
  workshops: number[];
  isFullPass: boolean;
  festivalId: number;
}
