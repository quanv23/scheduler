import { FaTrashAlt } from 'react-icons/fa';
import React from 'react';

import './styles/deleteConfirmationModal.css';

export default function DeleteConfirmationModal(props) {
	// Deconstructing properties for deleting cards
	const { id, toggleDelete, deleteCard } = props;

	return (
		<div id='delete-container' onClick={toggleDelete}>
			<div id='delete-modal' onClick={(event) => event.stopPropagation()}>
				<FaTrashAlt color='#E5383B' size={100} />
				<h2>Are you sure?</h2>
				<div id='delete-btn-container'>
					<button
						className='delete-btn'
						id='delete-cancel'
						onClick={toggleDelete}
					>
						Cancel
					</button>
					<button
						className='delete-btn'
						id='delete-confirm'
						onClick={() => deleteCard(id)}
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
}
