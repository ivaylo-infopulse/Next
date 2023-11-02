'use client';
import { ReactNode, useEffect, useState } from 'react';
import './globals.scss';
import { Rubik } from 'next/font/google';
import { useRouter, usePathname } from 'next/navigation';
import { RecoilRoot } from 'recoil';

const rubik = Rubik({ subsets: ['latin'] });

const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

interface RootLayoutProps {
	children: ReactNode | any;
}

export default function RootLayout({ children }: RootLayoutProps) {
	const navigate = useRouter();
	const pathName = usePathname();
	const [token, setToken] = useState<string>();

	useEffect(() => {
		const lsToken: string | null = localStorage.getItem('authData');
		const storedToken = JSON.parse(lsToken as string);

		(!storedToken && pathName !== '/registration') ||
		Date.now() > storedToken?.expirationTime
			? (navigate.push('/'), localStorage.removeItem('authData'))
			: setToken(storedToken);
	}, [navigate, pathName]);

	return (
		<html lang='en'>
			<body className={rubik.className}>
				{pathName === '/' || pathName === '/registration' || token ? (
					<RecoilRoot>{children}</RecoilRoot>
				) : null}
			</body>
		</html>
	);
}
