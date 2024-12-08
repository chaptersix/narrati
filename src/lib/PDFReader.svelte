<script lang="ts">
	import { sentences, currentIndex, isReading } from './stores';
	import { get } from 'svelte/store';

	let currentAudio: HTMLAudioElement | null = null;

	async function getAudioForText(text: string): Promise<Blob> {
		const response = await fetch('/api/tts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text })
		});
		if (!response.ok) {
			throw new Error('Failed to retrieve audio');
		}
		const arrayBuffer = await response.arrayBuffer();
		return new Blob([arrayBuffer], { type: 'audio/mpeg' });
	}

	async function speakNextSentence() {
		const i = get(currentIndex);
		const allSentences = get(sentences);

		if (i >= allSentences.length) {
			isReading.set(false);
			return;
		}

		const sentence = allSentences[i];
		// Get the audio from the server
		const audioBlob = await getAudioForText(sentence);
		const audioURL = URL.createObjectURL(audioBlob);

		// Clean up previous audio
		if (currentAudio) {
			currentAudio.pause();
			currentAudio = null;
		}

		currentAudio = new Audio(audioURL);

		currentAudio.addEventListener('ended', () => {
			URL.revokeObjectURL(audioURL);
			currentIndex.update((value) => value + 1);
			speakNextSentence();
		});

		currentAudio.play();
	}

	async function startReading() {
		const allSentences = get(sentences);
		if (allSentences.length === 0) return;

		// Stop any previous audio
		if (currentAudio) {
			currentAudio.pause();
			currentAudio = null;
		}

		currentIndex.set(0);
		isReading.set(true);
		await speakNextSentence();
	}

	function pauseReading() {
		if (currentAudio && !currentAudio.paused) {
			currentAudio.pause();
		}
	}

	function resumeReading() {
		if (currentAudio && currentAudio.paused) {
			currentAudio.play();
		}
	}

	function stopReading() {
		if (currentAudio) {
			currentAudio.pause();
			currentAudio.currentTime = 0;
			currentAudio = null;
		}
		isReading.set(false);
	}
</script>

<div style="margin-top: 1em;">
	<button on:click={startReading}>Start</button>
	<button on:click={pauseReading}>Pause</button>
	<button on:click={resumeReading}>Resume</button>
	<button on:click={stopReading}>Stop</button>
</div>
{#if $sentences.length > 0}
	<div>
		{#each $sentences as sentence, i}
			<span class={i === $currentIndex ? 'highlight' : ''}>
				{sentence + ' '}
			</span>
		{/each}
	</div>
{/if}

<style>
	.highlight {
		background-color: yellow;
	}
</style>
