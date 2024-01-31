import React, { useEffect } from 'react';

import { indexPageUrls, oauthSignIn } from './job-indexing-google.service';

const GoogleJobIndexing = () => {
  useEffect(() => {
    const uri = window.location.href;
    const hash = uri.split('#')[1];
    if (hash) {
      const params = hash.split('&');
      const token = params[1].split('=')[1];
      indexPageUrls(token);
    } else {
      oauthSignIn();
    }
  }, []);

  return <div>Jobs are being indexed by google</div>;
};

export default GoogleJobIndexing;
