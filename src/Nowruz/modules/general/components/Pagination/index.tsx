import { Pagination as MUIPagination, PaginationItem, PaginationProps } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './pagination.module.scss';

export const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <div className="relative">
      <MUIPagination
        shape="rounded"
        sx={{
          '.MuiPagination-ul': {
            display: 'flex',
            justifyContent: 'center',
            listStyleType: 'none',
            padding: 0,

            button: {
              color: variables.color_grey_600,
              fontSize: '14px',
              fontWeight: '500',
              padding: '12px',
              borderRadius: '8px',
            },
          },
          '.MuiPagination-ul > :first-child': {
            position: 'absolute',
            left: '0',
          },
          '.MuiPagination-ul > :last-child': {
            position: 'absolute',
            right: '0',
          },
          '.Mui-selected': {
            backgroundColor: variables.color_grey_50,
            color: variables.color_grey_800,
          },
        }}
        renderItem={(item) => {
          return (
            <PaginationItem
              slots={{
                previous: () => (
                  <div className={css.buttonsFont}>
                    <Icon name="arrow-left" fontSize={20} color={variables.color_grey_800} className="mr-2" />
                    Previous
                  </div>
                ),
                next: () => (
                  <div className={css.buttonsFont}>
                    Next <Icon name="arrow-right" fontSize={20} color={variables.color_grey_800} className="ml-2" />
                  </div>
                ),
              }}
              {...item}
            />
          );
        }}
        {...props}
      />
    </div>
  );
};
