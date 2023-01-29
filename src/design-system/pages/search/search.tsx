import { FilterMenu } from '../../molecules/filter-menu/filter-menu';
import css from './search.module.scss';
import { Search as SearchAtom } from '../../atoms/search/search'
import { search } from './search.services';
import { useEffect, useState } from 'react';
import { PayloadModel } from './search.types';

const subMenuList = [{ label: 'Projects', value: 'projects' }, { label: 'Posts', value: 'posts' }];

const list = [{ label: 'Projects', value: 'projects', type: 'dropdown', subMenu: subMenuList }, { label: 'Socila Causes', value: 'social', type: 'modal' }, { label: 'Skills ', value: 'skills', type: 'modal' }]




export const Search = () => {

    const [state, setState] = useState<PayloadModel>({
        page: 1,
        filter: {},
        type: '',
        q: 'socious'

    });

    useEffect(() => {
        onChangeMenu('projects');
    }, []);

    const onChangeMenu = (value: string) => {
        const payload = { ...state, type: value };
        setState(payload);
        getResponse(payload);
    }

    const getResponse = (state: PayloadModel) => {
        search(state).then(resp => {
            console.log('resp', resp);
        });
    };

    const onValueChange = (value: string) => {
        console.log('value ==>', value);
    }

    return (
        <div className={css.container}>
            <div className={css.header}>
                <img src='/icons/chevron-left.svg' />
                <div className={css.search}>
                    <SearchAtom placeholder='Search' onValueChange={onValueChange} />
                </div>
            </div>
            <div className={css.menu}>
                <FilterMenu list={list} selectedValue='projects' onGetValue={onChangeMenu} />
            </div>
            <div className={css.result}>
                <span>22 Results</span>
                <img src="/icons/image.svg" />
            </div>
        </div>
    );
};