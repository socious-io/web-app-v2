import { useSelector } from 'react-redux';
import { CurrentIdentity, DisputeEvent } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { RootState } from 'src/store';

export const useTimelineItem = (event: DisputeEvent) => {
  const { type, profileImage, name } = getIdentityMeta(event.creator);
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );
  const myEvent = currentIdentity?.id === event.creator.id;

  const fileIcons = [
    { type: 'jpg', icon: '/icons/nowruz/file-jpg.svg' },
    { type: 'pdf', icon: '/icons/nowruz/file-pdf.svg' },
    { type: 'png', icon: '/icons/nowruz/file-png.svg' },
  ];

  const getEventTitle = () => {
    switch (event.type) {
      case 'MESSAGE':
        return {
          text: 'Filed a dispute against ',
          supportingText: myEvent ? name : 'you',
        };
      case 'RESPONSE':
        return {
          text: '',
          supportingText: '',
        };
      case 'WITHDRAW':
        return {
          text: 'Withdrew this dispite',
          supportingText: '',
        };
      case 'VOTE':
        return {
          text: '',
          supportingText: '',
        };
    }
  };

  const getFileIcon = (fileUrl: string) => {
    const fileName = fileUrl.split('/').pop();
    const fileIcon = fileIcons.find(item => item.type === fileName?.split('.').pop())?.icon;
    return { name: fileName, icon: fileIcon };
  };

  return { name, type, profileImage, myEvent, getEventTitle, getFileIcon };
};
