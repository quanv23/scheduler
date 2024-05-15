import { FaX } from 'react-icons/fa6';
import React from 'react';

export default function NewCardForm(props) {
	const { toggleInputForm } = props;
	return (
		<div className='new-card-container' onClick={toggleInputForm}>
			<div className='new-card' onClick={(event) => event.stopPropagation()}>
				<FaX
					className='back'
					size={22}
					color='#E5383B'
					onClick={toggleInputForm}
				/>
				<h2>NEW CARD</h2>
				<label htmlFor='title'>Title: </label>
				<input type='text' placeholder='Title' id='title' />

				<label htmlFor='date'>Date: </label>
				<input type='date' id='date' />

				<label htmlFor='start'>Start / End: </label>
				<input type='time' id='start' />
				<input type='time' id='end' />

				<label htmlFor='location'>Location: </label>
				<input type='text' placeholder='Location' id='location' />

				<label htmlFor='category'>Category: </label>
				<div className='category-and-urgent'>
					<div className='category-select'>
						<select id='category'>
							<option value=''>----------</option>
							<option value='school'>School</option>
							<option value='work'>Work</option>
							<option value='personal'>Personal</option>
						</select>
					</div>
					<div className='urgent-checkbox'>
						<input type='checkbox' id='urgent' />
						<label htmlFor='urgent'>Urgent</label>
					</div>
				</div>

				<button className='add-button'>Create Card</button>
			</div>
		</div>
	);
}
