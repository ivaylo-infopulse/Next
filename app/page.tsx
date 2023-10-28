'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { object, string, ValidationError } from 'yup';
import { v4 as uuidv4 } from 'uuid';

const validationSchema = object({
	user: string().required('Username is required'),
	password: string().required('Password is required'),
});

export default function Home() {
	const navigate = useRouter();
	const [user, setUser] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [users, setUsers] = useState<string[]>();

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('http://localhost:4000/users');
			const data = await res.json();
			setUsers(data);
		};
		fetchData();
	}, []);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await validationSchema.validate(
				{ user, password },
				{ abortEarly: false }
			);

			setErrors({});
			const userExists = users?.find(
				(data: any) => data.user === user && data.password === password
			);

			if (userExists) {
				const token = uuidv4();
				localStorage.setItem('token', token);
				navigate.push('/components');
			} else {
				setErrors({ password: 'wrong username or password' });
			}
		} catch (err) {
			if (err instanceof ValidationError) {
				const newErrors: { [key: string]: string } = {};
				err.inner.forEach((error) => {
					newErrors[error.path!] = error.message;
				});
				setErrors(newErrors);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login Page</h2>
			<hr />

			<input
				type='text'
				placeholder='Username'
				value={user}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
			/>
			{errors.user && <div style={{ color: 'red' }}>{errors.user}</div>}

			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
			/>
			{errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}

			<div className='flex justify-center my-8'>
				<button type='submit' className='btn-primary'>
					LogIn
				</button>
			</div>
		</form>
	);
}
