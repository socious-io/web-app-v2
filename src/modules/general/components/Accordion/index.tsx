import { AccordionSummary as MuiAccordionSummary, Accordion as MuiAccordion } from '@mui/material';
import React, { useState } from 'react';
import { Icon } from 'src/modules/general/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { AccordionProps } from './index.types';

const Accordion: React.FC<AccordionProps> = ({
  children,
  title = '',
  subtitle = '',
  expand = false,
  hasBorder = true,
  contentClassName = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(expand);

  return (
    <MuiAccordion expanded={isExpanded} onChange={() => setIsExpanded(!isExpanded)} className={css.accordionRoot}>
      <MuiAccordionSummary
        className={`${css.accordionSummaryRoot} ${!hasBorder && '!border-b-0'}`}
        expandIcon={<Icon name="chevron-down" fontSize={20} color={variables.color_grey_600} />}
      >
        {subtitle ? (
          <div className="flex flex-col">
            {title}
            <span className={css.accordionSubtitle}>{subtitle}</span>
          </div>
        ) : (
          title
        )}
      </MuiAccordionSummary>
      <div className={`${css.accordionContent} ${contentClassName}`}>{children}</div>
    </MuiAccordion>
  );
};

export default Accordion;
