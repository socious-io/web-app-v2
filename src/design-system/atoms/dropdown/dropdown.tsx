import { useEffect, useState } from 'react';
import css from './dropdown.module.scss';
import { DropdownProps } from './dropdown.types';
import { Items } from './items/items';

export const Dropdown = ({ list, onGetValue, selectedValue, label , placeholder }: DropdownProps) => {
    const [state, setState] = useState({
        isListOpen: false,
        headerTitle: '',
    });

    const [filterList, setFilterList] = useState(list);

    const onToggleList = () => {
        state.isListOpen = !state.isListOpen;
        setState({ ...state, isListOpen: state.isListOpen })
    }

    const onClickItems = (title: string, value: string) => {
        setState({ isListOpen: false, headerTitle: title });
        onGetValue(value);
    }

    useEffect(() => {
        const selectedTitle = list.find(item => item.value === selectedValue)?.title;
        if (selectedTitle) {
            setState({ ...state, headerTitle: selectedTitle })
        }
    }, []);

    const onChangeHandler = (e: any) => {
        setState({ isListOpen: true, headerTitle: e.target.value });
        const newList = list.filter(item => item.title.includes(e.target.value));
        setFilterList(newList);
    }

    return (
        <>
            <div className={css.label}>{label}</div>
            <div className={css.wrapper}>
                <div className={css.header}>
                    <div className={css.title}>
                        <input type='text' placeholder={placeholder} onChange={onChangeHandler} value={state.headerTitle} />
                    </div>
                    <div onClick={onToggleList} className={css.icon}>
                        <img src='icons/arrow-down-black.svg' />
                    </div>
                </div>
                {
                    state.isListOpen && (
                        <div className={css.list}>
                            {
                                filterList.map((item) =>
                                    <div className={css.listItem} key={item.value}>
                                        <Items title={item.title} value={item.value} onClick={onClickItems} />
                                    </div>)
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
};