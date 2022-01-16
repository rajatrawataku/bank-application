import * as React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AllBanksPage from './pages/AllBanksPage/AllBanksPage';
import SingeBankPage from './pages/SingleBankPage/SingeBankPage';
import { BankDetailsContext } from 'src/utils/contextStore';

function App() {
	const [selectedBank, changeBank] = React.useState(undefined);

	return (
		<div className={'app-container'}>
			<BankDetailsContext.Provider value={selectedBank}>
				<Router>
					<Switch>
						<Route exact path="/">
							<Redirect to="/all-banks" />
						</Route>
						<Route path="/all-banks">
							<AllBanksPage changeBank={changeBank} />
						</Route>
						<Route path="/bank-details/:ifsc_code">
							<SingeBankPage />
						</Route>
					</Switch>
				</Router>
			</BankDetailsContext.Provider>
		</div>
	);
}

export default App;
