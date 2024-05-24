import { FaX } from 'react-icons/fa6';
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

	// State that tracks if the confirmation overlay show and to toggle it
	const [showConfirmation, setShowConfirmation] = useState(false);
	const toggleConfirmation = () => {
		setShowConfirmation((prevShowConfirmation) => !prevShowConfirmation);
	};

	// handles when create card button is clicked
	const handleCreateCard = () => {
		toggleConfirmation();
		onAddCard();
	};

	return (
		<div className='new-card-container' onClick={toggleInputModal}>
			{showConfirmation && <ConfirmationForm />}
			{!showConfirmation && (
				<div className='new-card' onClick={(event) => event.stopPropagation()}>
					<FaX
						className='back'
						size={22}
						color='#E5383B'
						onClick={toggleInputModal}
					/>
					<h2>NEW CARD</h2>
					<label htmlFor='title'>Title: </label>
					<input
						type='text'
						placeholder='Title'
						id='title'
						onChange={(e) => setNewTitle(e.target.value)}
					/>

					<label htmlFor='date'>Date: </label>
					<input
						type='date'
						id='date'
						onChange={(e) => setNewDate(e.target.value)}
					/>

					<label htmlFor='start'>Start / End: </label>
					<input
						type='time'
						id='start'
						onChange={(e) => setNewStart(e.target.value)}
					/>
					<input
						type='time'
						id='end'
						onChange={(e) => setNewEnd(e.target.value)}
					/>

					<label htmlFor='location'>Location: </label>
					<input
						type='text'
						placeholder='Location'
						id='location'
						onChange={(e) => setNewLocation(e.target.value)}
					/>

					<label htmlFor='category'>Category: </label>
					<div className='category-and-urgent'>
						<div className='category-select'>
							<select
								id='category'
								onChange={(e) => setNewCategory(e.target.value)}
							>
								<option value=''>----------</option>
								<option value='school'>School</option>
								<option value='work'>Work</option>
								<option value='personal'>Personal</option>
							</select>
						</div>
						<div className='urgent-checkbox'>
							<input
								type='checkbox'
								id='urgent'
								checked={isUrgent}
								onChange={(e) => setIsUrgent(e.target.checked)}
							/>
							<label htmlFor='urgent'>Urgent</label>
						</div>
					</div>

					<button className='add-button' onClick={handleCreateCard}>
						Create Card
					</button>
				</div>
			)}
		</div>
	);
}
