import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dialog } from 'src/core/dialog/dialog';

import css from './dialog-create.module.scss';
import { DialogCreateProps } from './dialog-create.types';
import { Avatar } from '../../../components/atoms/avatar/avatar';
import { Button } from '../../../components/atoms/button/button';
import { Dropdown } from '../../../components/atoms/dropdown/dropdown';
import { Textarea } from '../../../components/atoms/textarea/textarea';
import { socialCausesToDropdownAdaptor } from '../../../core/adaptors';
import { IdentityReq } from '../../../core/types';
import { RootState } from '../../../store/store';
import { DialogReview } from '../dialog-review/dialog-review';



export const DialogCreate = ({ onClose, setFeedList }: DialogCreateProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [state, setState] = useState({
    social: '',
    text: '',
    imgUrl: '',
  });

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  const isDisable = () => {
    return [state.social, state.text].every((item) => !!item);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    onClose();
  };

  const getSocialValue = (value: string) => {
    setState({ ...state, social: value });
  };

  const onChangeTextHandler = (e: any) => {
    const value = e.target.value;
    setState({ ...state, text: value });
  };

  const imagUpload = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    } else if (e.target.files[0].size > 1_048_576) {
      dialog.alert({ message: 'Image should be less than 1 MB' });
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setState({ ...state, imgUrl: '' });
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setState({ ...state, imgUrl: objectUrl });
  }, [selectedFile]);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <span></span>
        <span className={css.title}>Create Post</span>
        <div onClick={onClose}>
          <img src="icons/close-black.svg" />
        </div>
      </div>
      <div className={css.social}>
        <Avatar img={avatarImg} type={identity.type} />
        <Dropdown
          placeholder="Social Cause"
          list={socialCausesToDropdownAdaptor()}
          onGetValue={getSocialValue}
          selectedValue={state.social}
        />
      </div>
      <div className={css.text}>
        <Textarea rows="15" variant="outline" onChange={onChangeTextHandler} placeholder="I feel like ..." />
      </div>
      <div className={css.footer}>
        <div className={css.image}>
          <div>
            <img src="icons/image.svg" />
            <input type="file" onChange={imagUpload} />
          </div>
        </div>
        <div className={css.button}>
          <Button color="blue" onClick={handleClickOpen} disabled={!isDisable()}>
            Next
          </Button>
        </div>
      </div>
      <Dialog fullScreen open={openDialog}>
        <DialogReview
          onClose={handleClose}
          imgFile={selectedFile || ''}
          imgUrl={state.imgUrl}
          text={state.text}
          soucialValue={state.social}
          setFeedList={setFeedList}
        />
      </Dialog>
    </div>
  );
};
