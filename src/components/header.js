import { FaPlus } from 'react-icons/fa';
import { TiThMenu } from 'react-icons/ti';
import React from 'react';

export default function Header() {
	return (
		<header className='header'>
			<h2 className='header-title'>Scheduler</h2>
			<FaPlus className='header-add' size={25} color='#E5383B' />
			<TiThMenu className='header-nav' size={25} color='#E5383B' />
		</header>
	);
}
