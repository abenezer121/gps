module.exports = {
  rules: [{
    test: /\.less$/,
    use: [{
      loader: 'style-loader',
    },
    {
      loader: 'css-loader', // translates CSS into CommonJS
    },
    {
      loader: 'less-loader',
      options: {
        lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            'primary-color': '#ff3333',
            'link-color': '#ff3333',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    }]
  }]
}