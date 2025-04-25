import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';
import { Chip } from 'src/modules/general/components/Chip';
import { SearchItem } from 'src/modules/Search/containers/SearchModal/SearchModal.types';

import css from './result-list.module.scss';
import { ResultListProps } from './ResultList.types';
export const ResultList: React.FC<ResultListProps> = ({ list, onClose }) => {
  const selectedRef = useRef(null);
  const [selectedRowIndex] = useState(null);
  const [hoveredRowIndex] = useState<null | number>(null);
  const navigate = useNavigate();

  const onClickRow = (item: SearchItem) => {
    let path = '';
    switch (item.type) {
      case 'projects':
        path = `/jobs/${item.id}`;
        break;
      case 'organizations':
        path = `/profile/organizations/${item.username}/view`;
        break;
      case 'services':
        path = `/services/${item.id}`;
        break;
      default:
        path = `/profile/users/${item.username}/view`;
        break;
    }
    onClose();
    navigate(path);
  };

  return (
    <div className="h-full w-full overflow-y-auto flex flex-col ">
      {list.map((item, index) => (
        <div key={item.id} className="flex flex-row items-start">
          <div
            ref={index === hoveredRowIndex ? selectedRef : null}
            className={`${css.rows} ${selectedRowIndex === index ? css.selected : ''}  ${
              hoveredRowIndex === index ? css.selected : ''
            }`}
            onClick={() => onClickRow(item as SearchItem)}
          >
            <AvatarLabelGroup
              removeFull={true}
              customStyle="w-auto"
              isVerified={item.isVerified}
              account={{
                name: item.title,
                id: item.id,
                username: item.username,
                type: item.type === 'projects' ? 'organizations' : 'users',
                img: item.image,
              }}
            />
            {item.isAvailable && (
              <div className={css.chip}>
                <Chip
                  startIcon={<div className={css.dotIcon} />}
                  label={item.type === 'users' ? 'Available for work' : 'Hiring'}
                  theme="secondary"
                  shape="sharp"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
