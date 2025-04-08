/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/middleware/",
    "/utils/responseHandler.ts",
    "/services/",
    "/utils/db.ts",
    "/classes/"
  ],
};