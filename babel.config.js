const presets = [
  // "react-app",
  [
    "@babel/preset-react",
    {
      runtime: "automatic",
      development: process.env.NODE_ENV === "development",
      importSource: "@welldone-software/why-did-you-render",
    },
  ],
];

module.exports = { presets };
