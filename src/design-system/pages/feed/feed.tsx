import { useMatch } from "@tanstack/react-location";
import { isTouchDevice } from "../../../core/device-type-detector";
import { Desktop } from "./desktop/desktop";
import { Mobile } from "./mobile/mobile";

export const Feed = () => {
    const data = useMatch().ownData;
    console.log('dd: ', data);
    //@ts-ignore
    return isTouchDevice() ? <Mobile list={data} /> : <Desktop />;
}