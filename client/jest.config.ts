/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/*import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

const esModules = ['remark-parse', ]



// Add any custom config to be passed to Jest
const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    "transform": {
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
    },
    transformIgnorePatterns: [`/node_modules/(?!(${esModules.join('|')})/)`],
    // Add more setup options before each test is run
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/components/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],


}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)*/

import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

const esModules = [
    'ccount',
    'react-markdown',
    'vfile',
    'unist-.+',
    'unified',
    'bail',
    'is-plain-obj',
    'trough',
    'remark',
    'remark-.+',
    'mdast-util-.+',
    'micromark',
    'parse-entities',
    'character-entities',
    'property-information',
    'comma-separated-tokens',
    'hast-util-whitespace',
    'hast-util-to-html',
    'hast-util-sanitize',
    'html-void-elements',
    'space-separated-tokens',
    'decode-named-character-reference',
    'zwitch',
    'longest-streak',
    'stringify-entities',
    'trim-lines',
    'swiper',
    'swiper/react',
    'ssr-window',
    'dom7',
    'remark-parse', // Specific ESM modules
].join('|');

// Add any custom Jest configuration
const customJestConfig: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Setup file for Jest
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
        '^.+\\.jsx?$': 'babel-jest', // Transform JavaScript files
        'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest', // Specific transform
    },
    transformIgnorePatterns: [`/node_modules/(?!(${esModules})/)`], // Allowlist ESM modules
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^helpers/(.*)$': '<rootDir>/src/helpers/$1',
        '^generated/(.*)$': '<rootDir>/src/generated/$1',
        '^mixins/(.*)$': '<rootDir>/src/mixins/$1',
        '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^mocks/(.*)$': '<rootDir>/src/__mocks__/$1',
    },
    modulePaths: ['<rootDir>/src/'],
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/components/**/*.tsx',
        '!<rootDir>/src/pages/**',
        '!<rootDir>/src/components/**/stories.tsx',
        '!<rootDir>/src/components/**/index.ts',
    ],
    coveragePathIgnorePatterns: ['.*__snapshots__/.*'],
};

// Create the final Jest configuration
export default async () => ({
    ...(await createJestConfig(customJestConfig)()), // Merge custom config with Next.js config
    transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})/`], // Allowlist ESM modules
});