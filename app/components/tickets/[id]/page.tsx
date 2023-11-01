import { notFound } from 'next/navigation';
import { DeleteButton } from '../delete/DeleteButton';
import { ticketsObj } from '../TicketsList';
import { Suspense } from 'react';
import Loading from '@/app/loading';

export const dynamicParams = true;

export async function generateStaticParams() {
	const res = await fetch('http://localhost:4000/tickets');
	const tikets: [ticketsObj] = await res.json();

	return tikets.map((ticket) => ({
		id: ticket.id,
	}));
}

async function getTicket(id: string | undefined) {
	const res = await fetch('http://localhost:4000/tickets/' + id, {
		next: {
			revalidate: 60,
		},
	});

	!res.ok && notFound();

	return res.json();
}

const TicketDetails = async ({
	params,
}: {
	params: {
		id: string;
	};
}) => {
	const ticket = await getTicket(params.id);

	return (
		<>
			<nav>
				<h2>Ticket Details</h2>
			</nav>
			<div className='nav-content'>
				<div className='card'>
					<Suspense fallback={<Loading />}>
						<h3>{ticket.title}</h3>
						<small>Created by {ticket.user_email}</small>
						<p>{ticket.body}</p>
						<div className={`pill ${ticket.priority}`}>
							{ticket.priority} priority
						</div>
						<DeleteButton id={ticket.id} />
					</Suspense>
				</div>
			</div>
		</>
	);
};

export default TicketDetails;
