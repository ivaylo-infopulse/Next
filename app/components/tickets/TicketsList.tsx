import Link from 'next/link';
import { DeleteButton } from './delete/DeleteButton';

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
	id: string;
	title: string;
	body: string;
	priority: string;
	user_email: string;
}

export const TicketList = async () => {
	const tickets: ticketsObj[] = await getTickets();

	return (
		<div className='nav-content'>
			{tickets.map((ticket) => (
				<div key={ticket.id} className='card my-5'>
					<Link href={`/components/tickets/${ticket.id}`}>
						<h3>{ticket.title}</h3>
						<p>{ticket.body?.slice(0, 200)}...</p>
						<div className={`pill ${ticket.priority}`}>
							{ticket.priority} priority
						</div>
					</Link>
					<DeleteButton id={ticket.id} />
				</div>
			))}
			{tickets.length === 0 && (
				<p className='text-center'>There are no open tickets, low!</p>
			)}
		</div>
	);
};
