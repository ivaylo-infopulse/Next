import '../globals.scss';
import { Rubik } from 'next/font/google';
import { Navbar } from './navigation/Navbar';
import { ReactNode } from 'react';

const rubik = Rubik({ subsets: ['latin'] });

const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

interface ComponentsLayoutProps {
	children: ReactNode;
}
export default function ComponentsLayout({ children }: ComponentsLayoutProps) {
	return (
		<html lang='en'>
			<body className={rubik.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
