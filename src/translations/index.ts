import en from './en.json' assert { type: 'json' };

export type Language = 'EN';

export type Cluster =
  | 'ERROR'
  | 'SKILL'
  | 'PASSION'
  | 'SDG'
  | 'ORGTYPE'
  | 'PAYMENT'
  | 'PROJECT';

export type Options = {
  i18n?: Language;
  cluster?: Cluster;
  section?: string;
};

export default (msg: string, options?: Options): string => {
  const msgId = msg.trim().toUpperCase().replaceAll(' ', '_');
  const cluster = options?.cluster ? options?.cluster + '.' : '';
  const section = options?.section ? options?.section + '.' : '';

  // TODO: fix typing for index
  const index: string = `${cluster}${section}${msgId}`;

  switch (options?.i18n) {
    default:
      // @ts-ignore
      return en[index] || msg;
  }
};
