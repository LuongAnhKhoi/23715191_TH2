module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@(screens|components|constants|services|stores|hooks|navigation)/(.*)$': '<rootDir>/src/$1/$2',
  },
};

