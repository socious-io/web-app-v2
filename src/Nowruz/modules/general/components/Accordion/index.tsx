import React, { useReducer } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './accordion.module.scss';
import { AccordionProps } from './Accordion.types';
import { reducer } from './reducer';

export const Accordion: React.FC<AccordionProps> = ({
  title = '',
  content,
  icon = true,
  expanded = false,
  divider = false,
  breakpoint,
  iconPosition,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    expanded: expanded,
    divider: divider,
    breakpoint: breakpoint || 'desktop',
    iconPosition: iconPosition || 'left',
  });

  const hasDivider = state.divider ? `${css.divider_true}` : '';
  const breakpointSize = state.breakpoint === 'desktop' ? `${css.breakpoint_desktop}` : `${css.breakpoint_mobile}`;

  return (
    <div
      className={`${css.accordion} ${state.breakpoint} ${hasDivider}`}
      onClick={() => {
        dispatch('click');
      }}
    >
      <div className={`${css.content} ${breakpointSize} ${state.iconPosition}`}>
        {state.iconPosition === 'left' && (
          <>
            <>
              {icon && (
                <div className={`${css.icon_wrap}`}>
                  {state.expanded && <Icon name="chevron-up" fontSize={20} color={variables.color_grey_400} />}
                  {!state.expanded && <Icon name="chevron-down" fontSize={20} />}
                </div>
              )}
            </>
          </>
        )}

        <div className={`${css.text_and_supporting}`}>
          <div className={`${css.text}`}>{title}</div>
          {state.expanded && <p className={`${css.supporting_text}`}>{content}</p>}
        </div>
        {state.iconPosition === 'right' && (
          <>
            <>
              {icon && (
                <div className={`${css.icon_wrap}`}>
                  {state.expanded && <Icon name="chevron-up" fontSize={20} color={variables.color_grey_400} />}
                  {!state.expanded && <Icon name="chevron-down" fontSize={20} />}
                </div>
              )}
            </>
          </>
        )}
      </div>
    </div>
  );
};
