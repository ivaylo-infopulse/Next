import Link from 'next/link';
import React from 'react';

const NotFound = () => {
	return (
		<main className='text-center'>
			<h2 className='text-3xl'>There was a problem.</h2>
			<p>We could not find the page you ware looking for.</p>
			<p>
				<Link href='./'>Go back</Link>
			</p>
		</main>
	);
};

export default NotFound;
