import { Divider, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { isTouchDevice } from 'src/core/device-type-detector';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './stepperCard.module.scss';
import { StepperCardProps } from './stepperCard.types';

export const StepperCard: React.FC<StepperCardProps> = (props) => {
  const {
    title,
    subtitle,
    iconName,
    img,
    supprtingText,
    editable,
    deletable,
    description,
    handleEdit,
    handleDelete,
    verified,
  } = props;
  const [seeMore, setSeeMore] = useState(false);
  const [descriptionStr, setDescriptionStr] = useState(description);

  const truncateString = () => {
    const len = description?.length || 0;
    const maxLen = isTouchDevice() ? 160 : 360;
    if (description && len > maxLen) {
      let truncated = description?.slice(0, maxLen);
      if (truncated.charAt(truncated.length - 1) !== ' ') {
        const idx = truncated.lastIndexOf(' ');
        truncated = truncated.slice(0, idx);
      }
      setDescriptionStr(truncated.concat('...'));
      setSeeMore(true);
    } else {
      setDescriptionStr(description);
      setSeeMore(false);
    }
  };

  const seeMoreClick = () => {
    setDescriptionStr(description);
    setSeeMore(false);
  };

  useEffect(() => {
    truncateString();
  }, [description]);

  return (
    <div className="flex gap-3 h-full">
      <div className="hidden md:flex flex-col w-fit gap-1">
        <Avatar iconName={iconName} type="users" img={img || undefined} />

        <div className="w-1/2 flex-1 ">
          <Divider orientation="vertical" />
        </div>
      </div>
      <div className="relative flex flex-col w-full">
        <div className="absolute top-0 right-0 h-fit w-fit flex">
          {editable && (
            <IconButton
              size="medium"
              iconName="pencil-01"
              iconSize={20}
              iconColor={variables.color_grey_600}
              customStyle={css.action}
              onClick={handleEdit}
            />
          )}
          {deletable && (
            <IconButton
              size="medium"
              iconName="trash-01"
              iconSize={20}
              iconColor={variables.color_grey_600}
              customStyle={css.action}
              onClick={handleDelete}
            />
          )}
        </div>
        <div className="block md:hidden mb-3">
          <Avatar fontSize={48} iconName={iconName} type="users" />
        </div>
        <div className="pt-1 pb-6">
          <Typography variant="h4" component="div" color={variables.color_grey_900}>
            <Box component="h4" display="flex" alignItems="center" sx={{ gap: 0.5 }}>
              {title}
              {verified ? (
                <Box component="span" display="flex" alignItems="center" color={variables.color_grey_400}>
                  <Icon name="shield-tick" color={variables.color_success_500} />
                  <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">(verified)</span>
                </Box>
              ) : (
                <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">(unverified)</span>
              )}
            </Box>
          </Typography>
          <Typography variant="h5" color={variables.color_grey_600}>
            {subtitle}
          </Typography>
          <Typography variant="h5" color={variables.color_grey_600}>
            {supprtingText}
          </Typography>
        </div>
        <div className="mb-5">
          <Typography variant="h5" color={variables.color_grey_600}>
            {descriptionStr}
          </Typography>
          {seeMore && (
            <span className={css.seeMoreBtn} onClick={seeMoreClick}>
              see more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
