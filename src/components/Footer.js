import React from 'react';
import { RiFileListLine } from 'react-icons/ri';
import { FaRegCalendar } from 'react-icons/fa';
import './styles/footer.css';

export default function Footer() {
	return (
		<footer className='footer'>
			<RiFileListLine className='footer-schedule' size={28} color='E5383B' />
			<FaRegCalendar className='footer-calendar' size={25} color='E5383B' />
		</footer>
	);
}
