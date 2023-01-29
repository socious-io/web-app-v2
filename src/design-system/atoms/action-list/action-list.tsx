import css from './action-list.module.scss';
import { ActionListProps } from './action-list.types';


export const ActionList = ({ list }: ActionListProps) => {
    return (
        <div className={css.container}>
            {
                list.map((item) =>
                    <div key={item.label} className={css.item} onClick={item.onClick}>
                        <img src={`icons/${item.iconName}.svg`} />
                        <span className={css.label}>{item.like} {item.label}</span>
                    </div>
                )
            }
        </div>
    )
}