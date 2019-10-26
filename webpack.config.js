module.exports = {
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
          loaders: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
            require.resolve('sass-loader')
          ]
        },
      ],
    },
  };