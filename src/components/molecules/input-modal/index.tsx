import { useCallback, useEffect, useState } from 'react';
import { Input } from 'src/components/atoms/input/input';
import { InputProps } from 'src/components/atoms/input/input.types';
import { Modal } from 'src/components/templates/modal/modal';
import { debounce } from 'src/core/utils';

import css from './input-modal.module.scss';
import { InputModalProps } from './input-modal.types';

export const InputModal: React.FC<InputModalProps> = ({
  items,
  open,
  onOpen,
  onClose,
  selectedItem,
  onSelectItem,
  modalHeader,
  ...rest
}) => {
  const [generatedItems, setGeneratedItems] = useState(items);

  useEffect(() => {
    setGeneratedItems(items);
  }, [items]);

  const search = (searchTerm: string) => {
    const filteredItems = items?.filter(
      (item) =>
        item.title.toLocaleLowerCase().includes(searchTerm) || item?.subtitle?.toLocaleLowerCase().includes(searchTerm),
    );
    setGeneratedItems(filteredItems);
  };

  return (
    <div className={css.container}>
      <Input inputClassName={css.input} {...(rest as InputProps)} ref={null} />
      <div className={css.selected} onClick={onOpen}>
        <img src={`/icons/crypto/${selectedItem}.svg`} width={24} height={24} />
        {selectedItem}
      </div>
      <Modal open={open} onClose={onClose} className={css.content} zIndex={5}>
        <div className={css.modal}>
          <div className={css.modal__header}>
            <span></span>
            {modalHeader}
            <div onClick={onClose}>
              <img src="/icons/close-black.svg" />
            </div>
          </div>
          <div className={css.modal__search}>
            <Input onChange={(e) => search(e.target.value)} placeholder="Search token name or paste address" />
          </div>
          {!!generatedItems.length ? (
            <div className={css.items}>
              {generatedItems?.map((item) => (
                <div
                  key={item.value}
                  className={css.item}
                  onClick={() => onSelectItem?.({ value: item.value, title: item.title, subtitle: item.subtitle })}
                >
                  <div className={css['item--left']}>
                    <img src={`/icons/crypto/${item.subtitle}.svg`} width={36} height={36} />
                    <div className={css.item__header}>
                      <span className={css.item__label}>{item.title}</span>
                      <span>{item.subtitle}</span>
                    </div>
                  </div>
                  <div className={css['item--right']}>{item?.amount?.toLocaleString()}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className={css.not_found}>Not found!</div>
          )}
        </div>
      </Modal>
    </div>
  );
};
