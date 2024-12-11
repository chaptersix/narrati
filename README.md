# Narrati

Narrati is a SvelteKit-powered application that transforms PDF text into spoken audio using OpenAI’s Text-to-Speech (TTS) API. It provides a visually synchronized reading experience—highlighting the currently spoken sentence. Future updates will bring support for articles and other text formats, making Narrati a versatile and user-friendly auditory reading platform.

## Features

- **PDF Upload & Extraction**: Easily upload PDFs to extract their text.
- **Synchronized Highlighting**: Highlights sentences in real-time as they are spoken.
- **OpenAI TTS Integration**: Converts text into natural-sounding speech using OpenAI’s TTS API.
- **Playback Controls**: Start, pause, resume, and stop narration at your convenience.

## Getting Started

### Running via Docker (Recommended)

We provide a pre-built Docker image for a consistent runtime environment. This image is automatically built and pushed to the registry on each release tag.

1. **Pull & Run the Container**:
   ```bash
   docker run -p 3000:3000 --env-file .env ghcr.io/chaptersix/narrati:latest
   ```

   Include your OpenAI API key in the `.env` file:
   ```env
   OPENAI_API_KEY=sk-...
   ```

2. **Access the Application**:
   Visit [http://localhost:3000](http://localhost:3000) in your browser to upload a PDF and experience Narrati.

### Local Development with Bun

If you’d like to develop or test locally:

1. **Prerequisites**:
   - [Bun](https://bun.sh/) installed.
   - A valid `OPENAI_API_KEY` in `.env`.

2. **Install Dependencies**:
   ```bash
   bun install
   ```

3. **Run in Development Mode**:
   ```bash
   bun run dev
   ```

   Access the development server at [http://localhost:5173](http://localhost:5173).

### CI & Releases

Our CI pipeline builds and tags a new Docker image for every release. You can always pull a known stable release of Narrati directly from GitHub’s Container Registry.

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key is required for TTS functionality.

## Roadmap

- **Article Support**: Extend beyond PDFs to support articles and additional text formats.
- **UI/UX Enhancements**: Add features like progress indicators, improved layouts, and advanced controls.

## Feature and Bugs Requests

We value your input! If you have feature suggestions or encounter any issues:

- **Feature Requests**: Open a [GitHub Issue](../../issues) and label it as a feature request.
- **Bug Reports**: Open a [GitHub Issue](../../issues) and label it as a bug.

For discussions, brainstorming, and community engagement, consider participating in [GitHub Discussions](../../discussions) if enabled.

Your feedback helps shape Narrati’s future development.

## Development

Want to contribute?

- **Fork & Clone**: Start by forking this repository and cloning it locally.
- **Work on a Branch**: Create a feature branch for your changes.
- **Submit a Pull Request**: Once ready, open a PR for review.
- **Testing**: Ensure all core functionality is working. This project currently does not have unit tests. If people find this app useful I'd be happy to add some

For more details, see our [CONTRIBUTING](CONTRIBUTING.md) guidelines (if available).

## License

For licensing details, please see the [LICENSE](LICENSE) file.

## Acknowledgments

- **Svelte & SvelteKit**: Providing an exceptional developer experience.
- **OpenAI**: Enabling advanced TTS capabilities.
