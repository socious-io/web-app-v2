import css from './mobile.module.scss';
import { Avatar } from '../../../atoms/avatar/avatar';
import { Button } from '../../../atoms/button/button';
import { ThreeDotsButton } from '../../../atoms/three-dots-button/three-dots-button';
import { useMatch } from '@tanstack/react-location';
import { Divider } from '../../../templates/divider/divider';
import { ProfileReq } from '../profile.types';
import { CategoriesClickable } from '../../../atoms/categories-clickable/categories-clickable';
import { socialCausesToCategory } from '../../../../core/adaptors';

export const Mobile = (): JSX.Element => {
  const data = useMatch().ownData as ProfileReq;

  const socialCauses = socialCausesToCategory(data.social_causes);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div style={{ backgroundImage: `url(${data.cover_image.url})` }} className={css.cover}>
          <div className={css.avatarContainer}>
            <Avatar img={data.image.url} size="8rem" type="users" />
          </div>
        </div>
        <div className={css.menu}>
          <div className={css.btnContainer}>
            {/* <Button width="6.5rem">Connect</Button> */}
            <ThreeDotsButton onClick={console.log} />
          </div>
          <div className={css.userConnections}>
            <div>{data.followings} connections</div>
            <div>{data.followers} Followers</div>
          </div>
        </div>
      </div>
      <div>
        <Divider>
          <div className={css.bio}>{data.bio}</div>
        </Divider>
        <Divider title="Social Causes">
          <CategoriesClickable list={socialCauses} />
        </Divider>
        <Divider title="Contact">
          <div className={css.contactItem}>
            <img src="/icons/pin.svg" />
            <div className={css.contactData}>{data.address}</div>
          </div>
          <div className={css.contactItem}>
            <img src="/icons/suitcase.svg" />
            <div className={css.contactData}>
              {data.mobile_country_code} {data.phone}
            </div>
          </div>
          <div className={css.contactItem}>
            <img src="/icons/network.svg" />
            <div className={css.contactData}>{data.email}</div>
          </div>
          <div className={css.contactItem}>
            <img src="/icons/part-time.svg" />
            <div className={css.contactData}>{data.website}</div>
          </div>
        </Divider>
        <Divider title="Mission">
          <div className={css.mission}>{data.mission}</div>
        </Divider>
        <Divider title="Culture">
          <div className={css.culture}>{data.culture}</div>
        </Divider>
      </div>
    </div>
  );
};
