'use client';

import React from 'react';
import { UserProvider } from '../../hooks/userContext';

export default function UserProviderWrapper({ children }) {
	return <UserProvider>{children}</UserProvider>;
}
