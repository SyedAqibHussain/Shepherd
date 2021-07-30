import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../images/logo.svg';
import dashboardIcon from '../../images/dashboard.svg';
import dashboardIconHover from '../../images/dashboard-hover.svg';
import notesIcon from '../../images/notes.svg';
import notesIconHover from '../../images/notes-hover.svg';
import userImg from '../../images/user.png';

import './styles.css';

const Sidebar = () => {
	let history = useHistory();

	const [isSelected, setIsSelected] = useState('dashboard');

	const [sidebarHoverState, setSidebarHoverState] = useState([]);

	const handleListItemClick = (name) => {
		setIsSelected(name);

		history.push(`/${name}`);
	};

	const handleHoverEnter = (e) => {
		setSidebarHoverState({ ...sidebarHoverState, id: e.target.id });
	};

	const handleHoverLeave = (e) => {
		setSidebarHoverState({ ...sidebarHoverState, id: '' });
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
						id='dashboard'
						className={
							isSelected === 'dashboard'
								? 'sidenav-icon-div sidenav-active'
								: 'sidenav-icon-div sidenav-inactive'
						}
						onMouseEnter={(e) => handleHoverEnter(e)}
						onMouseLeave={(e) => handleHoverLeave(e)}
						onClick={() => handleListItemClick('dashboard')}
					>
						<img
							src={
								isSelected === 'dashboard' ||
								sidebarHoverState.id === 'dashboard'
									? dashboardIconHover
									: dashboardIcon
							}
							className='sidenav-icon'
							alt='dashboard'
						/>
					</div>
					<div
						id='notes'
						className={
							isSelected === 'notes'
								? 'sidenav-icon-div sidenav-active'
								: 'sidenav-icon-div sidenav-inactive'
						}
						onMouseEnter={(e) => handleHoverEnter(e)}
						onMouseLeave={(e) => handleHoverLeave(e)}
						onClick={() => handleListItemClick('notes')}
					>
						<img
							src={
								isSelected === 'notes' || sidebarHoverState.id === 'notes'
									? notesIconHover
									: notesIcon
							}
							className='sidenav-icon'
							alt='notes'
						/>
					</div>
				</div>
				<div className='nav-horiz-line'></div>
			</div>
			<div className='profile-container'>
				<img src={userImg} className='profile-picture' alt='profile' />
			</div>
		</div>
	);
};

export default Sidebar;
