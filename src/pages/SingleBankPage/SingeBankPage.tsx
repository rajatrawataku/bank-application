import * as React from 'react';

// @ts-ignore
import styles from './SingleBankPage.module.css';

import { BankDetailsContext } from 'src/utils/contextStore';
import { NO_BANK_DATA } from 'src/utils/constants';

export default function SingleBankPage() {
	const bankData = React.useContext(BankDetailsContext);

	const bankKeys = Object.keys(bankData || {});

	return (
		<div className={styles['single-bank-ctn']}>
			{!bankData ? (
				<h3>{NO_BANK_DATA}</h3>
			) : (
				<table>
					<thead>
						<tr>
							{bankKeys.map(key => {
								return <td>{key}</td>;
							})}
						</tr>
					</thead>
					<tbody>
						<tr>
							{bankKeys.map(key => {
								return <td>{bankData[key]}</td>;
							})}
						</tr>
					</tbody>
				</table>
			)}
		</div>
	);
}
