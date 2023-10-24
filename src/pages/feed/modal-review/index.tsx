import { useSelector } from 'react-redux';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Card } from 'src/components/atoms/card/card';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { TextClickableURLs } from 'src/components/atoms/text-clickable-urls';
import { WebModal } from 'src/components/templates/web-modal';
import { createPost, CurrentIdentity, posts, uploadMedia } from 'src/core/api';
import { printWhen } from 'src/core/utils';
import css from 'src/pages/feed/modal-review/modal-review.module.scss';
import { ModalReviewProps } from 'src/pages/feed/modal-review/modal-review.types';
import { RootState } from 'src/store';

export const ModalReview: React.FC<ModalReviewProps> = ({
  open,
  onClose,
  imgFile,
  imgUrl,
  text,
  soucialValue,
  setFeedList,
  onDone,
}) => {
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const avatarImg = useSelector<RootState, string>((state) => {
    return state.identity.avatarImage;
  });

  async function onSubmit() {
    let imageId: string[] = [];
    if (imgFile) {
      const id = await uploadMedia(imgFile).then((resp) => resp.id);
      imageId = [id];
    }
    const payload = {
      causes_tags: [soucialValue],
      content: text,
      media: imageId,
    };

    createPost(payload).then(() => {
      posts({ page: 1 }).then((resp) => {
        setFeedList(resp.items);
        onClose();
        onDone();
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
    <WebModal
      open={open}
      onClose={onClose}
      header="Review Post"
      footerClassName={css.footer}
      buttons={[{ children: 'Post', color: 'blue', onClick: onSubmit, className: css.btn }]}
    >
      <div className={css.main}>
        <div className={css.social}>
          <div className={css.avatar}>
            <Avatar img={avatarImg} type={identity?.type || 'users'} />
            {identity?.meta.name}
          </div>
          <CategoriesClickable list={obj} />
        </div>
        <div className={`${css.text} ${!!imgUrl && css.text__border}`}>
          <TextClickableURLs text={text} />
        </div>
        {printWhen(
          <div className={css.image}>
            <Card>
              <img src={imgUrl} alt="" />
            </Card>
          </div>,
          !!imgUrl,
        )}
      </div>
    </WebModal>
  );
};
