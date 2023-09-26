import { useState } from 'react';

import { Card } from 'src/components/atoms/card/card';
import { BackLink } from 'src/components/molecules/back-link';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { Modal } from 'src/components/templates/modal/modal';
import { printWhen } from 'src/core/utils';
import { connectionListAdaptor, receivedRequestsAdaptor, sentRequestsAdaptor } from '../connections.service';
import { useConnectionsShared } from '../connections.shared';
import css from './desktop.module.scss';
import { useAuth } from 'src/hooks/use-auth';

export const Desktop: React.FC = () => {
  const navigate = {};
  const {
    currentId,
    connectionList,
    sentRequestsList,
    receivedRequestsList,
    acceptRequest,
    onMoreClick,
    loadMore,
    onProfileClick,
  } = useConnectionsShared();
  const [tabs, setTabs] = useState('');
  const [selectedItem, setSelectedItem] = useState({ connect_id: '', identity_id: '', following: false, open: false });
  const { isLoggedIn } = useAuth();

  const moreOptions = [
    {
      icon: selectedItem.following ? 'close-circle' : 'add',
      label: selectedItem.following ? 'Unfollow' : 'Follow',
    },
    {
      icon: 'block',
      label: 'Block user account',
    },
  ];

  const connectionListJSX = (
    <>
      <Card className={css.connections}>
        {connectionList?.items
          .map((list) => connectionListAdaptor(list, currentId))
          .map((list) => (
            <div key={list.id} className={css.connections__item}>
              <div className={css.connections__avatar}>
                <Avatar
                  img={list.avatar}
                  type={list.type}
                  onClick={() => list?.username && onProfileClick(list.type, list.username)}
                />
                {list.name}
              </div>
              <div className={css.connections__icons}>
                {/* <div>
              <img src="/icons/trash-bin.svg" />
            </div> */}
                <div
                  onClick={() =>
                    setSelectedItem({
                      connect_id: list.connect_id,
                      identity_id: list.id,
                      following: list.following,
                      open: true,
                    })
                  }
                >
                  <img src="/icons/three-dots-blue.svg" />
                </div>
              </div>
            </div>
          ))}
      </Card>
      {printWhen(
        <div className={css.seeMore} onClick={() => loadMore('connections')}>
          See more
        </div>,
        connectionList?.total_count > connectionList?.items.length
      )}
    </>
  );

  const sentRequestsListJSX = (
    <>
      <Card className={css.connections}>
        {sentRequestsList?.items
          .map((list) => sentRequestsAdaptor(list))
          .map((list) => (
            <div key={list.id} className={css.connections__item}>
              <div className={css.connections__avatar}>
                <Avatar
                  img={list.avatar}
                  type={list.type}
                  onClick={() => list?.username && onProfileClick(list.type, list.username)}
                />
                {list.name}
              </div>
              <div className={css.connections__icons}>
                {/* <div>
              <img src="/icons/trash-bin.svg" />
            </div> */}
              </div>
            </div>
          ))}
      </Card>
      {printWhen(
        <div className={css.seeMore} onClick={() => loadMore('sent')}>
          See more
        </div>,
        sentRequestsList?.total_count > sentRequestsList?.items.length
      )}
    </>
  );

  const receivedRequests = (
    <>
      <Card className={css.connections}>
        {receivedRequestsList?.items
          .map((list) => receivedRequestsAdaptor(list))
          .map((list) => (
            <div key={list.id} className={css.connections__item}>
              <div className={css.connections__info}>
                <div className={css.connections__avatar}>
                  <Avatar
                    img={list.avatar}
                    type={list.type}
                    onClick={() => list?.username && onProfileClick(list.type, list.username)}
                  />
                  {list.name}
                  <span className={css.connections__date}>{list.date}</span>
                </div>
                <ExpandableText text={list.text} />
              </div>
              <div className={css.connections__icons}>
                <div onClick={() => acceptRequest(list.connect_id)}>
                  <img src="/icons/user-add.svg" />
                </div>
                {/* <div>
              <img src="/icons/trash-bin.svg" />
            </div> */}
              </div>
            </div>
          ))}
      </Card>
      {printWhen(
        <div className={css.seeMore} onClick={() => loadMore('received')}>
          See more
        </div>,
        receivedRequestsList?.total_count > receivedRequestsList?.items.length
      )}
    </>
  );

  function setRenderTabs() {
    switch (tabs) {
      case 'received':
        return receivedRequestsList?.total_count ? (
          receivedRequests
        ) : (
          <div className={css.noConnections}>No requests</div>
        );
      case 'sent':
        return sentRequestsList?.total_count ? (
          sentRequestsListJSX
        ) : (
          <div className={css.noConnections}>No requests</div>
        );
      default:
        return connectionList?.total_count ? (
          connectionListJSX
        ) : (
          <div className={css.noConnections}>No connections</div>
        );
    }
  }

  return (
    <>
      <TwoColumnCursor visibleSidebar={isLoggedIn}>
        <div className={css.leftContainer}>
          <BackLink title="Back" />
          <Card className={css.manage}>
            <span className={css.manage__title} onClick={() => setTabs('')}>
              Manage
            </span>
            <span
              className={`${css.manage__item} ${tabs === 'received' && css.manage__item_active}`}
              onClick={() => setTabs('received')}
            >
              Requests received ({receivedRequestsList?.total_count})
            </span>
            <span
              className={`${css.manage__item} ${tabs === 'sent' && css.manage__item_active}`}
              onClick={() => setTabs('sent')}
            >
              Requests sent ({sentRequestsList?.total_count})
            </span>
          </Card>
        </div>
        <div className={css.rightContainer}>
          <Card className={css.header}>Manage connections</Card>
          {setRenderTabs()}
        </div>
      </TwoColumnCursor>
      <Modal open={selectedItem.open} onClose={() => setSelectedItem({ ...selectedItem, open: false })}>
        <div className={css.moreBox}>
          {moreOptions?.map((option, index) => (
            <div
              key={option.label}
              className={css.moreOption}
              onClick={() => {
                onMoreClick(index, selectedItem.connect_id, selectedItem.identity_id, selectedItem.following);
                setSelectedItem({ ...selectedItem, open: false });
              }}
            >
              <img src={`/icons/${option.icon}.svg`} />
              {option.label}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};
