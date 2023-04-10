import { SelectCardProps } from './select-card-types';
import css from './select-card.module.scss';

export const SelectCard: React.FC<SelectCardProps> = ({
  id,
  name,
  value,
  type = 'radio',
  checked,
  onChange,
  imageProps,
  text,
  disabled = false,
  cardClass = '',
  contentClass = '',
  inputClass = '',
}) => {
  return (
    <div className={`${css['select-card']} ${cardClass}`}>
      <label className={css['label']}>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => onChange?.(value, e.target.checked)}
          disabled={disabled}
          className={`${css['input']} ${inputClass}`}
        />
        <div className={`${css['content']} ${contentClass}`}>
          {imageProps?.src && (
            <img src={imageProps.src} width={imageProps.width} height={imageProps.height} alt={imageProps.alt} />
          )}
          {text && <span className={css['text']}>{text}</span>}
        </div>
      </label>
    </div>
  );
};
