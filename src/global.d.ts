declare global {
  interface Window {
    ethereum: any;
    evmproviders: any;
    cardano?: { lace?: any };
    midnight?: { mnLace?: any };
  }
}
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
