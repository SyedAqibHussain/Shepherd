import React from 'react';
import clipboardIcon from '../../images/clipboard.svg';

const LocationCard = ({ userCountry, userContinent }) => {
	return (
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
	);
};

export default LocationCard;
