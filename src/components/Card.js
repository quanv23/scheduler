import { BsPencilSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import React from 'react';
import './styles/card.css';

export default function Card(props) {
	// Deconstructing card properties
	const { title, category, date, start, end, location, isImportant } = props;

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
			className='card'
			style={{ border: `3px ${pickBorderStyle()} ${pickColour()}` }}
		>
			<BsPencilSquare className='card-edit' size={20} color={pickColour()} />
			<FaTrashAlt className='card-trash' size={20} color={pickColour()} />
			<h2 className='card-title'>{title}</h2>
			<p className='card-date'>
				{date} | {start} - {end}
			</p>
			<p className='card-location'>{location}</p>
		</div>
	);
}
