import * as React from 'react';
import cx from 'classnames';
import { IBankData } from 'src/types';
import { CATEGORY_KEY_MAPPER } from 'src/utils/constants';

// @ts-ignore
import styles from './BankTable.module.css';

interface IBankDataProps {
	data: IBankData[];
	header: string[];
	onBankClick: (bank_code: string, bankData: IBankData) => void;
}

export default function BankTable(props: IBankDataProps) {
	const { data, header } = props;
	const maxRow = data.length - 1;
	const maxColumn = header.length - 1;

	const handleTableClick = event => {
		const ifsccode = event.target?.dataset?.ifsccode;
		const rowindex = event.target?.dataset?.rowindex;

		if (ifsccode && rowindex !== undefined) {
			props.onBankClick(ifsccode, data[Number(rowindex)]);
		}
	};

	return (
		<div className={styles['bank-data-ctn']}>
			<table className={styles['table']} onClick={handleTableClick}>
				<thead>
					<tr className={styles['table-row']}>
						{header.map((headData, columnNumber) => (
							<td
								key={columnNumber}
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
						const bankCode = rowData['ifsc'];

						return (
							<tr key={`${rowData['bank_id']}-${bankCode}`} className={cx(styles['table-row'])}>
								{header.map((headData, columnNumber) => (
									<td
										data-ifsccode={bankCode}
										data-rowindex={rowNumber}
										key={columnNumber}
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
