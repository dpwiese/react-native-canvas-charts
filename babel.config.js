module.exports = {
  plugins: [
    "@babel/plugin-transform-react-jsx-source",
    "@babel/plugin-transform-react-jsx",
  ],
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-env"
  ],
  comments: false,
  compact: true,
};
