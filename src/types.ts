export interface IBankData {
	ifsc: string;
	bank_id: string;
	branch: string;
	address: string;
	city: string;
	district: string;
	state: string;
	bank_name: string;
}

export enum IAsyncStatus {
	SUCCESS = 'SUCCESS',
	LOADING = 'LOADING',
	ERROR = 'ERROR'
}

export interface ICITY_DATA {
	value: string;
	text: string;
}
