import React, { Suspense } from 'react';
import { CreateForm } from './CreateForm';
import Loading from '@/app/loading';

const CreateTicket = () => {
	return (
		<main>
			<h2 className='text-primary text-center'>Add a New Ticket</h2>
			<Suspense fallback={<Loading />}>
				<CreateForm />
			</Suspense>
		</main>
	);
};

export default CreateTicket;
