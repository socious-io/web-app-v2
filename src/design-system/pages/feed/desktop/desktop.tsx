import { Checkbox } from '../../../atoms/checkbox/checkbox';
import css from './desktop.module.scss';

export const Desktop = () => {
    return (
        <div className={css.container}>
            <Checkbox id='1' label='what is this?' checked={false} disabled={false} />
        </div>
    )
}