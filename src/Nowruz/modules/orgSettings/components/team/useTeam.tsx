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
    const [memberList, setMemberList] = useState();
    const [role, setRole] = useState([{value: 'Admin'}]);
    const [userId, setUserId] = useState('');

    const orgId = currentIdentity?.id;

    const getMembers = async() => {
        console.log('orgId',orgId);
        const memberRes = await getOrganizationMembers( ''+orgId +'', { page: 1 });
        console.log(memberRes);
        setMembers(memberRes);
    };
    

    const getFollowing = async(name:string) => {
        await filterFollowings({ page: 1, name: name , type: 'users' }).then((res)=>{
            setFollowings(res);
            console.log('followings',followings);
            const initialMemberList = convertFollowingsToContactList(res?.items);
            setMemberList(initialMemberList);
        });
        
    };

    
  function onSearchMember(value: string) {
    getFollowing(value);
    setUserId(value);
  }


    useEffect(()=>{
        getMembers();  
        getFollowing(''); 
    },[]);

    
    


    function onRemove(user_id: string) {
        removeOrganizationMember(''+orgId +'', user_id).then(() => {
            getMembers();
        });
        getFollowing('');
    }
    function onAddMember(user_id: string) {
        addOrganizationMember( ''+orgId +'', user_id).then(() => {
          getOrganizationMembers( ''+orgId +'', { page: members.page }).then(setMembers);
          getFollowing('');
        });
      }
    
    
    return{ members,followings,onRemove,memberList,onSearchMember,onAddMember,role,userId};

};