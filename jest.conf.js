module.exports = {
  // The test environment that will be used for running tests
  testEnvironment: 'node',
  
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  
  // The file extensions that Jest will look for when searching for test files
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  
  // The directories that Jest will look for when resolving modules
  moduleDirectories: ['node_modules', 'src'],
  
  // An array of file extensions that Jest should use when looking for modules
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  
  // A list of paths to directories that Jest should use to search for test files
  roots: ['<rootDir>/src'],
  
  // An array of glob patterns that Jest should ignore when searching for files
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  
  // An array of glob patterns that Jest should transform with the specified transformer
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
