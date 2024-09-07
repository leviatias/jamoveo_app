import React from 'react';

export default function AboutMe() {
	return (
		<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
					About Me
				</h1>
				<div className="bg-white shadow overflow-hidden sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h2 className="text-2xl font-semibold text-gray-900">
							Industrial Engineer | Opportunity Seeker | Quick Learner
						</h2>
					</div>
					<div className="border-t border-gray-200">
						<dl>
							<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">
									Background
								</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									I am an Industrial Engineer with a passion for optimizing
									processes and solving complex problems. My educational
									background has equipped me with a unique blend of technical
									skills and business acumen.
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">
									Seeking Opportunities
								</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									I am constantly on the lookout for new opportunities to apply
									my skills and knowledge. I believe in the power of innovation
									and am eager to contribute to projects that push the
									boundaries of what's possible in industrial engineering and
									beyond.
								</dd>
							</div>
							<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">
									Quick Learner
								</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									One of my greatest strengths is my ability to quickly grasp
									new concepts and technologies. In the ever-evolving field of
									industrial engineering, this skill allows me to stay ahead of
									the curve and adapt to new challenges with ease.
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Skills</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									<ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
										<li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
											Process Optimization
										</li>
										<li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
											Data Analysis
										</li>
										<li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
											Project Management
										</li>
										<li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
											Lean Six Sigma
										</li>
									</ul>
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</div>
	);
}
