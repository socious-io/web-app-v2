import React, { useEffect, useRef, useState } from 'react';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';

import css from './result-list.module.scss';
import { ResultListProps } from './ResultList.types';
export const ResultList: React.FC<ResultListProps> = ({ list, onSelect }) => {
  const selectedRef = useRef(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<null | number>(null);

  useEffect(() => {
    if (hoveredRowIndex !== null && selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, [hoveredRowIndex]);
  const handleKeyDown = (event) => {
    console.log('value', hoveredRowIndex);
    if (event.key === 'ArrowUp') {
      setHoveredRowIndex((prevIndex) => (prevIndex !== null ? Math.max(prevIndex - 1, 0) : 0));
    } else if (event.key === 'ArrowDown') {
      if (hoveredRowIndex === null) setHoveredRowIndex(0);
      else setHoveredRowIndex((prevIndex) => (prevIndex !== null ? Math.min(prevIndex + 1, list.length - 1) : 0));
    } else if (event.key === 'Enter' && hoveredRowIndex !== null) {
      if (hoveredRowIndex !== null) {
        console.log('clicked');
        onClickRow(list[hoveredRowIndex], hoveredRowIndex);
      }
    }
  };
  useEffect(() => {
    console.log('effect', hoveredRowIndex);
  }, [hoveredRowIndex]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [hoveredRowIndex]);
  const onClickRow = (item, index) => {
    console.log('clicked', item, index);
    onSelect(item);
    setSelectedRowIndex(index);
  };
  return (
    <div className="h-full overflow-y-auto flex flex-col flex-1">
      {list.map((item, index) => (
        <div
          ref={index === hoveredRowIndex ? selectedRef : null}
          className={`${css.rows} ${selectedRowIndex === index ? css.selected : ''}  ${
            hoveredRowIndex === index ? css.selected : ''
          }`}
          onClick={() => onClickRow(item, index)}
        >
          <AvatarLabelGroup account={{ name: item.title, id: item.id, username: item.username, type: item.type }} />
        </div>
      ))}
    </div>
  );
};
