import { useEffect, useState } from 'react';

export const useFetch = (url: string) => {
	const [data, setData] = useState();

	useEffect(() => {
		(async function () {
			try {
				const response = await fetch(url);
				const resData = await response.json();
				setData(resData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		})();
	}, [data, url]);

	return data;
};
