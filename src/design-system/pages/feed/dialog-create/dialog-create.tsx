import { DialogCreateProps } from "./dialog-create.types";
import css from './dialog-create.module.scss';
import { Avatar } from "../../../atoms/avatar/avatar";
import { Dropdown } from "../../../atoms/dropdown/dropdown";
import { Textarea } from "../../../atoms/textarea/textarea";
import { Button } from "../../../atoms/button/button";
import { Dialog } from "@mui/material";
import { useState } from "react";
import { DialogReview } from "../dialog-review/dialog-review";

const list = [{ value: '1', title: 'mouth' }, { value: '2', title: 'donky' }]

export const DialogCreate = ({ onClose }: DialogCreateProps) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        onClose();
    };

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
                    <Button color="blue" onClick={handleClickOpen} >
                        Next
                    </Button>
                </div>

            </div>
            <Dialog fullScreen open={openDialog}>
                <DialogReview onClose={handleClose} />
            </Dialog>
        </div>
    )
}