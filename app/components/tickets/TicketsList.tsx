'use client';
import { DnDTicket } from './DnDTicket';

async function getTickets() {
	await new Promise((resolve) => setTimeout(resolve, 500));
	const res = await fetch('http://localhost:4000/tickets', {
		next: {
			revalidate: 0,
		},
	});
	return res.json();
}

export interface ticketsObj {
	status: string;
	id: string;
	title: string;
	user: string;
	body: string;
	priority: string;
}

export const TicketList = async () => {
	const tickets: ticketsObj[] = await getTickets();

	return (
		<div className='nav-content'>
			<DnDTicket tickets={tickets} />

			{tickets.length === 0 && (
				<p className='text-center'>There are no open tickets, low!</p>
			)}
		</div>
	);
};
