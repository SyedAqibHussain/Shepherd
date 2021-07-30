import React from 'react';
import agendaIcon from '../../images/dashboard-hover.svg';
import questionMark from '../../images/question.svg';
import arrowUp from '../../images/arrow-up.svg';
import arrowDown from '../../images/arrow-down.svg';
import plusCircle from '../../images/plus-circle.svg';
import plusCircleHover from '../../images/plus-circle-hover.svg';

const AgendaCard = ({
	showAgenda,
	items,
	handleAgendaCollapse,
	handleTaskChecked,
	handleHoverEnter,
	handleHoverLeave,
	handleAddTask,
	hoverState,
}) => {
	return (
		<div className={showAgenda ? 'card' : 'card collapsible-card'}>
			<div className='card-header agenda-card-header'>
				<div className='card-header-left-div'>
					<img src={agendaIcon} className='card-icon' alt='agenda' />
					<h2 className='card-title'>Agenda</h2>
					<div className='tooltip'>
						<img src={questionMark} className='question-icon' alt='helper' />
						<p className='tooltiptext'>Help me understand</p>
					</div>
				</div>
				<img
					src={showAgenda ? arrowUp : arrowDown}
					className='card-arrow'
					alt='agenda-collapse'
					onClick={() => handleAgendaCollapse()}
				/>
			</div>
			{showAgenda && (
				<div className='card-collapse-div'>
					<div className='card-body'>
						<div className='note-div'>
							{items.map((item) => (
								<div className='checklist-div' key={item.id}>
									<label className='checkbox-container'>
										<p className='checkbox-text'>Task {item.id}</p>
										<input
											type='checkbox'
											className='checklist-input'
											checked={item.isChecked}
											onChange={() => handleTaskChecked(item.id - 1)}
										/>
										<span className='checkmark'></span>
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
							onClick={() => handleAddTask()}
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
			)}
		</div>
	);
};

export default AgendaCard;
