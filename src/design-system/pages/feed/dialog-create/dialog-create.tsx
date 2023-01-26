import { DialogCreateProps } from "./dialog-create.types";
import css from './dialog-create.module.scss';
import { Avatar } from "../../../atoms/avatar/avatar";
import { Dropdown } from "../../../atoms/dropdown/dropdown";
import { Textarea } from "../../../atoms/textarea/textarea";
import { Button } from "../../../atoms/button/button";
import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { DialogReview } from "../dialog-review/dialog-review";
import { SocialCauses } from "../../../../core/constants";


const list = [{ value: 'SOCIAL', title: 'SOCIAL' }, { value: 'POVERTY', title: 'POVERTY' }];


export const DialogCreate = ({ onClose }: DialogCreateProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [state, setState] = useState({
        soucialValue: '',
        text: '',
        imgUrl: '',
    });

    const isDisable = () => {
        return [state.soucialValue, state.text].every(item => !!item);
    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        onClose();
    };

    const getSoucialValue = (value: string) => {
        console.log('value', value);
        setState({ ...state, soucialValue: value });
    }

    const onChangeTextHandler = (e: any) => {
        const value = e.target.value;
        setState({ ...state, text: value });
    }

    const imagUpload = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return;
        }
        setSelectedFile(e.target.files[0]);
    }

    useEffect(() => {
        if (!selectedFile) {
            setState({ ...state, imgUrl: '' })
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setState({ ...state, imgUrl: objectUrl });
    }, [selectedFile])

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
                <Dropdown placeholder="Soucial cause" list={list} onGetValue={getSoucialValue} />
            </div>
            <div className={css.text}>
                <Textarea onChange={onChangeTextHandler} placeholder='I feel like .....' />
            </div>
            <div className={css.footer}>
                <div className={css.image}>
                    <div>
                        <img src="icons/image.svg" />
                        <input type='file' onChange={imagUpload} />
                    </div>
                </div>
                <div className={css.button}>
                    <Button color="blue" onClick={handleClickOpen} disabled={!isDisable()} >
                        Next
                    </Button>
                </div>

            </div>
            <Dialog fullScreen open={openDialog}>
                <DialogReview onClose={handleClose}
                    imgUrl={state.imgUrl}
                    text={state.text}
                    soucialValue={state.soucialValue} />
            </Dialog>
        </div>
    );
};