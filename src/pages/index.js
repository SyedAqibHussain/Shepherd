import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Sidebar from '../components/sidebar';
import DashboardPage from './dashboard';
import NotesPage from './notes';

import './styles.css';

const MainPage = () => {
	return (
		<div className='page-container'>
			<Sidebar />
			<Switch>
				<Redirect exact from={`/`} to={`/dashboard`} />
				<Route exact path={`/dashboard`} component={DashboardPage} />

				{/* <Route exact path={`/`} component={DashboardPage} /> */}
				<Route exact path={`/notes`} component={NotesPage} />
			</Switch>
		</div>
	);
};

export default MainPage;
