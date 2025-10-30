
import React from 'react';
import { Trophy, Clock } from 'lucide-react';

const TotalHoursDisplay = ({ hours, unit, label, focusColor }) => {
	return (
		<div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 shadow-xl w-full max-w-lg mx-auto">
			<div className="text-white mb-4 p-2 rounded-full bg-purple-400/20">
				<Clock className="w-8 h-8 text-purple-400" />
			</div>
			<p 
				className="text-6xl sm:text-7xl font-extrabold" 
				style={{ color: focusColor }}
			>
				{hours}
			</p>
			<p className="text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest mt-2">
				{unit}
			</p>
			<p className="text-2xl sm:text-3xl font-extrabold text-white mt-4 text-center">
				{label}
			</p>
		</div>
	);
};

const StreakChart = ({ streakDays, timePeriodLabel, streakDates, progress }) => {
	const max = Math.max(...streakDays, 1);
	const normalized = streakDays.map(v => max ? v / max : 0);
	const animatedHeights = normalized.map(h => h * (typeof progress === 'number' ? progress : 1));
	return (
		<div className="flex flex-col items-center w-full mt-10">
			<h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
				TOP SOCIAL MEDIA STREAK
			</h3>
			<div className="flex items-end space-x-2 w-full max-w-sm px-4">
				{animatedHeights.map((intensity, index) => (
					<div 
						key={index} 
						className="flex-1 rounded-t-lg bg-pink-500 hover:bg-pink-400 transition-all duration-300 cursor-pointer"
						style={{ 
							height: `${intensity * 100}px`,
							minHeight: '4px',
							boxShadow: `0 0 10px ${intensity > 0.8 ? 'rgba(236, 72, 153, 0.8)' : 'transparent'}`,
							transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1)',
						}}
					>
					</div>
				))}
				<Trophy className="w-8 h-8 text-yellow-400 ml-4 animate-pulse" />
			</div>
			<p className="text-sm text-gray-400 mt-4 font-semibold tracking-wide">{timePeriodLabel}</p>
		</div>
	);
};

function SocialMedia() {
	const [quippySummary, setQuippySummary] = React.useState('');
	const [isStreaming, setIsStreaming] = React.useState(false);
	const quipRef = React.useRef('');
	React.useEffect(() => {
		async function fetchQuip() {
			if (!window.LanguageModel) {
				setQuippySummary('Keep up the scrolling!');
				return;
			}
			const available = await window.LanguageModel.availability();
			if (available === 'unavailable') {
				setQuippySummary('Keep up the scrolling!');
				return;
			}
			const session = await window.LanguageModel.create();
			chrome.storage.local.get(['tabWrapSummary'], async (data) => {
				const summary = data.tabWrapSummary || {};
				const socialSummaryText = summary.categorySummaries?.['Social Media / Messaging'] || '';
				if (socialSummaryText) {
					const prompt = socialSummaryText + '\nWrite a quippy statement about this social media summary, as if talking to the user, in less than 50 characters.';
					try {
						setIsStreaming(true);
						let result = '';
						for await (const chunk of session.promptStreaming(prompt)) {
							result += chunk;
							quipRef.current = result;
							setQuippySummary(result);
						}
						setIsStreaming(false);
						session.destroy();
					} catch (e) {
						setQuippySummary('Keep up the scrolling!');
						setIsStreaming(false);
					}
				} else {
					setQuippySummary('Keep up the scrolling!');
				}
			});
		}
		fetchQuip();
	}, []);

	const [socialSummary, setSocialSummary] = React.useState({
		totalMinutes: 0,
		streak: [],
	});

	React.useEffect(() => {
		chrome.storage.local.get(['tabWrapSummary'], (data) => {
			const summary = data.tabWrapSummary || {};
			const totalMinutes = Math.floor((summary.categoryTotals?.['Social Media / Messaging'] || 0) / 60);
			setSocialSummary({
				totalMinutes,
				streak: Array.isArray(summary.topCategoryStreaks?.['Social Media / Messaging']) ? summary.topCategoryStreaks['Social Media / Messaging'] : [],
			});
		});
	}, []);

	const streakDays = Array.isArray(socialSummary.streak)
		? socialSummary.streak.map(day => day.minutes)
		: [];
	const streakDates = Array.isArray(socialSummary.streak)
		? socialSummary.streak.map(day => {
				if (!day.date) return '';
				const d = new Date(day.date);
				return d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
			})
		: [];
	const timePeriodLabel = Array.isArray(socialSummary.streak) && socialSummary.streak.length
		? `${new Date(socialSummary.streak[0].date).toLocaleString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(socialSummary.streak[socialSummary.streak.length - 1].date).toLocaleString('en-US', { month: 'short', day: 'numeric' })}`
		: '';

	const [progress, setProgress] = React.useState(0);
	React.useEffect(() => {
		let start;
		let duration = 1200;
		function animate(ts) {
			if (!start) start = ts;
			const prog = Math.min((ts - start) / duration, 1);
			setProgress(prog);
			if (prog < 1) requestAnimationFrame(animate);
			else setProgress(1);
		}
		requestAnimationFrame(animate);
		return () => setProgress(0);
	}, [socialSummary.totalMinutes, streakDays.length, streakDays.join(",")]);

	const animatedValue = Math.floor(progress * socialSummary.totalMinutes);
	let hours = Math.floor(animatedValue / 60);
	let minutes = animatedValue % 60;
	let seconds = Math.floor(animatedValue * 60) % 60;
	let unit = 'HOURS';
	let shownValue = hours;
	if (animatedValue < 1) {
		unit = 'SECONDS';
		shownValue = Math.floor(socialSummary.totalMinutes * 60 * progress);
	} else if (animatedValue < 60) {
		unit = 'MINUTES';
		shownValue = animatedValue;
	}

	return (
		<div className="min-h-screen p-4 sm:p-8 flex items-center justify-center bg-gray-900 font-sans">
			{/* Background Effect: Cosmic Blur */}
			<div className="absolute inset-0 overflow-hidden -z-10">
				<div className="absolute top-10 left-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
				<div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
				<div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
			</div>

			{/* Main Content Card - Simplified Layout */}
			<div className="w-full max-w-xl p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative space-y-12">
				{/* Title */}
				<h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white uppercase tracking-widest drop-shadow-lg">
					SOCIAL MEDIA CATEGORY SUMMARY
				</h1>

				{/* 1. Hours Display Component */}
				<TotalHoursDisplay
					hours={shownValue}
					unit={unit}
					label={'SPENT ON SOCIAL MEDIA'}
					focusColor={'#ec4899'}
				/>

				{/* Small Section Textbox with Gemini Nano quippy summary (streaming) */}
				<div className="flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/10 shadow-lg w-full max-w-lg mx-auto my-4">
					<p className="text-base sm:text-lg font-semibold text-white text-center">
						{isStreaming ? <span>{quippySummary}<span className="animate-pulse">|</span></span> : (quippySummary || 'Keep up the scrolling!')}
					</p>
				</div>

				{/* 2. Streak Section Component */}
				<StreakChart
					streakDays={streakDays}
					timePeriodLabel={timePeriodLabel}
					streakDates={streakDates}
					progress={progress}
				/>

			</div>
			{/* Tailwind Animation Styles */}
			<style>{`
				@keyframes blob {
					0% {
						transform: translate(0px, 0px) scale(1);
					}
					33% {
						transform: translate(30px, -50px) scale(1.1);
					}
					66% {
						transform: translate(-20px, 20px) scale(0.9);
					}
					100% {
						transform: translate(0px, 0px) scale(1);
					}
				}
				.animate-blob {
					animation: blob 7s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);
				}
				.animation-delay-2000 {
					animation-delay: 2s;
				}
				.animation-delay-4000 {
					animation-delay: 4s;
				}
				@keyframes pulse {
					0%, 100% { opacity: 1; }
					50% { opacity: 0.5; }
				}
				.animate-pulse {
						animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
				}
			`}</style>
		</div>
	);
}

import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
createRoot(root).render(<SocialMedia />);