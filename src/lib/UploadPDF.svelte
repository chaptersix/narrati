<script lang="ts">
	import { browser } from '$app/environment';
	import { sentences } from './stores';

	let fileInput: HTMLInputElement | null = null;
	let pdfjsLib: any;
	let pdfjsWorker: string;

	// Load pdfjs-dist only in the browser
	if (browser) {
		(async () => {
			// Use the legacy build for better bundler compatibility
			// Also note that "pdfjs-dist/build/pdf" may not work directly,
			// use "pdfjs-dist/legacy/build/pdf" for pdf.js v3+.
			const pdfjsModule = await import('pdfjs-dist/legacy/build/pdf');
			pdfjsLib = pdfjsModule;
			const pdfjsWorkerModule = await import('pdfjs-dist/legacy/build/pdf.worker?url');
			pdfjsWorker = pdfjsWorkerModule.default;
			pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
		})();
	}

	async function handleFileChange(event: Event) {
		if (!browser || !pdfjsLib) return; // Ensure we are in browser and pdfjsLib is loaded

		const input = event.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) return;

		const file = input.files[0];
		const arrayBuffer = await file.arrayBuffer();
		const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

		let fullText = '';
		for (let i = 1; i <= pdf.numPages; i++) {
			const page = await pdf.getPage(i);
			const textContent = await page.getTextContent();
			const pageText = textContent.items.map((item: any) => item.str).join(' ');
			fullText += pageText + ' ';
		}

		const extractedSentences = fullText.match(/[^.!?]+[.!?]+(\s|$)/g) || [fullText];
		sentences.set(extractedSentences.map((s) => s.trim()));
	}
</script>

<div>
	<input type="file" bind:this={fileInput} accept="application/pdf" on:change={handleFileChange} />
</div>
