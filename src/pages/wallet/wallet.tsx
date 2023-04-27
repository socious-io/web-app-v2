import { isTouchDevice } from "src/core/device-type-detector";
import { Mobile } from "./mobile/mobile";

export const Wallet = () => {
  return isTouchDevice() ? <Mobile /> : <></>;
};