<script lang="ts">
	import UploadPDF from '$lib/UploadPDF.svelte';
	import PDFReader from '$lib/PDFReader.svelte';
	import { sentences } from './lib/stores';
</script>

<main>
	<h1>PDF to Speech Reader</h1>
	<UploadPDF />
	{#if $sentences.length > 0}
		<PDFReader />
	{/if}
</main>
