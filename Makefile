build:
	npm run build && sls offline

deploy:
	npm run build && sls deploy