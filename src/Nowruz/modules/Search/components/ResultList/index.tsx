import React, { useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useNavigate } from 'react-router-dom';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';

import css from './result-list.module.scss';
import { ResultListProps } from './ResultList.types';
import { Item } from '../../containers/SearchModal/SearchModal.types';
export const ResultList: React.FC<ResultListProps> = ({ list, onClose,loadMore = console.log, hasMore = false }) => {

  const selectedRef = useRef(null);
  const [selectedRowIndex] = useState(null);
  const [hoveredRowIndex] = useState<null | number>(null);
  const navigate = useNavigate();

  const onClickRow = (item: Item) => {
    let path = '';
    switch (item.type) {
      case 'projects':
        path = `/nowruz/jobs/${item.id}`;
        break;
      case 'organizations':
        path = `/nowruz/profile/organizations/${item.username}/view`;
        break;
      default:
        path = `/nowruz/profile/users/${item.username}/view`;
        break;
    }
    onClose();
    navigate(path);
  };

  return (
    <div className="h-full w-full overflow-y-auto flex flex-col ">
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        useWindow={false}
      >
      {list.map((item, index) => (
        <div className="flex flex-row items-start">
          <div
            ref={index === hoveredRowIndex ? selectedRef : null}
            className={`${css.rows} ${selectedRowIndex === index ? css.selected : ''}  ${
              hoveredRowIndex === index ? css.selected : ''
            }`}
            onClick={() => onClickRow(item as Item)}
          >
            <AvatarLabelGroup
              removeFull={true}
              customStyle="w-auto"
              account={{ name: item.title, id: item.id, username: item.username, type: item.type, img: item.image }}
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

      </InfiniteScroll>
    </div>
  );
};
