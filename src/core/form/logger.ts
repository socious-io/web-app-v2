/* eslint-disable no-console */

const log = (...args: unknown[]): void => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...args);
    }
};

export { log };
