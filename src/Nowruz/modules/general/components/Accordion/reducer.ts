export function reducer(state: any, action: any) {
  if (
    state.breakpoint === 'desktop' &&
    state.divider === false &&
    state.expanded === true &&
    state.iconPosition === 'right'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'desktop',
          divider: false,
          expanded: false,
          iconPosition: 'right',
        };
    }
  }

  if (
    state.breakpoint === 'mobile' &&
    state.divider === false &&
    state.expanded === true &&
    state.iconPosition === 'right'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'mobile',
          divider: false,
          expanded: false,
          iconPosition: 'right',
        };
    }
  }

  if (
    state.breakpoint === 'desktop' &&
    state.divider === true &&
    state.expanded === true &&
    state.iconPosition === 'right'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'desktop',
          divider: true,
          expanded: false,
          iconPosition: 'right',
        };
    }
  }

  if (
    state.breakpoint === 'mobile' &&
    state.divider === true &&
    state.expanded === true &&
    state.iconPosition === 'right'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'mobile',
          divider: true,
          expanded: false,
          iconPosition: 'right',
        };
    }
  }

  if (
    state.breakpoint === 'desktop' &&
    state.divider === false &&
    state.expanded === false &&
    state.iconPosition === 'right'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'desktop',
          divider: false,
          expanded: true,
          iconPosition: 'right',
        };
    }
  }

  if (
    state.breakpoint === 'mobile' &&
    state.divider === false &&
    state.expanded === false &&
    state.iconPosition === 'right'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'mobile',
          divider: false,
          expanded: true,
          iconPosition: 'right',
        };
    }
  }

  if (
    state.breakpoint === 'desktop' &&
    state.divider === true &&
    state.expanded === false &&
    state.iconPosition === 'right'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'desktop',
          divider: true,
          expanded: true,
          iconPosition: 'right',
        };
    }
  }

  if (
    state.breakpoint === 'mobile' &&
    state.divider === true &&
    state.expanded === false &&
    state.iconPosition === 'right'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'mobile',
          divider: true,
          expanded: true,
          iconPosition: 'right',
        };
    }
  }

  if (
    state.breakpoint === 'desktop' &&
    state.divider === false &&
    state.expanded === true &&
    state.iconPosition === 'left'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'desktop',
          divider: false,
          expanded: false,
          iconPosition: 'left',
        };
    }
  }

  if (
    state.breakpoint === 'mobile' &&
    state.divider === false &&
    state.expanded === true &&
    state.iconPosition === 'left'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'mobile',
          divider: false,
          expanded: false,
          iconPosition: 'left',
        };
    }
  }

  if (
    state.breakpoint === 'desktop' &&
    state.divider === true &&
    state.expanded === true &&
    state.iconPosition === 'left'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'desktop',
          divider: true,
          expanded: false,
          iconPosition: 'left',
        };
    }
  }

  if (
    state.breakpoint === 'mobile' &&
    state.divider === true &&
    state.expanded === true &&
    state.iconPosition === 'left'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'mobile',
          divider: true,
          expanded: false,
          iconPosition: 'left',
        };
    }
  }

  if (
    state.breakpoint === 'desktop' &&
    state.divider === false &&
    state.expanded === false &&
    state.iconPosition === 'left'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'desktop',
          divider: false,
          expanded: true,
          iconPosition: 'left',
        };
    }
  }

  if (
    state.breakpoint === 'mobile' &&
    state.divider === false &&
    state.expanded === false &&
    state.iconPosition === 'left'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'mobile',
          divider: false,
          expanded: true,
          iconPosition: 'left',
        };
    }
  }

  if (
    state.breakpoint === 'desktop' &&
    state.divider === true &&
    state.expanded === false &&
    state.iconPosition === 'left'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'desktop',
          divider: true,
          expanded: true,
          iconPosition: 'left',
        };
    }
  }

  if (
    state.breakpoint === 'mobile' &&
    state.divider === true &&
    state.expanded === false &&
    state.iconPosition === 'left'
  ) {
    switch (action) {
      case 'click':
        return {
          breakpoint: 'mobile',
          divider: true,
          expanded: true,
          iconPosition: 'left',
        };
    }
  }

  return state;
}
