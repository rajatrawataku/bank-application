import * as React from 'react';
import { IBankData, IAsyncStatus, ICITY_DATA } from 'src/types';
import { BANK_API_URL, DEFAULT_CITY_DROPDOWN_DATA, DEFAULT_LISTINGS_PER_PAGE } from 'src/utils/constants';
import ApiCaller from 'src/ApiCaller/ApiCaller';

interface IAllBanksProps {
	rowsPerPage?: number;
}
interface IAllBanksState {
	asyncStatus: IAsyncStatus;
	currentPageNumber: number;
	dropDownCategory: string[];
	dropDownCity: ICITY_DATA[];
	filteredData: IBankData[];
	selectedCategory?: string;
	searchedText?: string;
	selectedCity: ICITY_DATA;
}

enum DROPDOWN_FIELD_TYPE {
	CATEGORY = 'CATEGORY',
	CITY = 'CITY'
}

export default class AllBanksPage extends React.PureComponent<IAllBanksProps, IAllBanksState> {
	cityBankData: IBankData[] = [];

	constructor(props: IAllBanksProps) {
		super(props);
		this.state = {
			asyncStatus: IAsyncStatus.LOADING,
			currentPageNumber: 0,
			filteredData: [],
			dropDownCity: DEFAULT_CITY_DROPDOWN_DATA,
			dropDownCategory: [],
			selectedCity: DEFAULT_CITY_DROPDOWN_DATA[0]
		};
	}

	handleDropDownChange = (dropdDownType: DROPDOWN_FIELD_TYPE) => (value: ICITY_DATA | string) => {
		switch (dropdDownType) {
			case DROPDOWN_FIELD_TYPE.CITY: {
				const finalValue = value as ICITY_DATA;

				this.setState(
					{
						selectedCity: finalValue
					},
					() => {
						this.getCityData(finalValue.value);
					}
				);
			}
			case DROPDOWN_FIELD_TYPE.CATEGORY:
			default: {
				this.setState({
					selectedCategory: value as string
				});
			}
		}
	};

	handleSearchedTextChange = (value: string) => {
		this.setState({
			searchedText: value
		});
	};

	getFilteredBankData = () => {
		const { rowsPerPage = DEFAULT_LISTINGS_PER_PAGE } = this.props;
		const { selectedCategory, searchedText, currentPageNumber } = this.state;

		if (!searchedText || !selectedCategory) {
			return this.cityBankData.slice(rowsPerPage * currentPageNumber, rowsPerPage * (currentPageNumber + 1));
		}

		return this.cityBankData.filter(data => data[selectedCategory].search(searchedText));
	};

	intialiseState = () => {
		const categories = Object.keys(this.cityBankData[0]);
		const filteredData = this.getFilteredBankData();

		this.setState({
			dropDownCategory: categories,
			selectedCategory: categories[0],
			filteredData
		});
	};

	getCityData = async (cityName: string) => {
		const requestUrl = `${BANK_API_URL}?city=${cityName}`;

		try {
			const data = await new ApiCaller({ cacheTTL: 30000 }).get({ url: requestUrl });
			this.cityBankData = data;

			this.setState({ asyncStatus: IAsyncStatus.SUCCESS });
		} catch (e) {
			console.log(e);
			this.setState({
				asyncStatus: IAsyncStatus.ERROR
			});
		}
	};

	async componentDidMount() {
		const {
			selectedCity: { value }
		} = this.state;

		this.getCityData(value);
	}

	render(): React.ReactNode {
		return <div>"Helo"</div>;
	}
}
