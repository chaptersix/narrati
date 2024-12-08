import { env } from '$env/dynamic/private';

const OPENAI_API_KEY = env.OPENAI_API_KEY;

export async function POST({ request }: { request: Request }) {
	const { text, voice = 'alloy', model = 'tts-1' } = await request.json();

	const resp = await fetch('https://api.openai.com/v1/audio/speech', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${OPENAI_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: model,
			input: text,
			voice: voice
		})
	});

	if (!resp.ok) {
		return new Response(`OpenAI TTS request failed: ${resp.status} ${resp.statusText}`, {
			status: 500
		});
	}

	// The response is audio data. We'll return it directly as a binary response.
	const audioData = await resp.arrayBuffer();
	return new Response(audioData, {
		headers: {
			'Content-Type': 'audio/mpeg'
		}
	});
}
