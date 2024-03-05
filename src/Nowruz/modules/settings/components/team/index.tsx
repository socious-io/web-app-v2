import { Avatar } from "src/Nowruz/modules/general/components/avatar/avatar";

import css from "./team.module.scss";
import { useTeam } from "./useTeam";
import InfiniteScroll from "react-infinite-scroller";

const Team = () => {
    const {followings,remove,loadMore,hasMore} = useTeam();
    return(
        <>
            <div className={css.borderSection}>
                <div className="w-full py-8 items-center">
                    <h2 className="grow css.title text-lg font-semibold">Team management</h2>
                    <p className='text-sm font-normal text-Gray-light-mode-600 pt-1'> 
                        Manage your teams 
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className="py-5">
                    <h6 className="text-sm font-semibold text-Gray-light-mode-700 leading-5">On teams</h6>
                    <p className="text-sm font-normal text-Gray-light-mode-600"> You’re currently on these teams. </p>
                </div>
                <div className="col-span-3">
                    <InfiniteScroll
                        initialLoad={false}
                        threshold={150}
                        useWindow={false}
                        pageStart={1}
                        loadMore={loadMore}
                        hasMore={hasMore}
                        className="flex-1"
                    >
                    {
                        followings?.items.map((i)=>(
                            <div className={css.uList}>
                                <div className="flex justify-start items-center">
                                    <Avatar size="40px" type={i.identity_type} img={i.identity_meta.image} />
                                    <div className="flex flex-col ml-3">
                                        <span className="leading-7 text-Gray-light-mode-900">
                                        {i.identity_meta.name}
                                        </span>
                                        <span className="text-sm font-medium leading-5 text-Gray-light-mode-600">
                                        @{i.identity_meta.shortname}
                                        </span>
                                    </div>
                                </div>
                                <div onClick={()=> {remove(i.identity_meta.id)}} className="cursor-pointer text-Gray-light-mode-600 text-sm">
                                    Leave
                                </div>
                            </div>

                        ))
                    }
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
};

export default Team;