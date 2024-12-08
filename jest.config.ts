import type { Config } from "jest";

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
  moduleNameMapper: {
    '^.+\\.(svg)$': '<rootDir>/__mocks__/svgMock.tsx',
  }
};

module.exports = createJestConfig(customJestConfig);