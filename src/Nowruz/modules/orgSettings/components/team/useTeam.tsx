import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
    addOrganizationMember,
    CurrentIdentity,
    filterFollowings,
    getOrganizationMembers,
    MembersRes,
    removeOrganizationMember,
} from 'src/core/api';


export const useTeam = () => {
    

    const [memberList, setMemberList] = useState();

    getOrganizationMembers

   
    function onSearchMember(value: string) {
        getNewFollowings(value);
    }

    return{ memberList};

};