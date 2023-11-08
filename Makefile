install:
	npm install

lint:
	npx eslint .

test:
	npm test

make test-coverage:
	npm run coverage


rec:
	asciinema rec