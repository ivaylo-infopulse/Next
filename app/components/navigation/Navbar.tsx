'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from './image-2.jpg';
import { userState } from '@/app/states/atom';
import { useRecoilState } from 'recoil';
import './styles.scss';

export const Navbar = () => {
	const [user, setUser] = useRecoilState(userState);
	const handleLogOut = () => {
		localStorage.removeItem('authData');
		setUser('');
	};

	return (
		<nav>
			<div className='nav-board'>
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
			</div>

			<Link className='logout-btn' onClick={handleLogOut} href='/'>
				LogOut
			</Link>
		</nav>
	);
};
