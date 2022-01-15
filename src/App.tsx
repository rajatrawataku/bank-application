import * as React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AllBanksPage from './pages/AllBanksPage/AllBanksPage';
import SingeBankPage from './pages/SingeBankPage';

function App() {
	return (
		<div className={'app-container'}>
			<Router>
				<Switch>
					<Route exact path="/">
						<Redirect to="/all-banks" />
					</Route>
					<Route path="/all-banks">
						<AllBanksPage />
					</Route>
					<Route path="/bank-details/:ifsc_code">
						<SingeBankPage />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
