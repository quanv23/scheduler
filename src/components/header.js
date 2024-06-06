import { FaPlus } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import React from 'react';
import './styles/header.css';

export default function Header(props) {
	const { toggleInputModal, importantVisibility, setImportantVisibility } =
		props;
	return (
		<header id='header'>
			{importantVisibility && (
				<FaRegEye
					className='header-img'
					id='header-nav'
					size={25}
					color='#E5383B'
					onClick={() => setImportantVisibility((prev) => !prev)}
				/>
			)}
			{!importantVisibility && (
				<FaRegEyeSlash
					className='header-img'
					id='header-nav'
					size={25}
					color='#E5383B'
					onClick={() => setImportantVisibility((prev) => !prev)}
				/>
			)}
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
