import { StoryFn } from '@storybook/react';
import { Mail01 } from 'public/icons/nowruz/mail-01';
import { Passcode } from 'public/icons/nowruz/passcode';
import { Star02 } from 'public/icons/nowruz/star-02';
import { User01 } from 'public/icons/nowruz/user-01';
export const steps = [
  { title: 'Email verification', desc: 'Please check your email', icon: Mail01 },
  { title: 'Choose a password', desc: 'Choose a secure password', icon: Passcode },
  { title: 'Your details', desc: 'Enter your name', icon: User01 },
  { title: 'Congartulations', desc: 'Start making an impact', icon: Star02 },
];
