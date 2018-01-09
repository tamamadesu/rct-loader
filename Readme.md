# rct-loader
> React.js component loader for [Webpack](https://webpack.js.org/)

<p align="center">
  <img width="600px" src="./screenshot.jpg">
</p>

<h2>Usage</h2>



```bash
npm i rct-loader --save-dev
```

```javascript
module: {
  rules: [
    {
      test: /\.rct$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'rct-loader'
      }
    }
  ]
}
```