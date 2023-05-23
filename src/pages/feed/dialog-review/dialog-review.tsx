import { Dialog } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IdentityReq } from '../../../core/types';
import { RootState } from '../../../store/store';
import { Avatar } from '../../../components/atoms/avatar/avatar';
import { Button } from '../../../components/atoms/button/button';
import { Card } from '../../../components/atoms/card/card';
import { CategoriesClickable } from '../../../components/atoms/categories-clickable/categories-clickable';
import { TextClickableURLs } from 'src/components/atoms/text-clickable-urls';
import { DialogCreate } from '../dialog-create/dialog-create';
import { getFeedList, submitPost, uploadImage } from '../mobile/mobile.service';
import css from './dialog-review.module.scss';
import { DialogReviewProps } from './dialog-review.types';

export const DialogReview = (props: DialogReviewProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    props.onClose();
  };

  async function onSubmit() {
    let imageId: string[] = [];
    if (props.imgFile) {
      const id = await uploadImage(props.imgFile).then((resp) => resp.data.id);
      imageId = [id];
    }
    const payload = {
      causes_tags: [props.soucialValue],
      content: props.text,
      media: imageId,
    };
    submitPost(payload).then(() => {
      getFeedList({ page: 1 }).then((resp) => {
        props.setFeedList(resp.items);
        handleClose();
      });
    });
  }

  const obj = [
    {
      label: props.soucialValue,
      value: props.soucialValue,
    },
  ];

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div onClick={handleClickOpen}>
          <img src="/icons/chevron-left.svg" />
        </div>
        <span className={css.title}>Review Post</span>
        <div onClick={props.onClose}>
          <img src="/icons/close-black.svg" />
        </div>
      </div>
      <div className={css.main}>
        <div className={css.social}>
          <Avatar img={avatarImg} type={identity.type} />
          <CategoriesClickable list={obj} />
        </div>
        <div className={css.text}>
          <TextClickableURLs text={props.text} />
        </div>
        <div className={css.image}>
          <Card>
            <img src={props.imgUrl} />
          </Card>
        </div>
      </div>
      <div className={css.footer}>
        <div className={css.button}>
          <Button onClick={onSubmit} color="blue">
            Post
          </Button>
        </div>
      </div>
      <Dialog fullScreen open={openDialog}>
        <DialogCreate onClose={handleClose} setFeedList={props.setFeedList} />
      </Dialog>
    </div>
  );
};
