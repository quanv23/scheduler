import { BsPencilSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditCardModal from './EditCardModal';
import './styles/card.css';

export default function Card(props) {
	// Deconstructing card properties
	const {
		id,
		title,
		category,
		date,
		start,
		end,
		location,
		isImportant,
		deleteCard,
		updateCard,
	} = props;

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const toggleDelete = () => {
		setShowDeleteModal((prevShowDeleteModal) => !prevShowDeleteModal);
	};

	// State that toggles whether to show edit card modal
	const [showEditCardModal, setShowEditCardModal] = useState(false);
	const toggleEditModal = () => {
		setShowEditCardModal((prevShowEditCardModal) => !prevShowEditCardModal);
	};

	// Picks border colour depending on the category of the card
	function pickColour() {
		if (category.toLowerCase() === 'school') {
			return '#9d4edd';
		} else if (category.toLowerCase() === 'work') {
			return '#0066ff';
		} else if (category.toLowerCase() === 'personal') {
			return '#95d5b2';
		} else {
			return '#ffffff';
		}
	}

	// Picks border style depending on importance
	function pickBorderStyle() {
		return isImportant ? 'dashed' : 'solid';
	}

	return (
		<div
			id='card'
			style={{ border: `3px ${pickBorderStyle()} ${pickColour()}` }}
		>
			<div id='card-text'>
				<h2 className='card-info'>{title}</h2>
				<p className='card-info'>
					{date} | {start} - {end}
				</p>
				<p id='card-location' className='card-info'>
					{location}
				</p>
			</div>
			<div id='card-img'>
				<BsPencilSquare
					id='card-edit'
					size={22.5}
					color={pickColour()}
					onClick={toggleEditModal}
				/>
				<FaTrashAlt
					id='card-trash'
					size={22.5}
					color={pickColour()}
					onClick={toggleDelete}
				/>
			</div>
			{showDeleteModal && (
				<DeleteConfirmationModal
					id={id}
					toggleDelete={toggleDelete}
					deleteCard={deleteCard}
				/>
			)}
			{showEditCardModal && (
				<EditCardModal
					id={id}
					title={title}
					date={date}
					start={start}
					end={end}
					category={category}
					location={location}
					isImportant={isImportant}
					toggleEditModal={toggleEditModal}
					updateCard={updateCard}
				/>
			)}
		</div>
	);
}
