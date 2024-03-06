import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from 'react-redux';

import {
    addOrganizationMember,
    CurrentIdentity,
    filterFollowings,
    getOrganizationMembers,
    MembersRes,
    FollowingRes,
    getFollowings,
    removeOrganizationMember,
    organizations,
} from 'src/core/api';
import { convertFollowingsToContactList } from './memberList';
import { Resolver } from './team.type';
import { RootState } from 'src/store';

export const useTeam = () => {

    const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
        return state.identity.entities.find((identity) => identity.current);
    });
    const [members, setMembers] = useState<MembersRes>();
    const [followings, setFollowings] = useState<FollowingRes>();


    const orgId = currentIdentity?.id;

    const getMembers = async() => {
        console.log('orgId',orgId);
        const memberRes = await getOrganizationMembers( ''+orgId +'', { page: 1 });
        console.log(memberRes.items);
        setMembers(memberRes);
    };

    const getFollowing = async() => {
        const FollowingRes = await filterFollowings({ page: 1, name: '', type: 'users' });
        console.log('FollowingRes',FollowingRes);
        setFollowings(FollowingRes);
    };
    useEffect(()=>{
        getMembers();  
        getFollowing();      
    },[]);

    function onRemove(user_id: string) {
        removeOrganizationMember(''+orgId +'', user_id).then(() => {
            getMembers();
        });
    }
    
//     const initialMemberList = convertFollowingsToContactList(followings?.items);
// console.log('initialMemberList',initialMemberList);
    
    return{ orgId,members,followings,onRemove};

};