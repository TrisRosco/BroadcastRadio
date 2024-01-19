const API_ROOT = '/api';

async function api (url, args = {}) {
	if (typeof args.body == 'object') {
		args.body = JSON.stringify(args.body)

		args.headers = Object.assign(
			{
				'Content-Type': 'application/json'
			},
			args.headers
		)
	}

	const response = await fetch(API_ROOT + url, args)
	const text = await response.text()

	try {
		const json = await JSON.parse(text)
		return json;
	} catch (e) {
		throw new Error(text)
	}
}

export default api;