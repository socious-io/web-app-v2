import { reportPost } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';

export function report(feedId: string) {
  reportPost(feedId, { blocked: true, comment: 'comment' }).then(() => {
    dialog.alert({ title: 'Blocked', message: 'You successfully blocked the feed' });
  });
}

export function block(feedId: string) {
  reportPost(feedId, { blocked: false, comment: 'comment' }).then(() => {
    dialog.alert({ title: 'Report', message: 'You successfully Reported the feed' });
  });
}
