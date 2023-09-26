import { useState } from 'react';

import { Header } from 'src/components/atoms/header/header';
import { Tabs } from 'src/components/atoms/tabs/tabs';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { CardSlideUp } from 'src/components/templates/card-slide-up/card-slide-up';
import { printWhen } from 'src/core/utils';
import { connectionListAdaptor, receivedRequestsAdaptor, sentRequestsAdaptor } from '../connections.service';
import { useConnectionsShared } from '../connections.shared';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
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
  const [selectedItem, setSelectedItem] = useState({ connect_id: '', identity_id: '', following: true, open: false });

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

  const connectionListJSX = connectionList?.total_count ? (
    <>
      <div className={css.connections}>
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
      </div>
      {printWhen(
        <div className={css.seeMore} onClick={() => loadMore('connections')}>
          See more
        </div>,
        connectionList?.total_count > connectionList?.items.length
      )}
    </>
  ) : (
    <div className={css.noConnections}>No connections</div>
  );

  const sentRequestsListJSX = (
    <>
      <div className={css.connections}>
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
      </div>
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
      <div className={css.connections}>
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
      </div>
      {printWhen(
        <div className={css.seeMore} onClick={() => loadMore('received')}>
          See more
        </div>,
        receivedRequestsList?.total_count > receivedRequestsList?.items.length
      )}
    </>
  );

  const tabs = [
    {
      name: 'Connections',
      content: connectionListJSX,
      default: true,
    },
    {
      name: 'Requests',
      content: (
        <>
          <Accordion id="received" title={`Requests received (${receivedRequestsList?.total_count})`}>
            {receivedRequests}
          </Accordion>
          <Accordion id="sent" title={`Requests sent (${sentRequestsList?.total_count})`}>
            {sentRequestsListJSX}
          </Accordion>
        </>
      ),
    },
  ];

  return (
    <div className={css.container}>
      <Header
        onBack={() => navigate({ to: '/network' })}
        border="0"
        paddingTop={'var(--safe-area)'}
        title="Manage connections"
      />
      <div className={css.tabContainer}>
        <Tabs tabs={tabs} />
      </div>
      <CardSlideUp open={selectedItem.open} onClose={() => setSelectedItem({ ...selectedItem, open: false })}>
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
      </CardSlideUp>
    </div>
  );
};
