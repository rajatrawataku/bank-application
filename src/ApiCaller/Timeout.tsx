export default class Timeout {
	timeout: number = 30000;
	timeoutId: NodeJS.Timer | undefined;

	constructor(timeout?: number) {
		if (timeout !== undefined) {
			this.timeout = timeout;
		}
	}

	get start() {
		return new Promise((_, reject) => {
			this.timeoutId = setTimeout(() => {
				reject('Request timeout');
			}, this.timeout);
		});
	}

	clear() {
		this.timeoutId && clearTimeout(this.timeoutId);
	}
}
