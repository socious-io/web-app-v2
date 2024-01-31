import { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { Header } from 'src/components/atoms/header-v2/header';
import { Input } from 'src/components/atoms/input/input';
import { Popover } from 'src/components/atoms/popover/popover';
import { PopoverProps } from 'src/components/atoms/popover/popover.types';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Category } from 'src/components/molecules/category/category';
import { Modal } from 'src/components/templates/modal/modal';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { COUNTRY_CODES } from 'src/constants/COUNTRY_CODE';
import { skillsToCategoryAdaptor, socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { useProfileUserEditShared } from 'src/pages/profile-user-edit/profile-user-edit.shared';

import css from './edit.module.scss';
import { EditProps } from './edit.types';

export const Edit = (props: EditProps): JSX.Element => {
  const [coverLetterMenuOpen, setCoverLetterMenu] = useState(false);
  const [avatarMenuOpen, setAvatarMenu] = useState(false);
  const avatarAnchor = useRef<null | HTMLDivElement>(null);
  const coverLetterAnchor = useRef<null | HTMLDivElement>(null);

  const { onCoverEdit, onAvatarEdit, onCountryUpdate, coverImage, avatarImage, cities, form, onSaveDesktop } =
    useProfileUserEditShared(props);

  const coverLetterMenu: PopoverProps['menuList'] = [
    { id: 1, label: 'Upload image', cb: () => onCoverEdit.desktop('upload') },
    { id: 2, label: 'Remove image', cb: () => onCoverEdit.desktop('remove') },
  ];

  const avatarMenu: PopoverProps['menuList'] = [
    { id: 1, label: 'Upload image', cb: onAvatarEdit.desktop('upload') },
    { id: 2, label: 'Remove image', cb: onAvatarEdit.desktop('remove') },
  ];

  const [skills, setSkills] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    skillsToCategoryAdaptor().then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <Modal height={props.height} width={props.width} open={props.open} onClose={props.onClose}>
      <div className={css.container}>
        <div className={css.mainHeader}>
          <Header onBack={props.onClose} title="Edit" right={{ label: 'Save', onClick: onSaveDesktop }} />
        </div>
        <div>
          <div>
            <div className={css.header}>
              <div className={css.coverImage} style={{ backgroundImage: `url(${coverImage})` }} />
              <div
                ref={coverLetterAnchor}
                className={css.photoIcon}
                onClick={() => setCoverLetterMenu((prev) => !prev)}
              >
                <img src="/icons/photos-white.svg" />
                <Popover
                  anchor={coverLetterAnchor.current}
                  open={coverLetterMenuOpen}
                  onClose={() => setCoverLetterMenu(false)}
                  menuList={coverLetterMenu}
                />
              </div>
              <div className={css.profileImgContainer}>
                <div ref={avatarAnchor} className={css.photoIcon} onClick={() => setAvatarMenu((prev) => !prev)}>
                  <img src="/icons/photos-white.svg" />
                  <Popover
                    anchor={avatarAnchor.current}
                    open={avatarMenuOpen}
                    onClose={() => setAvatarMenu(false)}
                    menuList={avatarMenu}
                  />
                </div>
                <div className={css.profileImage} style={{ backgroundImage: `url(${avatarImage})` }} />
              </div>
            </div>
          </div>
          <div className={css.formContainer}>
            <Input register={form} label="First name" name="first_name" placeholder="first name" />
            <Input register={form} label="Last name" name="last_name" placeholder="last name" />
            <Input register={form} label="Username" name="username" placeholder="username" />
            <Textarea register={form} label="Bio" name="bio" placeholder="biography" />
            <Textarea register={form} label="Mission" name="mission" placeholder="mission" />
            <Category
              register={form}
              name="social_causes"
              label="Social causes"
              maxLength={5}
              list={socialCausesToCategoryAdaptor()}
              placeholder="Social causes"
            />
            <Category register={form} name="skills" label="Skills" list={skills} placeholder="skills" />
            <Textarea register={form} label="Address" name="address" placeholder="address" />
            <Dropdown
              register={form}
              label="Country"
              name="country"
              list={COUNTRIES}
              placeholder="country"
              onValueChange={onCountryUpdate}
              defaultValue={COUNTRIES.find((item) => item.id === form.controls.country['value'])?.label || ''}
            />
            <Dropdown
              register={form}
              label="City"
              name="city"
              list={cities}
              placeholder="city"
              onValueChange={(option) => form.controls.geoname_id.setValue(option.id)}
              defaultValue={form.controls.city['value']?.toString()}
            />
            <div>
              <div className={css.label}>Phone</div>
              <div className={css.phoneContainer}>
                <Dropdown
                  register={form}
                  name="mobile_country_code"
                  placeholder="+1"
                  list={COUNTRY_CODES}
                  defaultValue={form.controls.mobile_country_code.value?.toString()}
                />
                <Input register={form} name="phone" placeholder="phone" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
