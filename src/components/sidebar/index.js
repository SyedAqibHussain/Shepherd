import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../images/logo.svg';
import dashboardIcon from '../../images/dashboard.svg';
import notesIcon from '../../images/notes.svg';

import './styles.css';

const Sidebar = () => {
	let history = useHistory();

	const [isSelected, setIsSelected] = useState('dashboard');

	const handleListItemClick = (name) => {
		setIsSelected(name);

		history.push(`/${name}`);
	};

	return (
		<div className='sidebar-container'>
			<div className='logo-container'>
				<img src={logo} className='sidenav-logo' alt='logo' />
			</div>
			<div className='nav-items-container'>
				<div className='nav-horiz-line'></div>
				<div className='nav-items-div'>
					<div
						className={
							isSelected === 'dashboard'
								? 'sidenav-icon-div sidenav-active'
								: 'sidenav-icon-div'
						}
						onClick={() => handleListItemClick('dashboard')}
					>
						<img src={dashboardIcon} className='sidenav-icon' alt='dashboard' />
					</div>
					<div
						className={
							isSelected === 'notes'
								? 'sidenav-icon-div sidenav-active'
								: 'sidenav-icon-div'
						}
						onClick={() => handleListItemClick('notes')}
					>
						<img src={notesIcon} className='sidenav-icon' alt='notes' />
					</div>
				</div>
				<div className='nav-horiz-line'></div>
			</div>
			<div className='profile-container'></div>
		</div>
	);
};

export default Sidebar;
