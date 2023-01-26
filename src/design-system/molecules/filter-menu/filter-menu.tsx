import css from './filter-menu.module.scss';
import { FilterMenuProps } from './filter-menu.types';


export const FilterMenu = ({ list, selectedValue, onGetValue }: FilterMenuProps) => {

    const onClick = (value: string) => {
        onGetValue(value);
    }

    return (
        <div className={css.container}>
            {
                list.map(item =>
                    <div key={item.value} onClick={() => onClick(item.value)}
                        className={`${css.item} ${item.value === selectedValue ? css.active : ''}`}>
                        <span>{item.label}</span>
                        {
                            item.value === selectedValue
                                ? <img src='/icons/arrow-down-white.svg' />
                                : <img src='/icons/arrow-down-black.svg' />
                        }

                    </div>)
            }
        </div>
    );
};