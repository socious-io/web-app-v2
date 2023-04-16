export interface Payload {
  [x: string]: {
    in_app: boolean;
    email: boolean;
    push: boolean;
  };
}
