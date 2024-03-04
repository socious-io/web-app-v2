import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export const useTeam = () => {
    
    const { members, followings } = (useLoaderData() as Resolver) || {};
    const initialMemberList = convertFollowingsToContactList(followings?.items);
    const [memberList, setMemberList] = useState(initialMemberList);

}