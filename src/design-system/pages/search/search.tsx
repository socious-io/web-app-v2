import { FilterMenu } from '../../molecules/filter-menu/filter-menu';
import css from './search.module.scss';

const list = [{ label: 'project', value: '1' }, { label: 'date posted', value: '2' }, { label: 'social ', value: '3' },]


export const Search = () => {

    const bla = (value: string) => {
        console.log('value', value);

    }

    return (
        <div>
            <FilterMenu list={list} selectedValue='1' onGetValue={bla} />
        </div>
    );
};