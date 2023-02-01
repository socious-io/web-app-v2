import css from './search.module.scss';
import { Search as SearchAtom } from '../../atoms/search/search'
import { search } from './search.services';
import { useState } from 'react';
import { PayloadModel } from './search.types';
import { useMatch, useMatchRoute } from '@tanstack/react-location';
import { JobList } from '../../organisms/job-list/job-list';

// const subMenuList = [{ label: 'Projects', value: 'projects' }, { label: 'Posts', value: 'posts' }];

const menuList = [{ label: 'Projects', value: 'projects' }, { label: 'Posts', value: 'posts' }, { label: 'Socila Causes', value: 'social' }, { label: 'Skills ', value: 'skills' }]




export const Search = () => {
    const data = useMatch().ownData;
    const [list, setList] = useState(data.items);
    const [result, setResult] = useState(data.total_count);

    const [state, setState] = useState<PayloadModel>({
        page: 1,
        filter: {},
        type: 'projects',
        q: 'socious'
    });

    // const onChangeMenu = (value: string) => {
    //     const payload = { ...state, type: value };
    //     setState(payload);
    //     getResponse(payload);
    // }

    const getResponse = (state: PayloadModel) => {
        search(state).then(resp => {
            // setResult(resp.items.length);
            setList(resp.items);
        });
    };

    const onValueChange = (value: string) => {
        console.log('value ==>', value);
    }

    const onLike = () => {

    }

    const onRemoveLike = () => {

    }

    const onMorePage = () => {

    }

    return (
        <div className={css.container}>
            <div className={css.header}>
                <img src='/icons/chevron-left.svg' />
                <div className={css.search}>
                    <SearchAtom placeholder='Search' onValueChange={onValueChange} />
                </div>
            </div>
            {/* <div className={css.menu}>
                <FilterMenu list={menuList} selectedValue='projects' onGetValue={onChangeMenu} />
            </div> */}
            <div className={css.result}>
                <span>{result} Results</span>
                <img src="/icons/filter-blue.svg" />
            </div>

            <div className={css.mainList}>
                {/* <FeedList data={list} onLike={onLike} onRemoveLike={onRemoveLike} onMorePageClick={onMorePage} /> */}
                <JobList data={list} onMorePageClick={onMorePage} />


            </div>

        </div>
    );
};