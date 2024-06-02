import { FaPlus } from 'react-icons/fa';
import { TiThMenu } from 'react-icons/ti';
import React from 'react';
import './styles/header.css';

export default function Header(props) {
	const { toggleInputModal } = props;
	return (
		<header id='header'>
			<TiThMenu
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
