import React from 'react';
import styles from './selectable.module.scss';

export const Selectable: React.FC<SelectableProps> = ({ title, list, onEdit, onRemove }) => {
  return (
    <div className={styles['selectable']}>
      <div className={styles['selectable__header']}>
        <span className={styles['selectable__title']}>{title}</span>
        <img src="/icons/pen.svg" alt="edit" className={styles['selectable__edit']} onClick={onEdit} />
      </div>
      <div className={styles['selectable__list']}>
        {list.map((item) => (
          <div className={styles['selectable__item']}>
            {item.label} <img src="/icons/close-green.svg" alt="close" onClick={() => onRemove(item.value)} />
          </div>
        ))}
      </div>
    </div>
  );
};
