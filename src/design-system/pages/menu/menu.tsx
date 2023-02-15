import { isTouchDevice } from "../../../core/device-type-detector"
import { Mobile } from "./mobile/mobile"

export const Menu = () => {

    return isTouchDevice() ? <Mobile /> : false

}