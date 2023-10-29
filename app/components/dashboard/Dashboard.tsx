import Link from 'next/link';
import React from 'react';

const Dashboard = () => {
	return (
		<div className='nav-content'>
			<h1>Dashboard</h1>
			<span>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. At quos
				accusantium autem obcaecati dolorum. Quidem voluptates sit iste pariatur
				quos qui debitis ab ullam et, harum dolorum eum aliquid minima? Lorem
				ipsum dolor sit amet consectetur adipisicing elit. Nemo, dolores beatae?
				Corporis ipsam dolorum aut, quam, modi, voluptatibus omnis labore
				consequatur similique magnam officiis libero est nihil fuga voluptas
				tempore!
			</span>
			<Link href={'/components/tickets'}>
				<button className='btn-primary'>Go to tickets</button>
			</Link>
		</div>
	);
};

export default Dashboard;
