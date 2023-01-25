import { DialogCreateProps } from "./dialog-create.types";
import css from './dialog-create.module.scss';
import { Avatar } from "../../../atoms/avatar/avatar";
import { Dropdown } from "../../../atoms/dropdown/dropdown";
import { Textarea } from "../../../atoms/textarea/textarea";
import { Button } from "../../../atoms/button/button";

const list = [{ value: '1', title: 'mouth' }, { value: '2', title: 'donky' }]

export const DialogCreate = ({ onClose }: DialogCreateProps) => {

    const getValue = () => {

    }

    return (
        <div className={css.container}>
            <div className={css.header}>
                <span></span>
                <span className={css.title}>Create Post</span>
                <div onClick={onClose}>
                    <img src='icons/close-black.svg' />
                </div>

            </div>
            <div className={css.social}>
                <Avatar type='user' />
                <Dropdown placeholder="Soucial cause" list={list} onGetValue={getValue} />
            </div>
            <div className={css.text}>
                <Textarea />
            </div>
            <div className={css.footer}>
                <div className={css.image}>
                    <div><img src="icons/image.svg" /></div>
                </div>
                <div className={css.button}>
                    <Button color="blue" >
                        Next
                    </Button>
                </div>

            </div>

        </div>
    )
}