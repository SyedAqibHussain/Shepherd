import React, { useState, useEffect } from 'react';
import fire from '../../fire';

import './styles.css';

import agendaIcon from '../../images/dashboard.svg';
import questionMark from '../../images/question.svg';
import arrowUp from '../../images/arrow-up.svg';
import arrowDown from '../../images/arrow-down.svg';

import plusCircle from '../../images/plus-circle.svg';
import plusCircleHover from '../../images/plus-circle-hover.svg';

import clipboardIcon from '../../images/clipboard.svg';

const DashboardPage = () => {
	const [tasks, setTasks] = useState([
		{ id: 1, isChecked: false },
		{ id: 2, isChecked: false },
		{ id: 3, isChecked: false },
	]);

	const [items, setItems] = useState([
		{
			id: 1,
			isChecked: 'false',
		},
		{
			id: 2,
			isChecked: 'false',
		},
		{
			id: 3,
			isChecked: 'false',
		},
	]);

	// setTasks((result) => [...result, response]);

	const [note, setNote] = useState('');

	const [userCountry, setUserCountry] = useState('');
	const [userContinent, setUserContinent] = useState('');

	const [hoverState, setHoverState] = useState([]);

	useEffect(() => {
		getUserGeolocationDetails();
		getData();
	}, []);

	const getUserGeolocationDetails = () => {
		fetch(
			'https://api.geoapify.com/v1/ipinfo?&apiKey=6d04c6e3591f44ca909bd501b42c0c34',
			{ method: 'GET' }
		)
			.then((response) => response.json())
			.then((result) => {
				setUserCountry(result?.country?.name);
				setUserContinent(result?.continent?.name);
			})
			.catch((error) => console.log('error', error));
	};

	const getData = () => {
		fire
			.database()
			.ref(`notes`)
			.get()
			.then((snapshot) => {
				if (snapshot.exists()) {
					console.log('101', snapshot.val());
					setNote(snapshot.val().note);
				} else {
					console.log('No data available');
					setNote('Enter note here');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleNoteChange = (e) => {
		setNote(e.target.value);
		console.log('41 e', e.target.value);
		fire.database().ref(`notes`).update({ note: e.target.value });
	};

	const handleHoverEnter = (e) => {
		console.log('88 entered', e.target.id);
		setHoverState({ ...hoverState, id: e.target.id });
	};

	const handleHoverLeave = (e) => {
		console.log('88 left', e.target.id);
		setHoverState({ ...hoverState, id: '' });
	};

	console.log('100 hoverState', hoverState);

	return (
		<div className='dashboard-container'>
			<h1 className='header'>Dashboard</h1>
			<div className='cards-conatiner'>
				{/* Agenda card start */}
				<div className='card'>
					<div className='card-header agenda-card-header'>
						<div className='card-header-left-div'>
							<img src={agendaIcon} className='card-icon' alt='agenda' />
							<h2 className='card-title'>Agenda</h2>
							<div class='tooltip'>
								<img
									src={questionMark}
									className='question-icon'
									alt='helper'
								/>
								<p class='tooltiptext'>Help me understand</p>
							</div>
						</div>
						<img src={arrowUp} className='card-arrow' alt='expand' />
						{/* <img src={arrowDown} className='card-arrow' alt='collapse' /> */}
					</div>
					{console.log('88 tasks', tasks)}
					<div className='card-body'>
						<div className='note-div'>
							{items.map((item) => (
								// <li key={item.id}>
								// 	{item.id} {item.isChecked}
								// </li>
								<div className='checklist-div'>
									<input
										type='checkbox'
										className='checklist-input'
										id='tuesday'
										value='tuesday'
										// onChange={this.handleCheckboxChange}
									/>
									<label className='checklist-label' htmlFor='tuesday'>
										Task {item.id}
									</label>
								</div>
							))}
						</div>
					</div>
					<div className='card-footer'>
						<button
							className={
								hoverState.id === 'agenda-button'
									? 'card-button active'
									: 'card-button'
							}
							id='agenda-button'
							onMouseEnter={(e) => handleHoverEnter(e)}
							onMouseLeave={(e) => handleHoverLeave(e)}
						>
							<img
								src={
									hoverState.id === 'agenda-button'
										? plusCircleHover
										: plusCircle
								}
								className='button-icon'
								alt='button-icon'
							/>
							<h2
								className={
									hoverState.id === 'agenda-button'
										? 'button-text active'
										: 'button-text'
								}
							>
								Add Checkbox
							</h2>
						</button>
					</div>
				</div>
				{/* Agenda card end */}

				{/* Notes card start */}
				<div className='card'>
					<div className='card-header'>
						<img src={clipboardIcon} className='card-icon' alt='agenda' />
						<h2 className='card-title'>Personal Notes</h2>
					</div>
					<div className='card-body'>
						<div className='notes-div'>
							<textarea
								className='note-div'
								placeholder='Enter note here'
								onChange={handleNoteChange}
								value={note}
								maxlength='500'
							/>
						</div>
						<p className='notes-warning'>Max 500 characters</p>
					</div>
					<div className='card-footer'>
						<button
							className={
								hoverState.id === 'notes-button'
									? 'card-button active'
									: 'card-button'
							}
							id='notes-button'
							onMouseEnter={(e) => handleHoverEnter(e)}
							onMouseLeave={(e) => handleHoverLeave(e)}
						>
							<img
								src={
									hoverState.id === 'notes-button'
										? plusCircleHover
										: plusCircle
								}
								className='button-icon'
								alt='button-icon'
							/>
							<h2
								className={
									hoverState.id === 'notes-button'
										? 'button-text active'
										: 'button-text'
								}
							>
								Check Hover State
							</h2>
						</button>
					</div>
				</div>
				{/* Notes card end */}

				{/* Location card start */}
				<div className='card'>
					<div className='card-header'>
						<img src={clipboardIcon} className='card-icon' alt='agenda' />
						<h2 className='card-title'>Your Location</h2>
					</div>
					<div className='card-body'>
						<div className='notes-div'>
							<p>Country : {userCountry}</p>
							<p>Continent : {userContinent}</p>
						</div>
					</div>
				</div>
				{/* Location card end */}
			</div>
		</div>
	);
};

export default DashboardPage;
