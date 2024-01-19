const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const { whenDev } = require('@craco/craco');

function useHotReload (app, root) {
	let router = require(root);

	app.use((req, res, next) => router(req, res, next));

	fs.watch(root, { recursive: true }, (type, file) => {
		try {
			let diskRoot = path.resolve(root);
			for (let filename in require.cache) {
				if (require.cache[filename].filename.startsWith(diskRoot)) {
					delete require.cache[filename]
				}
			}

			router = require(root);

			console.log('')
			console.log('the API server has reloaded', chalk.bold(chalk.green('successfully')))
			console.log('')

			return true;
		} catch (e) {
			console.error('')
			console.error(chalk.bgRed('An error occurred when trying to reload the API server:'))
			// only show the relevant part of the stack
			console.error(e.stack.split(/^.*node:internal\/modules/gm)[0].trim())
			console.error('')
		}
	})

}

module.exports = {
	devServer: whenDev(() => ({
		setupMiddlewares: (_, { app }) => {
			try {
				require('express-async-errors')
				useHotReload(app, './src/server')

				app.use(function (err, req, res, next) {
					if (err) {
						console.error('')
						console.error(chalk.bgRed('Unhandled Error:') + ' [', req && req.url, ']')
						console.error(String(err.stack).split(/^.*express-async-errors/gm)[0].trim())
						console.error('')

						return res.status(err.statusCode || 500).type('text').end(err.stack);
					}

					next()
				})
			} catch (e) {
				console.error('')
				console.error(chalk.bgRed('An error occurred when trying to start the API server:'))
				console.error(e.stack.split(/^.*node:internal\/modules/gm)[0].trim())
				console.error('')
				process.exit(1)
			}
			return _;
		}
	}))
};
