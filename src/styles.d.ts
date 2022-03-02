import { Interpolation } from "@emotion/react";

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme {}
}

declare module "react" {
  interface DOMAttributes {
    css?: Interpolation<any>;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: Interpolation<any>;
    }
  }
}
