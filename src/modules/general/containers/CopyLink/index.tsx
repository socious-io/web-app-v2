import { useState } from 'react';
import { translate } from 'src/core/utils';
import { Icon } from 'src/modules/general/components/Icon';
import { Input } from 'src/modules/general/components/input/input';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { CopyLinkProps } from './index.types';

const CopyLink: React.FC<CopyLinkProps> = ({ link, copyText = translate('general-copy'), onCopy, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const onCopyClick = () => {
    onCopy();
    setCopied(true);
  };

  return (
    <Input
      id="copy-url"
      value={link}
      className={className}
      postfix={
        <div className={copied ? styles['copy--success'] : styles['copy']} onClick={onCopyClick}>
          <Icon
            name={copied ? 'tick' : 'copy-01'}
            fontSize={20}
            color={copied ? variables.color_success_700 : variables.color_grey_700}
          />
          {copyText}
        </div>
      }
    />
  );
};

export default CopyLink;
