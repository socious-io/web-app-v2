import { AccordionSummary as MuiAccordionSummary, Accordion as MuiAccordion } from '@mui/material';
import React, { useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './index.module.scss';
import { AccordionProps } from './index.types';

const Accordion: React.FC<AccordionProps> = ({ children, title = '', expand = false, contentClassName = '' }) => {
  const [isExpanded, setIsExpanded] = useState(expand);

  return (
    <MuiAccordion expanded={isExpanded} onChange={() => setIsExpanded(!isExpanded)} className={css.accordionRoot}>
      <MuiAccordionSummary
        className={css.accordionSummaryRoot}
        expandIcon={<Icon name="chevron-down" fontSize={20} color={variables.color_grey_600} />}
      >
        {title}
      </MuiAccordionSummary>
      <div className={`${css.accordionContent} ${contentClassName}`}>{children}</div>
    </MuiAccordion>
  );
};

export default Accordion;
