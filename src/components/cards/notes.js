import React from 'react';

import plusCircle from '../../images/plus-circle.svg';
import plusCircleHover from '../../images/plus-circle-hover.svg';
import clipboardIcon from '../../images/clipboard.svg';

const NotesCard = ({
	note,
	hoverState,
	handleNoteChange,
	handleHoverEnter,
	handleHoverLeave,
}) => {
	return (
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
						maxLength='500'
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
							hoverState.id === 'notes-button' ? plusCircleHover : plusCircle
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
	);
};

export default NotesCard;
