import React, { useEffect, useState, useRef } from 'react';
import './socialmedia.css';

function SocialMedia() {
	const [socialMinutes, setSocialMinutes] = useState(null);
	const [doomQuip, setDoomQuip] = useState('');
	const [isStreaming, setIsStreaming] = useState(false);
	const quipRef = useRef('');

		useEffect(() => {
			chrome.storage.local.get(['tabWrapSummary', 'profile'], async (data) => {
				const minutes = data.tabWrapSummary?.socialMediaMinutes || 0;
				setSocialMinutes(minutes);

				// Streaming prompt for quippy one-line statement about social media summary
				if (window.LanguageModel && data.tabWrapSummary) {
					setIsStreaming(true);
					const socialSummary = data.tabWrapSummary.categorySummaries?.['Social Media / Messaging'] || '';
					const prompt = `Based on the following summary of your social media behavior, write a quippy, direct, one-line statement (max 50 characters) as if talking to the user.\n\nSummary: ${socialSummary}`;
					try {
						const session = await window.LanguageModel.create();
						let result = '';
						for await (const chunk of session.promptStreaming(prompt)) {
							result += chunk;
							quipRef.current = result;
							setDoomQuip(result);
						}
						setIsStreaming(false);
						session.destroy();
					} catch (e) {
						setDoomQuip('Gemini Nano could not generate a statement.');
						setIsStreaming(false);
					}
				} else if (data.tabWrapSummary?.doomscrollingQuip) {
					setDoomQuip(data.tabWrapSummary.doomscrollingQuip);
				}
			});
		}, []);

	return (
		<div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontFamily: 'sans-serif' }}>
			<div className="doom-bg" />
			<div className="doom-bg2" />
			<div className="doom-bg3" />
			<div className="doom-bg-bottom" />
			<div className="doom-content">
				<div className="doom-title">
					{socialMinutes !== null
						? `You spent ${socialMinutes.toLocaleString()} minutes on social media this month`
						: 'Loading your social media stats...'}
				</div>
						{doomQuip && (
							<div className="doom-quip">{isStreaming ? <span>{doomQuip}<span className="animate-pulse">|</span></span> : doomQuip}</div>
						)}
			</div>
		</div>
	);
}

// Entry point for Vite
import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
createRoot(root).render(<SocialMedia />);