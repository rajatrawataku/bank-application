import { IDropDownOptionData } from 'src/types';

export const BANK_API_URL = 'https://vast-shore-74260.herokuapp.com/banks';

export const DEFAULT_LISTINGS_PER_PAGE = 10;

export const DEFAULT_CITY_DROPDOWN_DATA = [
	{
		value: 'MUMBAI',
		text: 'Mumbai'
	},
	{ value: 'PUNE', text: 'Pune' },
	{ value: 'DELHI', text: 'Delhi' },
	{ value: 'CHENNAI', text: 'Chennai' },
	{ value: 'GOA', text: 'Goa' }
];

export const SELECT_CITY = 'Select City';
export const SELECT_CATEGORY = 'Select Category';
export const SEARCH_TEXT = 'Search';
export const SEARCH_INPUT_DELAY = 2000;
export const ALL_BANKS_TEXT = 'All Banks';
export const FETCHING_DATA = 'Fetching City Data....';
export const UNABLE_TO_FETCH_DATA = 'Unable to fetch Data';
export const NO_BANK = 'There are no banks for this search';
export const NO_BANK_DATA = 'No Bank Data Available';
export const RETRY = 'Retry';
export const LISTINGS_PER_PAGE = 'Select Listings Per Page';

export const DEFAULT_CATEGORY_TO_SHOW = ['bank_name', 'ifsc', 'branch', 'bank_id', 'address'];

export const CATEGORY_KEY_MAPPER: Record<string, string> = {
	bank_name: 'Bank Name',
	ifsc: 'IFSC',
	branch: 'Branch',
	bank_id: 'Bank Id',
	address: 'Address'
};

export const LISTINGS_PER_PAGE_DROPDOWN_OPTIONS: IDropDownOptionData[] = [
	{
		value: 10,
		text: 10
	},
	{
		value: 20,
		text: 20
	},
	{
		value: 50,
		text: 50
	},
	{
		value: 100,
		text: 100
	},
	{
		value: 200,
		text: 200
	}
];
