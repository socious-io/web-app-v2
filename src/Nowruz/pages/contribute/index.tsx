import { ContributorDashboard } from 'src/Nowruz/modules/dispute/components/contributorDashboard';
import { ContributorJoin } from 'src/Nowruz/modules/dispute/components/contributorJoin';

import { useContribute } from './useContribute';

export const Contribute = () => {
  const { eligible, joined, newlyJoined, setNewlyJoined, setJoined } = useContribute();

  if (joined) return <ContributorDashboard newlyJoined={newlyJoined} setJoined={setJoined} />;

  return <ContributorJoin eligible={eligible} setNewlyJoined={setNewlyJoined} setJoined={setJoined} />;
};
