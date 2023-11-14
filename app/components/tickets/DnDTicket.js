import Link from 'next/link';
import { useState } from 'react';

export const DnDTicket = ({ tickets }) => {
	const [items, setItems] = useState(tickets);

	const handleDragStart = (e, taskId) => {
		e.dataTransfer.setData('text/plain', taskId.toString());
	};

	const handleDrop = async (e, targetStatus) => {
		const taskId = parseInt(e.dataTransfer.getData('text/plain'));
		const newItems = items.map((item) =>
			item.id === taskId ? { ...item, status: targetStatus } : item
		);
		setItems(newItems);

		try {
			const updatedTicket = newItems.find((item) => item.id === taskId);
			await fetch(`http://localhost:4000/tickets/${taskId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedTicket),
			});
		} catch (error) {
			console.error('Error updating ticket status:', error);
		}
	};

	const getTicket = (status, columnName) => {
		return (
			<div
				onDrop={(e) => handleDrop(e, status)}
				onDragOver={(e) => e.preventDefault()}
				className='column-wrapper'
			>
				<h3>{columnName}</h3>
				{items
					.filter((ticket) => ticket.status === status)
					.map((ticket) => (
						<div
							key={ticket.id}
							draggable
							onDragStart={(e) => handleDragStart(e, ticket.id)}
							className='card my-5'
						>
							<Link href={`/components/tickets/${ticket.id}`}>
								<h3>{ticket.title}</h3>
								<p>{ticket.body?.slice(0, 40)}...</p>
								<div className={`pill ${ticket.priority}`}>
									{ticket.priority} priority
								</div>
							</Link>
						</div>
					))}
			</div>
		);
	};

	return (
		<div>
			<div className='tickets-table'>
				<th>{getTicket('to-do', 'To Do')}</th>
				<th>{getTicket('in-progress', 'In-Progress')}</th>
				<th>{getTicket('in-review', 'In Review')}</th>
				<th>{getTicket('done', 'Done')}</th>
			</div>
		</div>
	);
};
