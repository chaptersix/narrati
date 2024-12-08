build-local:
	docker build -t narrati:latest .
docker-run:
	docker run -p 3000:3000 --env-file .env narrati:latest
