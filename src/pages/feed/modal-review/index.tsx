import { useSelector } from 'react-redux';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Button } from 'src/components/atoms/button/button';
import { Modal } from 'src/components/templates/modal/modal';
import { Card } from 'src/components/atoms/card/card';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { RootState } from 'src/store/store';
import { printWhen } from 'src/core/utils';
import { getFeedList, submitPost, uploadImage } from '../mobile/mobile.service';
import { IdentityReq } from 'src/core/types';
import { ModalReviewProps } from './modal-review.types';
import css from './modal-review.module.scss';

export const ModalReview: React.FC<ModalReviewProps> = ({
  open,
  onClose,
  imgFile,
  imgUrl,
  text,
  soucialValue,
  setFeedList,
}) => {
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  async function onSubmit() {
    let imageId: string[] = [];
    if (imgFile) {
      const id = await uploadImage(imgFile).then((resp) => resp.data.id);
      imageId = [id];
    }
    const payload = {
      causes_tags: [soucialValue],
      content: text,
      media: imageId,
    };
    submitPost(payload).then(() => {
      getFeedList({ page: 1 }).then((resp) => {
        setFeedList(resp.items);
        onClose();
      });
    });
  }

  const obj = [
    {
      label: soucialValue,
      value: soucialValue,
    },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <div className={css.container}>
        <div className={css.header}>
          <span></span>
          Review Post
          <div onClick={onClose}>
            <img src="/icons/close-black.svg" />
          </div>
        </div>
        <div className={css.main}>
          <div className={css.social}>
            <div className={css.avatar}>
              <Avatar img={avatarImg} type={identity.type} />
              {identity.meta.name}
            </div>
            <CategoriesClickable list={obj} />
          </div>
          <div className={css.text}>{text}</div>
          {printWhen(
            <div className={css.image}>
              <Card>
                <img src={imgUrl} />
              </Card>
            </div>,
            !!imgUrl
          )}
        </div>
        <div className={css.footer}>
          <div className={css.button}>
            <Button onClick={onSubmit} color="blue">
              Post
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
