import * as config from './dapp.config';
import * as connect from './dapp.connect';
import * as service from './dapp.service';
import * as types from './dapp.types';

export default {
  ...types,
  ...connect,
  ...service,
  ...config,
};
