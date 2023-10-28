'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export const DeleteButton = ({ id }: { id: string }) => {
	const router = useRouter();

	const handleDelete = async () => {
		const confirmed = window.confirm(
			'Are you sure you want to delete this ticket?'
		);
		if (confirmed) {
			const res = await fetch(`http://localhost:4000/tickets/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
			});
			if (res.status === 200) {
				router.refresh();
				router.push('/components/tickets');
			} else {
				alert('Failed to delete ticket');
			}
		}
	};

	return (
		<button className='btn-primary' onClick={handleDelete}>
			Delete
		</button>
	);
};
