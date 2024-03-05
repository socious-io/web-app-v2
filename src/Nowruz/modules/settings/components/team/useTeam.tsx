import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { follow, FollowingRes, getFollowings, unfollow } from 'src/core/api';

export const useTeam = () => {
    const [followings, setFollowings] = useState();
    const [currentPage, setCurrectPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

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
        if(hasMore) {

            const Req = await getFollowings({ page: currentPage + 1 });
            if(Req.items.length) {
                setCurrectPage((prev) => prev + 1);
                setFollowings({
                    ...followings,
                    ...Req,
                    items: [...followings.items, ...Req.items],
                });

            } else {
                sethasMore(false)
            }
        }
    }
   

    useEffect(()=>{
        getFollowing();
    },[]);



    return {followings,remove,loadMore,hasMore};
};