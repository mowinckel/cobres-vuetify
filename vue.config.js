module.exports = {
  devServer: {
    proxy: {
      "^/v1/api": {
        target: "http://localhost:3000",
        secure: false
      }
    }
  }
};
