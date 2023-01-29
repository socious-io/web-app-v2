import { useMatch } from "@tanstack/react-location";
import { isTouchDevice } from "../../../../core/device-type-detector";
import { Feed } from "../../../organisms/feed-list/feed-list.types";
import { Desktop } from "./desktop/desktop";
import { Mobile } from "./mobile/mobile";


export const PostDetail = () => {
    const { data } = useMatch();

    return isTouchDevice() ? <Mobile data={data as Feed} /> : <Desktop />;

}