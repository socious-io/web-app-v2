import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { follow, FollowingRes, getFollowings, unfollow } from 'src/core/api';

export const useTeam = () => {
    const [followings, setFollowings] = useState();
    const [currentPage, setCurrectPage] = useState(1);
    let result:FollowingRes;
    const getFollowing = async () => {
        result = await getFollowings({page:1});
        console.log('result',result.items);
        setFollowings(result)
    };
    
    function remove(id: string) {
        unfollow(id);
    }
    
    async function loadMore() {
        const Req = await getFollowings({ page: currentPage + 1 });
        setCurrectPage((prev) => prev + 1);
        setFollowings({
            ...followings,
            ...Req,
            items: [...followings.items, ...Req.items],
        });
    }
    
    useEffect(()=>{
        getFollowing();
    },[]);

    console.log('followings',followings);


    return {followings,remove,loadMore};
};