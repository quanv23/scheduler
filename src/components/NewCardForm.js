import { FaX } from 'react-icons/fa6';
import React from 'react';

export default function NewCardForm(props) {
	const { toggleInputForm } = props;
	return (
		<div className='new-card-container'>
			<div className='new-card' onClick={(event) => event.stopPropagation()}>
				<FaX
					className='back'
					size={22}
					color='#E5383B'
					onClick={toggleInputForm}
				/>
				<h2>NEW CARD</h2>
				<h4>Title</h4>
				<input type='text' placeholder='Title' />
				<h4>Date</h4>
				<input type='date' />
				<h4>Start / End</h4>
				<input type='time' />
				<input type='time' />
				<h4>Location</h4>
				<input type='text' placeholder='location' />
				<h4>Category</h4>
				<select>
					<option value=''>Category</option>
					<option value='school'>School</option>
					<option value='work'>Work</option>
					<option value='personal'>Personal</option>
				</select>
				<div className='urgent-checkbox'>
					<input type='checkbox' />
					<h4>Urgent</h4>
				</div>
				<button className='add-button'>Add</button>
			</div>
		</div>
	);
}
