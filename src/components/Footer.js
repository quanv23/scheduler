import React from 'react';
import { RiFileListLine } from 'react-icons/ri';
import { FaRegCalendar } from 'react-icons/fa';
import './styles/footer.css';

export default function Footer() {
	return (
		<footer id='footer'>
			<RiFileListLine className='footer-img' size={28} color='E5383B' />
			<FaRegCalendar className='footer-img' size={25} color='E5383B' />
		</footer>
	);
}
