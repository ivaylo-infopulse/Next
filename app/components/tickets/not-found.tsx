import Link from 'next/link';
import React from 'react';

const NotFound = () => {
	return (
		<main className='text-center'>
			<h2 className='text-3xl'>There was a problem.</h2>
			<p>We could not find the ticket you ware looking for.</p>
			<p>
				Go back to <Link href='/components/tickets'>Tickets</Link>
			</p>
		</main>
	);
};

export default NotFound;
