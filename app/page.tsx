'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { object, string, ValidationError } from 'yup';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { userState } from './states/atom';

const validationSchema = object({
	user: string().required('Username is required'),
	password: string().required('Password is required'),
});

const Login = () => {
	const navigate = useRouter();
	const [isUser, setIsUser] = useRecoilState(userState);
	const [user, setUser] = useState('');
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

	const generateToken = () => {
		const token = uuidv4();
		const expirationTime = Date.now() + 60 * 60 * 1000;
		const authData = {
			token: token,
			expirationTime: expirationTime,
		};
		localStorage.setItem('authData', JSON.stringify(authData));
	};

	const hangleLogIn = () => {
		const isUserExists = users?.find(
			(data: any) => data.user === user && data.password === password
		);
		if (isUserExists) {
			generateToken();
			setIsUser(user);
			navigate.push('/components');
		} else {
			setErrors({ password: 'wrong username or password' });
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await validationSchema.validate(
				{ user, password },
				{ abortEarly: false }
			);
			setErrors({});
			hangleLogIn();
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
			{errors.user && <label className='input-error'>{errors.user}</label>}

			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
			/>
			{errors.password && (
				<label className='input-error'>{errors.password}</label>
			)}

			<div className='flex flex-col  justify-center my-8 gap-3'>
				<button type='submit' className='btn-primary login-btn'>
					LogIn
				</button>
				<Link href={'/registration'}>
					<button className='btn-primary'>Go To Register</button>
				</Link>
			</div>
		</form>
	);
};

export default Login;
