import { FaRegCheckCircle } from 'react-icons/fa';
import React from 'react';
import './styles/confirmationModal.css';

export default function ConfirmationModal() {
	return (
		<div id='confirmation-modal'>
			<FaRegCheckCircle
				className='confirmation-check'
				color='#a7c957'
				size={100}
			/>
			<h2>Card Confirmed</h2>
			<p>Hopefully, I don't actually know</p>
		</div>
	);
}
