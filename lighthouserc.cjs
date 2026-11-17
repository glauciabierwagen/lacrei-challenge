module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      url: ["http://localhost:3000/", "http://localhost:3000/sobre"],
      numberOfRuns: 3,
      settings: { chromeFlags: "--no-sandbox --headless" },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.8, aggregationMethod: "median" }],
        "categories:accessibility": ["error", { minScore: 0.9, aggregationMethod: "median" }],
        "color-contrast": "error",
      },
    },
    upload: { target: "filesystem", outputDir: "./lighthouse-reports" },
  },
};