'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import { getUserFromSession } from '../../utils/AuthUtils';

export default function HeaderWrapper() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		setUser(getUserFromSession());
	}, []);

	return <Header user={user} />;
}
