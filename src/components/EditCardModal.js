import React, { useState } from 'react';
import ConfirmationForm from './ConfirmationModal';
import './styles/newCardModal.css';

export default function EditCardModal(props) {
	const {
		id,
		title,
		date,
		start,
		end,
		location,
		category,
		isImportant,
		toggleEditModal,
		updateCard,
	} = props;

	// State that tracks if the confirmation overlay show and to toggle it
	const [showConfirmation, setShowConfirmation] = useState(false);
	const toggleConfirmation = () => {
		setShowConfirmation((prevShowConfirmation) => !prevShowConfirmation);
	};

	// States that track updated fields for cards
	const [updatedTitle, setUpdatedTitle] = useState(title);
	const [updatedDate, setUpdatedDate] = useState(date);
	const [updatedStart, setUpdatedStart] = useState(start);
	const [updatedEnd, setUpdatedEnd] = useState(end);
	const [updatedLocation, setUpdatedLocation] = useState(location);
	const [updatedCategory, setUpdatedCategory] = useState(category);
	const [updatedIsUrgent, setUpdatedIsUrgent] = useState(isImportant);

	const handleUpdateCard = (e) => {
		e.preventDefault();
		updateCard(id, {
			title: updatedTitle,
			date: updatedDate,
			start: updatedStart,
			end: updatedEnd,
			location: updatedLocation,
			category: updatedCategory,
			isImportant: updatedIsUrgent,
		});
		toggleConfirmation();
	};

	return (
		<div id='new-card-container' onClick={toggleEditModal}>
			{showConfirmation && <ConfirmationForm />}
			{!showConfirmation && (
				<form
					id='new-card-modal'
					autoComplete='off'
					onClick={(event) => event.stopPropagation()}
					onSubmit={handleUpdateCard}
					style={{ border: '3px solid #f48c06' }}
				>
					<h2>EDIT CARD</h2>
					<div className='label-input-container'>
						<label htmlFor='title'>Title: </label>
						<input
							type='text'
							placeholder='Title'
							id='title'
							onChange={(e) => setUpdatedTitle(e.target.value)}
							value={updatedTitle}
						/>
					</div>
					<div className='label-input-container'>
						<label htmlFor='date'>Date: </label>
						<input
							type='text'
							placeholder='mm-dd-yyyy'
							id='date'
							onChange={(e) => setUpdatedDate(e.target.value)}
							value={updatedDate}
							pattern='\d\d-\d\d-\d\d\d\d'
						/>
					</div>
					<div className='label-input-container'>
						<label htmlFor='start'>Start / End: </label>
						<div className='flex-input'>
							<input
								type='text'
								placeholder='hh:mm'
								id='start'
								onChange={(e) => setUpdatedStart(e.target.value)}
								value={updatedStart}
								pattern='\d\d:\d\d'
							/>
							<input
								type='text'
								placeholder='hh:mm'
								id='end'
								onChange={(e) => setUpdatedEnd(e.target.value)}
								value={updatedEnd}
								pattern='\d\d:\d\d'
							/>
						</div>
					</div>
					<div className='label-input-container'>
						<label htmlFor='location'>Location: </label>
						<input
							type='text'
							placeholder='Location'
							id='location'
							onChange={(e) => setUpdatedLocation(e.target.value)}
							value={updatedLocation}
						/>
					</div>

					<div className='label-input-container'>
						<label htmlFor='category'>Category: </label>
						<div id='category-urgent-container'>
							<select
								id='category'
								onChange={(e) => setUpdatedCategory(e.target.value)}
								value={updatedCategory}
							>
								<option value=''>----------</option>
								<option value='school'>School</option>
								<option value='work'>Work</option>
								<option value='personal'>Personal</option>
							</select>
							<div id='urgent-container'>
								<input
									type='checkbox'
									id='urgent'
									checked={updatedIsUrgent}
									onChange={(e) => setUpdatedIsUrgent(e.target.checked)}
								/>
								<label htmlFor='urgent'>Important</label>
							</div>
						</div>
					</div>

					<button
						id='add-button'
						type='submit'
						style={{ backgroundColor: '#f48c06' }}
					>
						Update Card
					</button>
				</form>
			)}
		</div>
	);
}
