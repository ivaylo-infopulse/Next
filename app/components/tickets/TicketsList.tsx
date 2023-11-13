import Link from 'next/link';

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

	const getTicket: any = (status: any) => {
		return tickets.map((ticket) => (
			<>
				{ticket.status === status && (
					<div key={ticket.id} className='card my-5'>
						<Link href={`/components/tickets/${ticket.id}`}>
							<h3>{ticket.title}</h3>
							<p>{ticket.body?.slice(0, 200)}...</p>
							<div className={`pill ${ticket.priority}`}>
								{ticket.priority} priority
							</div>
						</Link>
					</div>
				)}
			</>
		));
	};

	return (
		<div className='nav-content'>
			<table className='tickets-table'>
				<th>To Do {getTicket('to-do')} </th>
				<th>In Progres {getTicket('in-progres')}</th>
				<th>In Review {getTicket('in-review')}</th>
				<th>Done {getTicket('done')}</th>
			</table>
			{tickets.length === 0 && (
				<p className='text-center'>There are no open tickets, low!</p>
			)}
		</div>
	);
};
