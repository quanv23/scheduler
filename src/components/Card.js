import { BsPencilSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import React from 'react';

export default function Card() {
	return (
		<div className='card'>
			<BsPencilSquare className='card-edit' size={20} color='E5383B' />
			<FaTrashAlt className='card-trash' size={20} color='E5383B' />
			<h2 className='card-title'>Crochet Club</h2>
			<p className='card-date'>Thu. Feb. 15 | 3pm - 5pm</p>
			<p className='card-location'>McMaster University</p>
		</div>
	);
}
