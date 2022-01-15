import * as React from 'react';
import cx from 'classnames';
import { IBankData } from 'src/types';
import { CATEGORY_KEY_MAPPER } from 'src/utils/constants';

// @ts-ignore
import styles from './BankTable.module.css';

interface IBankDataProps {
	data: IBankData[];
	header: string[];
}

export default function BankTable(props: IBankDataProps) {
	const { data, header } = props;
	const maxRow = data.length - 1;
	const maxColumn = header.length - 1;

	return (
		<div className={styles['bank-data-ctn']}>
			<table className={styles['table']}>
				<thead>
					<tr className={styles['table-row']}>
						{header.map((headData, columnNumber) => (
							<td
								className={cx(styles['table-cell'], styles[`table-cell-${headData}`], {
									[styles['last-column']]: columnNumber === maxColumn
								})}
							>
								{CATEGORY_KEY_MAPPER[headData]}
							</td>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((rowData, rowNumber) => {
						return (
							<tr className={cx(styles['table-row'])}>
								{header.map((headData, columnNumber) => (
									<td
										className={cx(
											styles['table-cell'],
											styles[`table-cell-${headData}`],
											{
												[styles['last-column']]: columnNumber === maxColumn
											},
											{ [styles['last-row']]: rowNumber === maxRow }
										)}
									>
										{rowData[headData]}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
