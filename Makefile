install:
	npm install

lint:
	npx eslint .

test:
	npm test

make test-coverage:
	npm test --coverage