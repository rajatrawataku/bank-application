import * as React from 'react';
import cx from 'classnames';

// @ts-ignore
import styles from './Pagination.module.css';
import DropDown from '../DropDown/DropDown';
import { IDropDownOptionData } from 'src/types';
import { LISTINGS_PER_PAGE, LISTINGS_PER_PAGE_DROPDOWN_OPTIONS } from 'src/utils/constants';

interface IStyleProps {
	ctnClass: string;
}

interface IPaginationProps {
	maxListings: number;
	currentPage: number;
	listingsPerPage: number;
	styleProps?: IStyleProps;
	changePageNumber: (newPageNumber: number) => void;
	changeListingPerPage: (value: IDropDownOptionData) => void;
	selectedRowsPerPage: IDropDownOptionData;
}

enum ActionType {
	'BACK' = 'back',
	'FORWARD' = 'forward'
}

export default function Pagination(props: IPaginationProps) {
	const { maxListings, currentPage, listingsPerPage, changePageNumber, changeListingPerPage, selectedRowsPerPage } =
		props;

	const onChangeClickHandler = (actionType: ActionType) => () => {
		switch (actionType) {
			case ActionType.BACK: {
				const newPageNumber = currentPage - 1;
				if (newPageNumber > 0) {
					changePageNumber(newPageNumber);
				}
				break;
			}
			case ActionType.FORWARD: {
				const newPageNumber = currentPage + 1;
				const maxPageNumber =
					maxListings % listingsPerPage === 0
						? maxListings / listingsPerPage
						: Math.floor(maxListings / listingsPerPage) + 1;

				if (newPageNumber <= maxPageNumber) {
					changePageNumber(newPageNumber);
				}
			}
		}
	};

	const dropChangeHandler = (selectedOption: IDropDownOptionData) => {
		changeListingPerPage(selectedOption);
	};

	const maxListingsIndex = listingsPerPage * currentPage;
	const currentStartListing = listingsPerPage * (currentPage - 1) + 1;
	const currentEndListing = maxListingsIndex > maxListings ? maxListings : maxListingsIndex;

	return (
		<div className={styles['pagination-ctn']}>
			<DropDown
				selectedValue={selectedRowsPerPage}
				placeHolderText={LISTINGS_PER_PAGE}
				options={LISTINGS_PER_PAGE_DROPDOWN_OPTIONS}
				onChangeHandler={dropChangeHandler}
				styleProps={{
					ctnClass: styles['dropdown-ctn']
				}}
			/>
			<span className={styles['rows-per-page-text']}>{`Rows per page: ${listingsPerPage}`}</span>
			<div className={cx(styles['act-btn'], styles['left-btn'])} onClick={onChangeClickHandler(ActionType.BACK)}>
				{'<'}
			</div>
			<span>{`${currentStartListing}-${currentEndListing} of ${maxListings}`}</span>
			<div className={cx(styles['act-btn'], styles['right-btn'])} onClick={onChangeClickHandler(ActionType.FORWARD)}>
				{'>'}
			</div>
		</div>
	);
}
