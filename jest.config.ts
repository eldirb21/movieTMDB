module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^react-router-dom$": "<rootDir>/node_modules/react-router-dom",
    "^react-router$": "<rootDir>/node_modules/react-router",
  },
  setupFiles: ["<rootDir>/jest.setup.ts"],
  transformIgnorePatterns: ["node_modules/(?!axios)/"],
};
