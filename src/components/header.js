import { FaPlus } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa6';
import React from 'react';
import './styles/header.css';

export default function Header(props) {
	const { toggleInputModal } = props;
	return (
		<header id='header'>
			<FaFilter
				className='header-img'
				id='header-nav'
				size={25}
				color='#E5383B'
			/>
			<h2>Scheduler</h2>
			<FaPlus
				className='header-img'
				id='header-add'
				size={25}
				color='#E5383B'
				onClick={toggleInputModal}
			/>
		</header>
	);
}
