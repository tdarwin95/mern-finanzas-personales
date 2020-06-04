module.exports = {
	entry: './app/src/index.js',
	output: {
		path: __dirname + '/app/public',
		filename: 'bundle.js'
	},

	module: {
		rules: [
			{
				use: ["babel-loader"],
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	}
}