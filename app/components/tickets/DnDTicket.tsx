import Link from 'next/link';
import { useState } from 'react';

interface Ticket {
	id: number;
	title: string;
	body?: string;
	priority: string;
	status: string;
}

interface DnDTicketProps {
	tickets: Ticket[];
}

export const DnDTicket: React.FC<DnDTicketProps> = ({ tickets }) => {
	const [items, setItems] = useState<Ticket[]>(tickets);
	const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		taskId: number
	) => {
		e.dataTransfer.setData('text/plain', taskId.toString());
	};

	const handleDragOver = (
		e: React.DragEvent<HTMLDivElement>,
		status: string
	) => {
		e.preventDefault();
		setHoveredColumn(status);
	};

	const handleDrop = async (
		e: React.DragEvent<HTMLDivElement>,
		targetStatus: string
	) => {
		const taskId = parseInt(e.dataTransfer.getData('text/plain'));
		const newItems = items.map((item) =>
			item.id === taskId ? { ...item, status: targetStatus } : item
		);
		setItems(newItems);
		setHoveredColumn(null);

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

	const getTicket = (status: string, columnName: string) => {
		const isHovered = hoveredColumn === status;
		return (
			<div
				onDrop={(e) => handleDrop(e, status)}
				onDragOver={(e) => handleDragOver(e, status)}
				className={`column-wrapper ${isHovered ? 'hovered' : ''}`}
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
