# GCAE APP REPLACEMENT TAGS
GCAE uses environment variables to launch the code generator services, these variables facilitate the dynamic configuration of the application.

# Author
- [Andres Felipe Escobar Lopez](https://github.com/DeveloperSenior)

# Environment variables table

|          VARIABLE          |     USE     |      VALUE          |
| :--------------------: | :---------: | :-----------------: |
| **`VERSION`** | REST API version | `String` default `'v1.0.0'` |
| **`PORT`** | Listener server port | `Number` default `3000` |
| **`API_PATH`** | Rest endpoint API path | `String` default `'/api/v1'` |
| **`ENV`** | Run server stage | `String` default `'dllo'` |
| **`APP_DEBUG`** | Defines that the application runs in debug mode. | `String` default `'N'` |
| **`APP_SUPPORT`** | Defines the types of applications that will be generated and that the application supports.  | `String` default `'MONGO,POSTGRES'` |
| **`TYPES_SUPPORT`** | Defines the types of fields in application entities that will be generated and that the application supports. | `String` default `'String,Object,Array,Number,Date,Relationship'` |
| **`BASE_PATH`** | Defines the file system local that manages the code generator  | `String` default `'C:/tmp/gcae'` |
| **`BUCKET_TEMPLATE`** | Defines the S3 bucket to manage the generator base templates | `String` default `'{stage}-gcae-templates'` |
| **`NODE_TEMPLATE_PROJECT`** | Defines the base NodeJS project compressed in ZIP format, uploaded to AWS | `String` default `'node-template.zip'` |
| **`NODE_TEMPLATES`** | Defines the base folder for NodeJs modular templates uploaded to AWS | `String` default `'node-templates'` |
| **`BUCKET_FOLDER_APPS`** | Defines the folder where generated applications are stored | `String` default `'apps'` |
| **`CACHE_TTL`** | Defines the TTL of the application cache in milliseconds | `Number` default `86400` |
| **`DB_HOST`** | Define the HOST of the Mongodb database in Atlas MongoCloud | `String` default `'discoverappcluster0.224hpiv.mongodb.net'` |
| **`DB_NAME`** | Defines the name of the GCAE database | `String` default `'gcae-app'` |
| **`DB_USER`** | Defines the connection user to the GCAE database | `String` default `'gcaeapp'` |
| **`DB_TOKEN`** | Defines the access key to the GCAE database, it must be encrypted in base64 | `String` default `''`|
| **`DB_PROTOCOL`** | Defines the connection protocol to the MongoDB database. | `String` default `'mongodb+srv'` |
| **`JWT_SECRET_KEY`** | Defines the private JWT encryption key, it must be encrypted in base64 | `String` default `''` |
| **`JWT_EXPIRES`** | ADefines the JWT token session expiration time (days) | `String` default `'1d'` |
| **`AWS_REGION`** | Defines the region for AWS services | `String` default `us-east-1` |
| **`AWS_ACCESS_KEY_ID`** | Defines the AWS access key ID | `String` default `''` |
| **`AWS_SECRET_ACCESS_KEY`** | Define the secret key to access AWS | `String` default `''` |
| **`NODE_USE_ARN_REGION_ENV_NAME`** | Defines the middleware-bucket-endpoint | `String` default `'AWS_S3_USE_ARN_REGION'` |