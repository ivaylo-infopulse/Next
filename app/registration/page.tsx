'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { ValidationError } from 'yup';
import { RegistrationSchema } from '../validation/registrationSchema';
import { useFetch } from '../components/hooks/useFetch';

const Register = () => {
	const navigate = useRouter();
	const [newUser, setNewUser] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPass, setConfirmPass] = useState<string>('');
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [users, setUsers] = useState<string[]>();
	const data = useFetch('http://localhost:4000/users');

	useEffect(() => {
		setUsers(data);
	}, [data]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await RegistrationSchema.validate(
				{ user: newUser, password, confirmPass, users },
				{ abortEarly: false }
			);

			setErrors({});
			const isUserExist = users?.find((data: any) => {
				return data.user === newUser;
			});

			if (!isUserExist) {
				const response = await fetch('http://localhost:4000/users', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ user: newUser, password }),
				});

				const data = await response.json();
				navigate.push('/');
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
			<h2>Registration Page</h2>
			<hr />

			<input
				type='text'
				placeholder='Username'
				value={newUser}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setNewUser(e.target.value)
				}
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

			<input
				type='password'
				placeholder='Confirm Password'
				value={confirmPass}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setConfirmPass(e.target.value)
				}
			/>
			{errors.confirmPass && (
				<div style={{ color: 'red' }}>{errors.confirmPass}</div>
			)}

			<div className='flex justify-center my-8'>
				<button type='submit' className='btn-primary'>
					Register
				</button>
			</div>
		</form>
	);
};
export default Register;
