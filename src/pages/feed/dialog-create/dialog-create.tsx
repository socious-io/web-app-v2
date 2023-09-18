import { DialogCreateProps } from './dialog-create.types';
// import css from './dialog-create.module.scss';
import { Avatar } from '../../../components/atoms/avatar/avatar';
import { Dropdown } from '../../../components/atoms/dropdown/dropdown';
import { Textarea } from '../../../components/atoms/textarea/textarea';
import { Button } from '../../../components/atoms/button/button';
import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import { DialogReview } from '../dialog-review/dialog-review';
import { socialCausesToDropdownAdaptor } from '../../../core/adaptors';
import { useSelector } from 'react-redux';
import { IdentityReq } from '../../../core/types';
import { RootState } from '../../../store/store';
import { dialog } from 'src/core/dialog/dialog';

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
    <div className="bg-white flex flex-col h-screen">
      <div className="h-16 bg-white flex items-center justify-between p-5 border-solid border-4 border-border-gray-01 pt-safe-area">
        <span></span>
        <span className="font-semibold text-l">Create Post</span>
        <div onClick={onClose}>
          <img src="icons/close-black.svg" />
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 border-b-solid border-b-4 border-b--border-gray-01">
        <Avatar img={avatarImg} type={identity.type} />
        <Dropdown
          placeholder="Social Cause"
          list={socialCausesToDropdownAdaptor()}
          onGetValue={getSocialValue}
          selectedValue={state.social}
        />
      </div>
      <div className="p-4 min-h-[200px] break-words overflow-y-auto">
        <Textarea rows="15" variant="outline" onChange={onChangeTextHandler} placeholder="I feel like ..." />
      </div>
      <div className="bg-white mt-auto">
        <div className="flex justify-end h-12 items-center p-5 bg-off-white-01 relative">
          <div>
            <img src="icons/image.svg" />
            <input type="file" onChange={imagUpload} />
          </div>
        </div>
        <div className="flex justify-end bg-white py-10 px-4">
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
