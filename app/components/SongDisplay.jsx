'use client';

import React from 'react';
import { getUserFromSession } from '../../utils/AuthUtils';

const SongDisplay = ({ songData, isVocalist }) => {
	console.log(songData);

	return (
		<div className="text-2xl leading-relaxed pt-3">
			{songData?.lyrics?.map((line, lineIndex) => (
				<div key={lineIndex} className="mb-6">
					{line.map((item, itemIndex) => (
						<div key={itemIndex} className="relative inline-block mr-2">
							{item.chords && !isVocalist && (
								<div className="absolute left-0 top-[-1.5em] text-xl text-yellow-300">
									{item.chords}
								</div>
							)}
							<span className="block">{item.lyrics}</span>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default SongDisplay;
