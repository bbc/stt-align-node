const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: 'main.bundle.js' ,
        libraryTarget: 'var',
        library: 'STTdiff',
	    libraryExport: ''
      },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  };