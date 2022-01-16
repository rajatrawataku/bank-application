import * as React from 'react';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';

import { IBankData, IAsyncStatus, IDropDownOptionData } from 'src/types';
import {
	ALL_BANKS_TEXT,
	BANK_API_URL,
	CATEGORY_KEY_MAPPER,
	DEFAULT_CATEGORY_TO_SHOW,
	DEFAULT_CITY_DROPDOWN_DATA,
	DEFAULT_LISTINGS_PER_PAGE,
	FETCHING_DATA,
	NO_BANK,
	RETRY,
	SEARCH_INPUT_DELAY,
	SEARCH_TEXT,
	SELECT_CATEGORY,
	SELECT_CITY
} from 'src/utils/constants';
import ApiCaller from 'src/ApiCaller/ApiCaller';

// @ts-ignore
import styles from './AllBanksPage.module.css';
import DropDown from 'src/components/DropDown/DropDown';
import DebouncedInput from 'src/components/DebouncedInput/DebouncedInput';
import Pagination from 'src/components/Pagination/Pagination';
import BankTable from 'src/components/BankTable/BankTable';

interface IAllBanksProps {
	rowsPerPage?: number;
	history: {
		push: (url: string) => void;
	};
	changeBank: (value: IBankData) => void;
}
interface IAllBanksState {
	asyncStatus: IAsyncStatus;
	currentPageNumber: number;
	dropDownCategory: IDropDownOptionData[];
	dropDownCity: IDropDownOptionData[];
	selectedCategory?: IDropDownOptionData;
	searchedText?: string;
	selectedCity: IDropDownOptionData;
}

enum DROPDOWN_FIELD_TYPE {
	CATEGORY = 'CATEGORY',
	CITY = 'CITY'
}

export class AllBanksPage extends React.PureComponent<IAllBanksProps, IAllBanksState> {
	apiCaller = new ApiCaller({ cacheTTL: 30000 });
	cityBankData: IBankData[] = [];
	filterdCityBankData: IBankData[] = [];

	constructor(props: IAllBanksProps) {
		super(props);
		this.state = this.getInitialiseState();
	}

	getInitialiseState = () => {
		const categories = DEFAULT_CATEGORY_TO_SHOW.map(key => ({
			value: key,
			text: CATEGORY_KEY_MAPPER[key]
		}));

		return {
			asyncStatus: IAsyncStatus.LOADING,
			currentPageNumber: 1,
			dropDownCity: DEFAULT_CITY_DROPDOWN_DATA,
			selectedCity: DEFAULT_CITY_DROPDOWN_DATA[0],
			dropDownCategory: categories,
			selectedCategory: categories[0],
			searchedText: ''
		};
	};

	handleDropDownChange = (dropdDownType: DROPDOWN_FIELD_TYPE) => (value: IDropDownOptionData) => {
		switch (dropdDownType) {
			case DROPDOWN_FIELD_TYPE.CITY: {
				this.setState(
					{
						...this.getInitialiseState(),
						selectedCity: value
					},
					this.getCityData
				);
				break;
			}
			case DROPDOWN_FIELD_TYPE.CATEGORY:
			default: {
				this.setState({
					currentPageNumber: 1,
					selectedCategory: value
				});
			}
		}
	};

	handleSearchedTextChange = (value: string) => {
		this.setState({
			searchedText: value,
			currentPageNumber: 1
		});
	};

	handlePageNumberChange = (newPageNumber: number) => {
		this.setState({
			currentPageNumber: newPageNumber
		});
	};

	setFilteredBankData = () => {
		const { selectedCategory, searchedText } = this.state;

		if (!searchedText || !selectedCategory) {
			this.filterdCityBankData = this.cityBankData;
			return;
		}

		this.filterdCityBankData = this.cityBankData.filter(data => {
			const value = data[selectedCategory.value];
			if (typeof value === 'number') {
				return value === Number(searchedText);
			} else {
				return value.search(searchedText) !== -1;
			}
		});
	};

	getCityData = async () => {
		const {
			selectedCity: { value }
		} = this.state;

		const requestUrl = `${BANK_API_URL}?city=${value}`;

		try {
			const data = await this.apiCaller.get({ url: requestUrl });
			this.cityBankData = data;

			this.setState({
				asyncStatus: IAsyncStatus.SUCCESS
			});
		} catch (e) {
			this.setState({
				asyncStatus: IAsyncStatus.ERROR
			});
		}
	};

	getData = () => {
		const { selectedCity } = this.state;
		this.setState(
			{
				...this.getInitialiseState(),
				selectedCity
			},
			this.getCityData
		);
	};

	componentDidMount() {
		this.getCityData();
	}

	moveToBankDetailsPage = (bank_ifsc_code: string, bankData: IBankData) => {
		this.props.changeBank(bankData);
		this.props.history.push(`/bank-details/${bank_ifsc_code}`);
	};

	render(): React.ReactNode {
		const { asyncStatus } = this.state;

		switch (asyncStatus) {
			case IAsyncStatus.LOADING: {
				return (
					<div className={cx(styles['error-ctn'], styles['loader-ctn'])}>
						<h2>{FETCHING_DATA}</h2>
					</div>
				);
			}
			case IAsyncStatus.SUCCESS: {
				this.setFilteredBankData();

				const { dropDownCity, dropDownCategory, selectedCity, selectedCategory, currentPageNumber } = this.state;
				const { rowsPerPage = DEFAULT_LISTINGS_PER_PAGE } = this.props;

				const currentShownData = this.filterdCityBankData.slice(
					rowsPerPage * (currentPageNumber - 1),
					rowsPerPage * currentPageNumber
				);

				return (
					<div className={cx('row', styles['banks-page-ctn'])}>
						<div className={cx('col-3-12', styles['left-ctn'])}></div>
						<div className={cx('col-9-12', styles['right-ctn'])}>
							<div className={styles['header']}>
								<h2>{ALL_BANKS_TEXT}</h2>
								<div className={styles['intereaction-ctn']}>
									<DropDown
										placeHolderText={SELECT_CITY}
										onChangeHandler={this.handleDropDownChange(DROPDOWN_FIELD_TYPE.CITY)}
										options={dropDownCity}
										selectedValue={selectedCity}
										styleProps={{
											selectInputClass: styles['select-input']
										}}
									/>
									{dropDownCategory.length > 0 && (
										<DropDown
											placeHolderText={SELECT_CATEGORY}
											onChangeHandler={this.handleDropDownChange(DROPDOWN_FIELD_TYPE.CATEGORY)}
											options={dropDownCategory}
											selectedValue={selectedCategory}
											styleProps={{
												selectInputClass: styles['select-input']
											}}
										/>
									)}
									<DebouncedInput
										placeholderText={SEARCH_TEXT}
										onChangeHandler={this.handleSearchedTextChange}
										delay={SEARCH_INPUT_DELAY}
										styleProps={{
											textClass: styles['text-input']
										}}
									/>
								</div>
							</div>
							{this.filterdCityBankData.length > 0 ? (
								<React.Fragment>
									<BankTable
										onBankClick={this.moveToBankDetailsPage}
										data={currentShownData}
										header={DEFAULT_CATEGORY_TO_SHOW}
									/>
									<Pagination
										maxListings={this.filterdCityBankData.length}
										listingsPerPage={rowsPerPage}
										currentPage={currentPageNumber}
										changePageNumber={this.handlePageNumberChange}
									/>
								</React.Fragment>
							) : (
								<div className={cx(styles['error-ctn'], styles['no-bank-ctn'])}>
									<h3>{NO_BANK}</h3>
								</div>
							)}
						</div>
					</div>
				);
			}

			case IAsyncStatus.ERROR: {
				return (
					<div className={cx(styles['error-ctn'], styles['no-bank-ctn'])}>
						<h3>{NO_BANK}</h3>
						<button onClick={this.getCityData}>
							<h3>{RETRY}</h3>
						</button>
					</div>
				);
			}
		}
	}
}

export default withRouter(AllBanksPage);
