const presets = [
  "@babel/preset-typescript",
  [
    "@babel/preset-react",
    {
      runtime: "automatic",
      development: process.env.NODE_ENV === "development",
      // importSource: "@welldone-software/why-did-you-render",
      importSource: "@emotion/react",
    },
  ],
];

module.exports = { presets };
