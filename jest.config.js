const config = {
    testMatch:["<rootDir>/__test__/*.test.js"],
    transform: {
      '\\.[jt]sx?$': 'babel-jest'
    },
    verbose: true,
    testEnvironment:"node"
  };  
export default config;