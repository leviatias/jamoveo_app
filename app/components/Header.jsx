'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { removeUserFromSession } from '../../utils/AuthUtils';
import Image from 'next/image';
import logo from '../../img/logo.png';

export default function Header({ user }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

	const isActive = (path) => pathname === path;
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	const handleLogout = () => {
		removeUserFromSession();
		router.push('/login');
	};

	const NavLink = ({ href, children }) => (
		<Link
			href={href}
			className={`block py-2 px-4 text-base font-medium ${
				isActive(href)
					? 'bg-secondary text-white'
					: 'text-white hover:bg-secondary hover:text-white'
			}`}
			onClick={() => setIsMobileMenuOpen(false)}>
			{children}
		</Link>
	);

	return (
		<header className="bg-primary text-white">
			<nav className="max-w-7xl mx-auto -4 sm:px-6 lg:px-8" aria-label="Top">
				<div className="w-full flex flex-col lg:flex-row items-center justify-between">
					<div className="flex flex-col lg:flex-row items-center mb-4 lg:mb-0">
						<Link href="/" className="mb-4 lg:mb-0">
							<span className="sr-only">JaMoveo</span>
							<Image
								// className="h-10 w-auto"
								src={logo}
								width={150}
								height={150}
								alt="JaMoveo"
							/>
						</Link>
						<div className="hidden lg:flex flex-col lg:flex-row lg:ml-10 lg:space-y-0 lg:space-x-8">
							<NavLink href="/">Home</NavLink>
							{user && (
								<>
									<NavLink href="/about_me">About Me</NavLink>
									<NavLink href="/main">Live Jam</NavLink>
									{/* {user.isAdmin && <NavLink href="/admin">Admin</NavLink>} */}
								</>
							)}
						</div>
					</div>
					<div className="flex items-center">
						{user ? (
							<div className="relative">
								<button
									onClick={toggleMenu}
									className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
									aria-expanded="false">
									<span className="sr-only">Open user menu</span>
									<img
										className="h-8 w-8 rounded-full"
										src={
											user.avatar || `https://i.pravatar.cc/150?u=${user.email}`
										}
										alt={user.name}
									/>
								</button>
								{isMenuOpen && (
									<div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
										<button
											onClick={handleLogout}
											className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
											Sign out
										</button>
									</div>
								)}
							</div>
						) : (
							<>
								<Link
									href="/login"
									className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-primary hover:bg-indigo-50">
									Sign in
								</Link>
								<Link
									href="/register"
									className="ml-4 inline-block bg-secondary py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-primaryhover">
									Sign up
								</Link>
							</>
						)}
						<div className="lg:hidden ml-4">
							<button
								onClick={toggleMobileMenu}
								className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								aria-expanded="false">
								<span className="sr-only">Open main menu</span>
								{isMobileMenuOpen ? (
									<svg
										className="block h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								) : (
									<svg
										className="block h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>
			</nav>
			{isMobileMenuOpen && (
				<div className="lg:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1">
						<NavLink href="/">Home</NavLink>
						{user && (
							<>
								<NavLink href="/about_me">About Me</NavLink>
								<NavLink href="/main">Live Jam</NavLink>
								<NavLink href="/songs">Songs</NavLink>
								{/* {user.isAdmin && <NavLink href="/admin">Admin</NavLink>} */}
							</>
						)}
					</div>
				</div>
			)}
		</header>
	);
}
