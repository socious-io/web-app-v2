import { Dialog } from '@mui/material';
import { useState } from 'react';
import { Avatar } from '../../../atoms/avatar/avatar';
import { Button } from '../../../atoms/button/button';
import { Card } from '../../../atoms/card/card';
import { CategoriesClickable } from '../../../atoms/categories-clickable/categories-clickable';
import { DialogCreate } from '../dialog-create/dialog-create';
import css from './dialog-review.module.scss';
import { DialogReviewProps } from './dialog-review.types';

export const DialogReview = (props: DialogReviewProps) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        props.onClose();
    };

    const obj = [{
        label: props.soucialValue,
        value: props.soucialValue
    }]


    return (
        <div className={css.container}>
            <div className={css.header}>
                <div onClick={handleClickOpen}>
                    <img src='icons/chevron-left.svg' />
                </div>
                <span className={css.title}>Review Post</span>
                <div onClick={props.onClose}>
                    <img src='icons/close-black.svg' />
                </div>
            </div>
            <div className={css.social}>
                <Avatar type='user' />
                <CategoriesClickable list={obj} />
            </div>
            <div className={css.text}>
                {props.text}
            </div>
            <div className={css.image}>
                <Card>
                    <img src={props.imgUrl} />
                </Card>
            </div>
            <div className={css.footer}>
                <div className={css.button}>
                    <Button color="blue"  >
                        Post
                    </Button>
                </div>
            </div>
            <Dialog fullScreen open={openDialog}>
                <DialogCreate onClose={handleClose} />
            </Dialog>
        </div>
    )
}