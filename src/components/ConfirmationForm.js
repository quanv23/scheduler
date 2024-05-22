import { FaX } from 'react-icons/fa6';
import { FaRegCheckCircle } from 'react-icons/fa';
import React from 'react';

import './styles/confirmationForm.css';

export default function ConfirmationForm() {
	return (
		<div className='confirmation-container'>
			<FaRegCheckCircle
				className='confirmation-check'
				color='#a7c957'
				size={100}
			/>
			<h2 className='confirmation-header'>Card Confirmed</h2>
			<p className='confirmation-text'>Hopefully, I don't actually know</p>
		</div>
	);
}
