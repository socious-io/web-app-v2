import { RadioGroup } from '@mui/material';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { CardRadioButtonProps } from './index.types';
import { Checkbox } from '../checkbox/checkbox';
import { Icon } from '../Icon';

const CardRadioButton: React.FC<CardRadioButtonProps> = ({
  items,
  selectedValue,
  setSelectedValue,
  containerClassName = '',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <RadioGroup className="gap-3">
      {items.map(item => (
        <div
          key={item.value}
          className={`${styles['container']} ${selectedValue === item.value && styles['container--selected']} ${containerClassName}`}
          onClick={() => setSelectedValue(item.value)}
        >
          {item.img ||
            (item.icon && (
              <div className={styles['icon']}>
                <Icon
                  name={item.icon.name}
                  fontSize={item.icon.fontSize}
                  color={selectedValue === item.value ? variables.color_primary_600 : variables.color_primary_600}
                />
              </div>
            ))}

          <div className={styles['content']}>
            <span className={styles['title']}>{item.title}</span>
            {item.description && <span className={styles['desc']}>{item.description}</span>}
            {item.content}
          </div>
          <Checkbox
            id={item.value}
            type="checkCircle"
            size="small"
            value={item.value}
            checked={selectedValue === item.value}
            onChange={handleChange}
          />
        </div>
      ))}
    </RadioGroup>
  );
};

export default CardRadioButton;
