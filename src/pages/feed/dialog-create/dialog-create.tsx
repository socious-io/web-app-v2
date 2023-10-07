import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Button } from 'src/components/atoms/button/button';
import { Dropdown } from 'src/components/atoms/dropdown/dropdown';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { socialCausesToDropdownAdaptor } from 'src/core/adaptors';
import { CurrentIdentity, SocialCauses } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';
import css from 'src/pages/feed/dialog-create/dialog-create.module.scss';
import { DialogCreateProps } from 'src/pages/feed/dialog-create/dialog-create.types';
import { DialogReview } from 'src/pages/feed/dialog-review/dialog-review';
import { RootState } from 'src/store';

export const DialogCreate = ({ onClose, setFeedList }: DialogCreateProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [state, setState] = useState({
    social: '' as SocialCauses,
    text: '',
    imgUrl: '',
  });

  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const avatarImg = useSelector<RootState, string>((state) => {
    return state.identity.avatarImage;
  });
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
    setState({ ...state, social: value as SocialCauses });
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
        {identity && <Avatar img={avatarImg} type={identity.type} />}
        <Dropdown
          placeholder="Social Cause"
          list={socialCausesToDropdownAdaptor()}
          onGetValue={getSocialValue}
          selectedValue={state.social}
        />
      </div>
      <div className={css.text}>
        <Textarea
          // rows="15"
          variant="outline"
          onChange={onChangeTextHandler}
          placeholder="I feel like ..."
        />
      </div>
      <div className={css.footer}>
        <div className={css.image}>
          <div>
            <img src="icons/image.svg" alt="" />
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
