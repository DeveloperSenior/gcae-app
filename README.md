# GCAE-APP
software that automates the process of generating base code with standard architectures within the framework of SOLID principles focused on the Back-end.

# Author
- [Andres Felipe Escobar Lopez](https://github.com/DeveloperSenior)

# Technology in which it was developed

Before starting you must install Git, NodeJS, AWS CLI, Docker & Jenkins on your applicable operating system go to the official site [Install NodeJS](https://nodejs.org/en/download/package-manager), [Install Git](https://git-scm.com/downloads),
[Install Docker](https://docs.docker.com/engine/install/), [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html),
[Install Jenkins](https://www.jenkins.io/doc/book/installing/)

- VSCode. [Install VSCode](https://code.visualstudio.com/download)
- NodeJS v20.17.0 LTS
- Git
- Docker - Docker Compose
- AWS CLI
- Jenkins
- (Optional) Snyk: gives you the visibility, context, and control you need to work alongside developers on reducing application risk. [Install snyk](https://snyk.io/) or visit site [best-practice-security-express](https://expressjs.com/en/advanced/best-practice-security.html)

# Project's name
`GCAE FRAMEWORK for generating the BACK-END of an application from JSON objects (JSON-NODEJS Generator) under SOLID principles` software that automates the process of generating base code with standard architectures within the framework of SOLID principles focused on the Back-end.

# Back-End Project Structure
The project was developed for the back-end with NodeJS v20.17.0 LTS, using the following support libraries:

1. `express` for the creation of the container
Rest API server and usage
2. `nodemon` tool that helps develop Node.js based applications by automatically restarting the node application when changes are detected in the files in the directory.
3. `rxjs` Library of reactive extensions for JavaScript
4. `fluent-json-schema` JSON Schema Generator
5. `ajv` JSON structure validator based on javascript object schemas (JSON).
6. `swagger-jsdoc`, `swagger-model-validator`, `swagger-ui-express` This module allows you to serve API documents automatically generated by swagger-ui from Express, based on a swagger spec with `swagger-jsdoc`. The result is live documentation for the API hosted from the API server through a route.
7. `mongoose` as ODM to persist JSON documents in MongoDB and`mongoose-paginate-v2` to perform paginated queries to MongoDB.
8. `jsonwebtoken` to authenticate and authorize each transaction in the API exposed by `express`.
9. `bcrypt` to encrypt and validate passwords that are stored in MongoDB
10. `AWS SDK` Allows to connect your application to Amazon AWS services
11. `adm-zip` ADM-ZIP is a pure JavaScript implementation for zip data compression for NodeJS.
12. `helmet` Helmet helps secure Express apps by setting HTTP response headers. [Doc Site](https://helmetjs.github.io/)

```
gcae-app
   L resources
   L src
      L controllers 
      L db
         L config
      L middleware
      L models
         L dto
         L exception
         L schemas
      L routes
         L config
      L services
         L aws
      L utilities
      L validators
   L test
      L controllers
      L db
      L middleware
      L models
      L routes
      L services
      L utilities
      L validators
      setup-tests.js
   .dockerignore
   .env-example
   .env.test
   .gitignore
   app.js
   compose.yaml
   Dockerfile
   GCAE.spec.json
   jenkinsfile
   jenkinsfile-windows
   jest.config.js
   package.json
   README.md
   server.js
```
# How to run the project
1. **Clone the Repository:**
```bash
git clone
https://github.com/DeveloperSenior/gcae-app.git
```
2. **Install node modules:**
```bash
cd gcae-app
npm install
```
3. **Run unit tests with JEST:**
```bash
npm run test
```
*NOTE:* To view TEST report `./build/report/jest-report/jest_html_reporters.html` and the coverage report open the file`./coverage/index.html`

4. **Run the local application:**

**NOTE:** Before running the server, review the file `.env-example` and turn it into `.env` so that the server takes the initial configuration parameters. 
```bash
npm run runDev
```

5. **Run the local application into DOCKER:**
View Dockerfile & compose.yaml configuration and configure ENV needed to run the application

```bash
# into gcae-app folder run next script docker compose
cd gcae-app
docker compose up -d
```
**NOTE:** Only if you need to down your docker app services

```bash
# into gcae-app folder run next script docker compose
cd gcae-app
docker compose down
```

6. Open in browser http://localhost:3000/api/v1/version If you answer a `JSON` so:
```json
{"version": "1.0"}
```
It means that our server is up.

7. **View Documentation :**
The API documentation is in the url http://localhost:3000/api/v1/api-docs/

8. **Postman collection :**
In the Postman tool import the file `gcae-app.postman_collection` which is at the root of the project.

9. **(Optional) Run scan code security with snyk:**

```bash
# install snyk with npm
npm install -g snyk

# login snyk
snyk auth

# scan code with report
snyk test --report

```