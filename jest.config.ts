import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  } as {},
  setupFilesAfterEnv: ['<rootDir>//jest.setup.ts'],
};

export default config;
