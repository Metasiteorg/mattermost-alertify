deploy:
	docker run -v $(shell pwd):/var/www -w /var/www node yarn run deploy
install:
	docker run -v $(shell pwd):/var/www -w /var/www node yarn install
upgrade:
	docker run -v $(shell pwd):/var/www -w /var/www node yarn upgrade