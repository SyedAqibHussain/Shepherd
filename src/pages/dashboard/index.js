import React, { useState, useEffect } from 'react';
import fire from '../../fire';

import './styles.css';

import AgendaCard from '../../components/cards/agenda';
import NotesCard from '../../components/cards/notes';
import LocationCard from '../../components/cards/location';

const DashboardPage = () => {
	const [showAgenda, setShowAgenda] = useState(true);

	const [items, setItems] = useState([]);

	const [note, setNote] = useState('');

	const [userCountry, setUserCountry] = useState('');
	const [userContinent, setUserContinent] = useState('');

	const [hoverState, setHoverState] = useState([]);

	useEffect(() => {
		getUserGeolocationDetails();
		getNotesData();
		getAgendaData();
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

	const getAgendaData = () => {
		fire
			.database()
			.ref(`tasks`)
			.get()
			.then((snapshot) => {
				if (snapshot.exists()) {
					setItems(snapshot.val());
				} else {
					console.log('72 No data available');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const getNotesData = () => {
		fire
			.database()
			.ref(`notes`)
			.get()
			.then((snapshot) => {
				if (snapshot.exists()) {
					setNote(snapshot.val().note);
				} else {
					setNote('Enter note here');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleNoteChange = (e) => {
		setNote(e.target.value);
		fire.database().ref(`notes`).update({ note: e.target.value });
	};

	const handleHoverEnter = (e) => {
		setHoverState({ ...hoverState, id: e.target.id });
	};

	const handleHoverLeave = (e) => {
		setHoverState({ ...hoverState, id: '' });
	};

	const handleAgendaCollapse = () => {
		setShowAgenda(!showAgenda);
	};

	const handleAddTask = () => {
		fire
			.database()
			.ref(`tasks`)
			.update([...items, { id: items.length + 1, isChecked: false }]);

		setItems((items) => [
			...items,
			{
				id: items.length + 1,
				isChecked: false,
			},
		]);
	};

	const handleTaskChecked = (id) => {
		fire.database().ref(`tasks/${id}`).update({
			isChecked: !items[id].isChecked,
		});

		const newItems = [...items];
		newItems[id].isChecked = !newItems[id].isChecked;
		setItems(newItems);
	};

	return (
		<div className='dashboard-container'>
			<h1 className='header'>Dashboard</h1>
			<div className='cards-conatiner'>
				{/* Agenda card start */}
				<AgendaCard
					showAgenda={showAgenda}
					items={items}
					hoverState={hoverState}
					handleAgendaCollapse={handleAgendaCollapse}
					handleTaskChecked={handleTaskChecked}
					handleHoverEnter={handleHoverEnter}
					handleHoverLeave={handleHoverLeave}
					handleAddTask={handleAddTask}
				/>
				{/* Agenda card end */}

				{/* Notes card start */}
				<NotesCard
					note={note}
					hoverState={hoverState}
					handleNoteChange={handleNoteChange}
					handleHoverEnter={handleHoverEnter}
					handleHoverLeave={handleHoverLeave}
				/>
				{/* Notes card end */}

				{/* Location card start */}
				<LocationCard userCountry={userCountry} userContinent={userContinent} />
				{/* Location card end */}
			</div>
		</div>
	);
};

export default DashboardPage;
