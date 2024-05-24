import React, { useState } from 'react';
import ConfirmationForm from './ConfirmationModal';
import './styles/newCardModal.css';

export default function NewCardModal(props) {
	const {
		toggleInputModal,
		onAddCard,
		setNewTitle,
		setNewDate,
		setNewStart,
		setNewEnd,
		setNewLocation,
		setNewCategory,
		setIsUrgent,
		isUrgent,
	} = props;

	const resetForm = () => {
		setNewTitle('');
		setNewDate('');
		setNewStart('');
		setNewEnd('');
		setNewLocation('');
		setNewCategory('');
		setIsUrgent(false);
	};

	// State that tracks if the confirmation overlay show and to toggle it
	const [showConfirmation, setShowConfirmation] = useState(false);
	const toggleConfirmation = () => {
		setShowConfirmation((prevShowConfirmation) => !prevShowConfirmation);
	};

	// Adds card to database, toggles confirmation, and resets the form when create card is clicked
	const handleCreateCard = () => {
		onAddCard();
		toggleConfirmation();
		resetForm();
	};

	return (
		<div id='new-card-container' onClick={toggleInputModal}>
			{showConfirmation && <ConfirmationForm />}
			{!showConfirmation && (
				<div id='new-card-modal' onClick={(event) => event.stopPropagation()}>
					<h2>NEW CARD</h2>
					<div className='label-input-container'>
						<label htmlFor='title'>Title: </label>
						<input
							type='text'
							placeholder='Title'
							id='title'
							onChange={(e) => setNewTitle(e.target.value)}
						/>
					</div>
					<div className='label-input-container'>
						<label htmlFor='date'>Date: </label>
						<input
							type='date'
							id='date'
							onChange={(e) => setNewDate(e.target.value)}
						/>
					</div>
					<div className='label-input-container'>
						<label htmlFor='start'>Start / End: </label>
						<div className='flex-input'>
							<input
								type='text'
								placeholder='Start'
								id='start'
								onChange={(e) => setNewStart(e.target.value)}
							/>
							<input
								type='text'
								placeholder='End'
								id='end'
								onChange={(e) => setNewEnd(e.target.value)}
							/>
						</div>
					</div>
					<div className='label-input-container'>
						<label htmlFor='location'>Location: </label>
						<input
							type='text'
							placeholder='Location'
							id='location'
							onChange={(e) => setNewLocation(e.target.value)}
						/>
					</div>

					<div className='label-input-container'>
						<label htmlFor='category'>Category: </label>
						<div id='category-urgent-container'>
							<select
								id='category'
								onChange={(e) => setNewCategory(e.target.value)}
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
									checked={isUrgent}
									onChange={(e) => setIsUrgent(e.target.checked)}
								/>
								<label htmlFor='urgent'>Urgent</label>
							</div>
						</div>
					</div>

					<button id='add-button' onClick={handleCreateCard}>
						Create Card
					</button>
				</div>
			)}
		</div>
	);
}
