import { object, string } from 'yup';

export const RegistrationSchema = object({
	user: string()
		.required('Username is required!')
		.test('user-exist', 'Username already exists!!', function (value) {
			const users = this.parent.users;
			const userExists = users?.find((data: any) => data.user === value);
			return !userExists;
		}),
	password: string().required('Password is required!'),
	confirmPass: string()
		.required('Confirm password!')
		.test('passwords-match', 'Passwords must match!!', function (value) {
			return this.parent.password === value;
		}),
});
