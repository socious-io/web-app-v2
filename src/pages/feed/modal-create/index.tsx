import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Modal } from 'src/components/templates/modal/modal';
import { Dropdown } from 'src/components/atoms/dropdown/dropdown';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Button } from 'src/components/atoms/button/button';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';
import { socialCausesToDropdownAdaptor } from 'src/core/adaptors';
import { ModalCreateProps } from './modal-create.types';
import { ModalReview } from '../modal-review';
import css from './modal-create.module.scss';

export const ModalCreate: React.FC<ModalCreateProps> = ({ open, onClose, setFeedList }) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
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
    <>
      <Modal open={open} onClose={onClose}>
        <div className={css.container}>
          <div className={css.header}>
            <span></span>
            Create post
            <img src="/icons/close-black.svg" onClick={onClose} />
          </div>

          <div className={css.social}>
            <Avatar img={avatarImg} type={identity.type} />
            <Dropdown
              containerClassName={css.dropdown}
              placeholder="Social Cause"
              list={socialCausesToDropdownAdaptor()}
              onGetValue={getSocialValue}
            />
          </div>

          <div className={css.text}>
            <Textarea
              rows="15"
              variant="outline"
              placeholder="I feel like ..."
              onChange={onChangeTextHandler}
              className={css.textbox}
            />
          </div>

          <div className={css.image}>
            <div>
              <img src="icons/image.svg" />
              <input type="file" onChange={imagUpload} />
            </div>
          </div>
          <div className={css.button}>
            <Button
              color="blue"
              onClick={() => {
                onClose();
                setOpenReviewModal(true);
              }}
              disabled={!isDisable()}
            >
              Next
            </Button>
          </div>
        </div>
      </Modal>
      <ModalReview
        open={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        soucialValue={state.social}
        text={state.text}
        imgFile={selectedFile || ''}
        imgUrl={state.imgUrl}
        setFeedList={setFeedList}
      />
    </>
  );
};
