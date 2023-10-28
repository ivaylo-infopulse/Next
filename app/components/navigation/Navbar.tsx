'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from './image-2.jpg';

export const Navbar = () => {
	return (
		<nav>
			<Image
				src={logo}
				alt='nature'
				width={70}
				quality={100}
				placeholder='blur'
			/>
			<h1>Help desk</h1>
			<Link href='/components'>Dashboard</Link>
			<Link href='/components/tickets'>Tickets</Link>
			<Link href='/components/tickets/create'>
				<button className='btn-primary'>Create ticket</button>
			</Link>
		</nav>
	);
};
