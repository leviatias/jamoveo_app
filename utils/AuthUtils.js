export const getUserFromSession = () => {
	if (typeof window !== 'undefined') {
		const userString = sessionStorage.getItem('user');
		return userString ? JSON.parse(userString) : null;
	}
	return null;
};

export const setUserInSession = (user) => {
	if (typeof window !== 'undefined') {
		sessionStorage.setItem('user', JSON.stringify(user));
	}
};

export const removeUserFromSession = () => {
	if (typeof window !== 'undefined') {
		sessionStorage.removeItem('user');
	}
};
