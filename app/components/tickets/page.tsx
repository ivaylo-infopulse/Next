import React, { Suspense } from 'react';
import { TicketList } from './TicketsList';
import Loading from '@/app/loading';

const page = () => {
	return (
		<>
			<nav className='tickets-list'>
				<div>
					<h2>Tickets</h2>
					<p>
						<small>Currently open tickets</small>
					</p>
				</div>
			</nav>
			<Suspense fallback={<Loading />}>
				<TicketList />
			</Suspense>
		</>
	);
};

export default page;
