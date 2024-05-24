import { FaTrashAlt } from 'react-icons/fa';
import React from 'react';

import './styles/deleteConfirmationModal.css';

export default function DeleteConfirmationModal(props) {
	// Deconstructing properties for deleting cards
	const { id, toggleDelete, deleteCard } = props;

	return (
		<div className='delete-container' onClick={toggleDelete}>
			<div
				className='delete-modal'
				onClick={(event) => event.stopPropagation()}
			>
				<FaTrashAlt className='delete-trash' color='#E5383B' size={100} />
				<h2>Are you sure?</h2>
				<div className='delete-btn-container'>
					<button className='delete-cancel' onClick={toggleDelete}>
						Cancel
					</button>
					<button className='delete-confirm' onClick={() => deleteCard(id)}>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
}
