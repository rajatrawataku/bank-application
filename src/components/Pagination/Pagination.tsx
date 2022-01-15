import * as React from 'react';
import cx from 'classnames';

// @ts-ignore
import styles from './Pagination.module.css';

interface IStyleProps {
	ctnClass: string;
}

interface IPaginationProps {
	maxListings: number;
	currentPage: number;
	listingsPerPage: number;
	styleProps?: IStyleProps;
	changePageNumber: (newPageNumber: number) => void;
}

enum ActionType {
	'BACK' = 'back',
	'FORWARD' = 'forward'
}

export default function Pagination(props: IPaginationProps) {
	const { maxListings, currentPage, listingsPerPage, changePageNumber } = props;

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

	const maxListingsIndex = listingsPerPage * currentPage;
	const currentStartListing = listingsPerPage * (currentPage - 1) + 1;
	const currentEndListing = maxListingsIndex > maxListings ? maxListings : maxListingsIndex;

	return (
		<div className={styles['pagination-ctn']}>
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
