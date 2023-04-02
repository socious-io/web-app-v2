import * as config from './dapp.config';
import * as types from './dapp.types';
import * as service from './dapp.service';
import * as connect from './dapp.connect';

export default {
  ...types,
  ...connect,
  ...service,
  ...config,
};
