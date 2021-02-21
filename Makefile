deploy:
	docker run -v $(shell pwd):/var/www -w /var/www node yarn run deploy