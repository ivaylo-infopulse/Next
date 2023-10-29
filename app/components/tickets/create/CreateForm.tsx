'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type priorityTypes = 'low' | 'medium' | 'high';

export const CreateForm = () => {
	const router = useRouter();
	const [title, setTitle] = useState<string>();
	const [body, setBody] = useState<string>();
	const [priority, setPriority] = useState<priorityTypes>('low');
	const [email, setEmail] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const ticket = {
			title,
			body,
			priority,
			user_email: email,
		};

		const res = await fetch('http://localhost:4000/tickets', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(ticket),
		});

		res.status === 201 && router.refresh();
		router.push('/components/tickets');
	};

	return (
		<form onSubmit={handleSubmit} className='w-1/2'>
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
			<label>
				<span>Email:</span>
				<input
					required
					type='email'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</label>
			<button className='btn-primary' disabled={isLoading}>
				{isLoading ? 'Adding...' : 'Add Ticket'}
			</button>
		</form>
	);
};
