import { ChangeEvent, useState } from 'react';
import { Checkbox } from '../../../atoms/checkbox/checkbox';
import { Radio } from '../../../atoms/radio/radio';
import css from './desktop.module.scss';

export const Desktop = () => {

    const [value, setValue] = useState('apple')

    const bla = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }


    return (
        <div className={css.container}>
            {/* <Checkbox id='1' label='what is this?' checked={false} disabled={false} /> */}
            <Radio checked={value === 'apple'} onChange={bla} name='fruit' value='apple' id='1' label='Apple' />
            <Radio checked={value === 'orange'} onChange={bla} name='fruit' value='orange' id='2' label='Orange' />
        </div>
    )
}