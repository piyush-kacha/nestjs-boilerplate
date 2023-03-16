<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Building production-ready applications with the NestJS framework. It includes features such as exception handling, Pino logger, MongoDB, and Swagger for API documentation. This boilerplate helps developers accelerate development and ensure reliability, scalability, and usability.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Generating an RSA Key Pair for JWT Authentication with OpenSSL

1. Generate a private key: 

   ```sh
   openssl genrsa -out private_key.pem 2048
   ```
2. Extract the public key from the private key:
   ```sh
    openssl rsa -in private_key.pem -outform PEM -pubout -out public_key.pem
    ```
    This will create two files in the current directory: private_key.pem (the private key) and public_key.pem (the corresponding public key).

    Note: The key size (2048 bits in this example) can be adjusted to suit your security requirements.
3. Encode the public key in base64 encoding:
   ```sh
   openssl base64 -A -in public_key.pem -out public_key_base64.txt
   ```
   Copy the contents of the public_key_base64.txt file and paste it into the public_key_base64.txt file in .env JWT_PUBLIC_KEY variable.

4. Encode the private key in base64 encoding:
   ```sh
   openssl base64 -A -in private_key.pem -out private_key_base64.txt
   ```
   Copy the contents of the private_key_base64.txt file and paste it into the private_key_base64.txt file in .env JWT_PRIVATE_KEY variable.

5. Remove the public_key.pem and private_key.pem files.

6. Remove the public_key_base64.txt and private_key_base64.txt files.

## Conversational Commit

The following rules are considered problems for `@commitlint/config-conventional` and will yield a non-zero exit code when not met.

Consult [docs/rules](https://conventional-changelog.github.io/commitlint/#/reference-rules) for a list of available rules.

#### type-enum

- **condition**: `type` is found in value
- **rule**: `always`
- **level**: `error`
- **value**

  ```
  [
    'build',
    'chore',
    'ci',
    'docs',
    'feat',
    'fix',
    'perf',
    'refactor',
    'revert',
    'style',
    'test'
  ];
  ```

```sh
echo "foo: some message" # fails
echo "fix: some message" # passes
```

#### type-case

- **description**: `type` is in case `value`
- **rule**: `always`
- **level**: `error`
- **value**
  ```
  'lowerCase'
  ```

```sh
echo "FIX: some message" # fails
echo "fix: some message" # passes
```

#### type-empty

- **condition**: `type` is empty
- **rule**: `never`
- **level**: `error`

```sh
echo ": some message" # fails
echo "fix: some message" # passes
```

#### subject-case

- **condition**: `subject` is in one of the cases `['sentence-case', 'start-case', 'pascal-case', 'upper-case']`
- **rule**: `never`
- **level**: `error`

```sh
echo "fix(SCOPE): Some message" # fails
echo "fix(SCOPE): Some Message" # fails
echo "fix(SCOPE): SomeMessage" # fails
echo "fix(SCOPE): SOMEMESSAGE" # fails
echo "fix(scope): some message" # passes
echo "fix(scope): some Message" # passes
```

#### subject-empty

- **condition**: `subject` is empty
- **rule**: `never`
- **level**: `error`

```sh
echo "fix:" # fails
echo "fix: some message" # passes
```

#### subject-full-stop

- **condition**: `subject` ends with `value`
- **rule**: `never`
- **level**: `error`
- **value**

```
'.'
```

```sh
echo "fix: some message." # fails
echo "fix: some message" # passes
```

#### header-max-length

- **condition**: `header` has `value` or less characters
- **rule**: `always`
- **level**: `error`
- **value**

```
100
```

```sh
echo "fix: some message that is way too long and breaks the line max-length by several characters" # fails
echo "fix: some message" # passes
```

#### footer-leading-blank

- **condition**: `footer` should have a leading blank line
- **rule**: `always`
- level: `warning`

```sh
echo "fix: some message
BREAKING CHANGE: It will be significant" # warning
echo "fix: some message
BREAKING CHANGE: It will be significant" # passes
```

#### footer-max-line-length

- **condition**: `footer` each line has `value` or less characters
- **rule**: `always`
- level: `error`
- **value**

```
100
```

```sh
echo "fix: some message
BREAKING CHANGE: footer with multiple lines
has a message that is way too long and will break the line rule 'line-max-length' by several characters" # fails
echo "fix: some message
BREAKING CHANGE: footer with multiple lines
but still no line is too long" # passes
```

#### body-leading-blank

- **condition**: `body` should have a leading blank line
- **rule**: `always`
- level: `warning`

```sh
echo "fix: some message
body" # warning
echo "fix: some message
body" # passes
```

#### body-max-line-length

- **condition**: `body` each line has `value` or less characters
- **rule**: `always`
- level: `error`
- **value**

```
100
```

```sh
echo "fix: some message
body with multiple lines
has a message that is way too long and will break the line rule 'line-max-length' by several characters" # fails
echo "fix: some message
body with multiple lines
but still no line is too long" # passes
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Piyush Kacha](https://github.com/piyush-kacha)
- Twitter - [piyushkacha75](https://twitter.com/piyushkacha75)

## License

NestJS-Boilerplate is [MIT licensed](LICENSE).
