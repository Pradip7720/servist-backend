import { client } from '../helpers/redisClient';

import axios from 'axios';

export const getUsers = async (req, res) => {
	try {
		const cacheValue = await client.get('users');

		if (cacheValue) 
			return res.json(JSON.parse(cacheValue));

		const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');

		await client.set('users', JSON.stringify(data))
		await client.expire('users', 30)
		return res.json(data);
	} catch (err) {
		console.log(err)
	}
};