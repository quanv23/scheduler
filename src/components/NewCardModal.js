import React, { useState } from 'react';
import ConfirmationForm from './ConfirmationModal';
import './styles/newCardModal.css';

export default function NewCardModal(props) {
	// Deconstructing props
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
		categoryList,
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
	const handleCreateCard = (e) => {
		e.preventDefault();
		onAddCard();
		toggleConfirmation();
		resetForm();
	};

	// Cretes options for select based on all created categories
	const categoryOptions = categoryList.map((category) => {
		return (
			<option key={category.id} value={category.category}>
				{category.category}
			</option>
		);
	});

	return (
		<div id='new-card-container' onClick={toggleInputModal}>
			{showConfirmation && <ConfirmationForm />}
			{!showConfirmation && (
				<form
					id='new-card-modal'
					autoComplete='off'
					onClick={(event) => event.stopPropagation()}
					onSubmit={handleCreateCard}
				>
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
							type='text'
							placeholder='yyyy-mm-dd'
							id='date'
							onChange={(e) => setNewDate(e.target.value)}
							pattern='\d\d\d\d-\d\d-\d\d'
						/>
					</div>
					<div className='label-input-container'>
						<label htmlFor='start'>Start / End: </label>
						<div className='flex-input'>
							<input
								type='text'
								placeholder='hh:mm'
								id='start'
								onChange={(e) => setNewStart(e.target.value)}
								pattern='\d\d:\d\d'
							/>
							<input
								type='text'
								placeholder='hh:mm'
								id='end'
								onChange={(e) => setNewEnd(e.target.value)}
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
								<option value=''>Empty</option>
								{categoryOptions}
							</select>
							<div id='urgent-container'>
								<input
									type='checkbox'
									id='urgent'
									checked={isUrgent}
									onChange={(e) => setIsUrgent(e.target.checked)}
								/>
								<label htmlFor='urgent'>Important</label>
							</div>
						</div>
					</div>

					<button id='add-button' type='submit'>
						Create Card
					</button>
				</form>
			)}
		</div>
	);
}
