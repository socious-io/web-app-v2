import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { WebModal } from 'src/components/templates/web-modal';
import { Dropdown } from 'src/components/atoms/dropdown/dropdown';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';
import { dialog } from 'src/core/dialog/dialog';
import { socialCausesToDropdownAdaptor } from 'src/core/adaptors';
import { ModalCreateProps } from './modal-create.types';
import { ModalReview } from '../modal-review';
// import css from './modal-create.module.scss';

export const ModalCreate: React.FC<ModalCreateProps> = ({ open, onClose, setFeedList }) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const intialValue = { social: '', text: '', imgUrl: '' };
  const [state, setState] = useState(intialValue);

  const identity = useSelector<RootState, IdentityReq | undefined>((state) => {
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
    <>
      <WebModal
        open={open}
        onClose={onClose}
        header="Create post"
        // footerClassName={css.footer}
        footerClassName="justify-end"
        buttons={[
          {
            children: 'Next',
            color: 'blue',
            // className: css.btn,
            className: 'max-w-40',
            disabled: !isDisable(),
            onClick: () => {
              onClose();
              setOpenReviewModal(true);
            },
          },
        ]}
      >
        <>
          {/* <div className={css.social}> */}
          <div className="flex items-center gap-3 p-4 border-b-solid border-b-4 border-b-border-gray-01">
            <Avatar img={avatarImg} type={identity?.type || 'users'} />
            <Dropdown
              // containerClassName={css.dropdown}
              containerClassName="flex flex-1"
              placeholder="Social Cause"
              list={socialCausesToDropdownAdaptor()}
              onGetValue={getSocialValue}
              selectedValue={state.social}
            />
          </div>

          <div className="overflow-y-auto max-h-[650px] break-word">
            <Textarea
              rows="15"
              variant="outline"
              placeholder="I feel like ..."
              value={state.text}
              onChange={onChangeTextHandler}
              // className={css.textbox}
              className="p-4 placeholder-gray-03"
            />
          </div>

          {/* <div className={css.image}> */}
          <div className="flex justify-end items-center relative cursor-pointer py-2 px-4 bg-off-white-01">
            <img src="icons/image.svg" />
            <input
              type="file"
              onChange={imagUpload}
              className="absolute w-6 h-6 opacity-0 cursor-pointer top-2 right-4"
            />
          </div>
        </>
      </WebModal>
      <ModalReview
        open={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        soucialValue={state.social}
        text={state.text}
        imgFile={selectedFile || ''}
        imgUrl={state.imgUrl}
        setFeedList={setFeedList}
        onDone={() => {
          setState(intialValue);
          setSelectedFile(undefined);
        }}
      />
    </>
  );
};
