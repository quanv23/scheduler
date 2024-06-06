import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa6';
import './styles/footer.css';

export default function Footer(props) {
	// Deconstructing props
	const { toggleShowCategory, filterByCategory, setfilterByCategory } = props;

	return (
		<footer id='footer'>
			<button id='footer-btn' onClick={toggleShowCategory}>
				<FaPlus id='footer-img' />
				<p>Categories</p>
			</button>
			<div id='footer-btn' onClick={() => setfilterByCategory((prev) => !prev)}>
				<FaFilter id='footer-img' />
				<p>{filterByCategory ? 'By Category' : 'By Date'}</p>
			</div>
		</footer>
	);
}
