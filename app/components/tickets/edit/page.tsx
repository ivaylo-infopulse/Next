'use client';
import React, { useEffect, useState } from 'react';
import { priorityTypes } from '../create/CreateForm';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userState } from '@/app/states/atom';

const EditTicket = () => {
	const navigate = useRouter();
	const id = useSearchParams().get('id');
	const [title, setTitle] = useState<string>();
	const [body, setBody] = useState<string>();
	const [priority, setPriority] = useState<priorityTypes>('low');
	const user = useRecoilValue(userState);
	console.log(user);

	useEffect(() => {
		const fetchTicket = async () => {
			try {
				const response = await fetch(`http://localhost:4000/tickets/${id}`);
				const data = await response.json();
				setTitle(data.title);
				setBody(data.body);
				setPriority(data.priority);
			} catch (error) {
				console.error('Error fetching ticket:', error);
			}
		};

		fetchTicket();
	}, [id]);

	const handleSubmit = async () => {
		try {
			const ticket = {
				title,
				user,
				body,
				priority,
			};
			const res = await fetch(`http://localhost:4000/tickets/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(ticket),
			});

			if (res.status === 200) {
				alert(`The ticket was successfully updated!`);
				navigate.back();
			} else {
				alert('Failed to update ticket');
			}
		} catch (error) {
			console.error('Error updating ticket:', error);
			alert('An error occurred while updating the ticket');
		}
	};
	return (
		<div className='nav-content'>
			<form onSubmit={handleSubmit} className='w-1/2'>
				<h1>Edit Ticket</h1>
				<label>
					<span>Title:</span>
					<input
						required
						type='text'
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
				</label>
				<label>
					<span>Body:</span>
					<input
						required
						type='text'
						onChange={(e) => setBody(e.target.value)}
						value={body}
					/>
				</label>
				<label>
					<span>Priority:</span>
					<select
						value={priority}
						onChange={(e) => setPriority(e.target.value as priorityTypes)}
					>
						<option value='low'>Low Priority</option>
						<option value='medium'>Medium Priority</option>
						<option value='high'>High Priority</option>
					</select>
				</label>

				<button className='btn-primary' type='submit'>
					Edit
				</button>
			</form>
		</div>
	);
};

export default EditTicket;
