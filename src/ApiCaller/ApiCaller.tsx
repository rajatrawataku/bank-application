import Timeout from './Timeout';

const DEFAULT_CACHE_TTL = 30000;
const DEFAULT_TIMEOUT = 30000;

interface IApiCallerProps {
	cacheTTL?: number;
	timeout?: number;
}

export class ApiCaller {
	dataCache: Map<
		string,
		{
			timeStamp: number;
			data: any;
		}
	> = new Map();

	cacheTTL: number;
	timeout: number;

	constructor(props?: IApiCallerProps) {
		const { cacheTTL = DEFAULT_CACHE_TTL, timeout = DEFAULT_TIMEOUT } = props || ({} as IApiCallerProps);
		this.cacheTTL = cacheTTL;
		this.timeout = timeout;
	}

	getFromCache = (url: string) => {
		const currentTime = new Date().getTime();

		const cachedData = this.dataCache.get(url);
		if (cachedData === undefined) {
			return {
				isPresentInCache: false
			};
		}

		const { timeStamp, data } = cachedData;

		if (currentTime - timeStamp > this.cacheTTL) {
			return {
				isPresentInCache: false
			};
		}

		return {
			isPresentInCache: true,
			data
		};
	};

	get(config) {
		const { url, options } = config;
		return this.createRequest(url, options);
	}

	createRequest = (url: string, options) => {
		const { isPresentInCache, data } = this.getFromCache(url);

		if (isPresentInCache) {
			return Promise.resolve(data);
		}

		const timeout = new Timeout();

		const actualPromsie = fetch(url, options)
			.then(response => {
				if (response.ok) {
					return response.json().then(
						data => Promise.resolve(data),
						e => Promise.reject(e)
					);
				} else {
					return Promise.reject(response);
				}
			})
			.then(
				response => Promise.resolve(response),
				e => Promise.reject(e)
			);

		return Promise.race([timeout.start, actualPromsie]).then(
			data => {
				timeout.clear();
				this.dataCache.set(url, {
					timeStamp: new Date().getTime(),
					data
				});
				return Promise.resolve(data);
			},
			e => {
				timeout.clear();
				return Promise.reject(e);
			}
		);
	};
}

const ApiCallerInstance = new ApiCaller();

export default ApiCallerInstance;
