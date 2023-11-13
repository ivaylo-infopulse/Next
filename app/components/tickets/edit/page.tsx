'use client';
import React, { useEffect, useState } from 'react';
import { priorityTypes } from '../create/CreateForm';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userState } from '@/app/states/atom';
import { useFetch } from '../../hooks/useFetch';

type Ticket = {
	status: string;
	title: string;
	user: string;
	editUser: string;
	body: string;
	priority: priorityTypes;
};

const EditTicket = () => {
	const navigate = useRouter();
	const id = useSearchParams().get('id');
	const [status, setStatus] = useState<string>();
	const [title, setTitle] = useState<string>();
	const [user, setUser] = useState<string>();
	const [body, setBody] = useState<string>();
	const [priority, setPriority] = useState<priorityTypes>('low');
	const currentUser = useRecoilValue(userState);
	const data = useFetch(
		`http://localhost:4000/tickets/${id}`
	) as unknown as Ticket;

	useEffect(() => {
		(() => {
			setStatus(data?.status);
			setTitle(data?.title);
			setUser(data?.user);
			setBody(data?.body);
			setPriority(data?.priority);
		})();
	}, [data?.body, data?.priority, data?.status, data?.title, data?.user]);

	const handleSubmit = async () => {
		try {
			const ticket = {
				status,
				title,
				user,
				editUser: currentUser,
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
					<span>Status:</span>
					<select value={status} onChange={(e) => setStatus(e.target.value)}>
						<option value='to-do'>To Do</option>
						<option value='in-progres'>In Progres</option>
						<option value='in-review'>In Review</option>
						<option value='done'>Done</option>
					</select>
				</label>
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
