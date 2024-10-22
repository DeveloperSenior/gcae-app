# GCAE APP REPLACEMENT TAGS
GCAE uses replacement tags for code generation, this tagging facilitates modular generation.

# Author
- [Andres Felipe Escobar Lopez](https://github.com/DeveloperSenior)

# Tags table

|          TAG           |     USE     |      TYPE          |
| :--------------------: | :---------: | :-----------------: |
| **@APPNAME@** | Application name in UPPER CASE | `String` |
| **@appName@** | Application name in CAMEL CASE | `String` |
| **@appname@** | Application name in LOWER CASE | `String` |
| **@version@** | Application version | `String` default `1.0` |
| **@email@** | Email of the application author | `String` default `empty` |
| **@appDescription@** | Application description  | `String` |
| **@typeRepository@** |  Type of repository to version code | <br>`String` default `git` <br><br> from Object <pre>{"type":"string", "url": "URI"}</pre> |
| **@urlRepository@** | URL of repository to version code  | <br>`URI` default `git.com` <br><br> from Object <pre>{"type":"string", "url": "URI"}</pre> |
| **@appPort@** | Listening port for the application server | `Number` default `3000` |
| **@appApiPath@** | Path of the API endpoints that start the application server | `String` default `/api/v1` |
| **@author@** | Application author | `String` default `TdeA` |
| **@company@** | Application company | `String` default `Tecnologico de Antioquia` |
| **@dbHost@** | Host of the database service to which the application will connect | <br>`String` default `change_it_example.com` <br><br> from Object <pre>{ "type": "string", "serviceName": "string", "host": "string", "port": number, "user": "string", "pass": "encrypt string base64" }</pre> |
| **@dbName@** | Name of the database service to which the application will connect | <br>`String` default `dbName_change_it` <br><br> from Object <pre>{ "type": "string", "serviceName": "string", "host": "string", "port": number, "user": "string", "pass": "encrypt string base64","protocol": "string" }</pre> |
| **@dbUser@** | User of the database service to which the application will connect | <br>`String` default `dbUser_change_it` <br><br> from Object <pre>{ "type": "string", "serviceName": "string", "host": "string", "port": number, "user": "string", "pass": "encrypt string base64","protocol": "string" }</pre> |
| **@dbToken@** | Password of the database service to which the application will connect | <br>`String` default `pass_change_it_base64` <br><br> from Attr object `pass` <pre>{ "type": "string", "serviceName": "string", "host": "string", "port": number, "user": "string", "pass": "encrypt string base64","protocol": "string" }</pre> |
| **@dbProtocol@** | Protocol of the database service to which the application will connect | <br>`String` default `http_change_it` <br><br> from Object <pre>{ "type": "string", "serviceName": "string", "host": "string", "port": number, "user": "string", "pass": "encrypt string base64","protocol": "string" }</pre> |
| **@dbPort@** | Port of the database service listener to which the application will connect | <br>`Number` default `empty` <br><br> from Object <pre>{ "type": "string", "serviceName": "string", "host": "string", "port": number, "user": "string", "pass": "encrypt string base64","protocol": "string" }</pre> |
| **@jwtSecretKey@** | JWT token secret key for authenticating middleware APIs | <br>`String` default `jwtSecretkey_change_it_base64` <br><br> from Object <pre>{ jwtSecretKey": "encrypt string base64" }</pre> |
| **@cacheTTL@** | Application cache settings | <br>`Number` default `jwtSecretkey_change_it_base64` <br><br> from Attr object `ttl` <pre>{ "ttl": number }</pre> |
| **@endpoints@** | Allows generating endpoints for the POSTMAN collection | `String` default `empty` |
| **@CREATETABLE@** | Allows you to generate table migrations for SQL applications | `String` default `empty` |
| **@countEntity@** | Number of entities in the application | `Number` default `empty` |
| **@ATTRMODEL@** | Allows generating table attributes for SQL applications in UPPER CASE | `String` default `empty` |
| **@attrModel@** | Allows generating table attributes for SQL applications in CAMEL CASE | `String` default `empty` |
| **@ATTRMODELALIAS@** | Allows generating table with alias attributes for SQL applications in UPPER CASE | `String` default `empty` |
| **@ATTRMODELUPDATE@** | Allows generating table update attributes for SQL applications in UPPER CASE | `String` default `empty` |
| **@relationship@** | Allows generating relationship beetwen table SQL or Documents JSON NO SQL applications | `String` default `empty` |
| **@relationshippager@** | Allows generating relationship paginate querys beetwen table SQL or Documents JSON NO SQL applications | `String` default `empty` |
| **@CONSTRAINTS@** | Allows generating table constraints for SQL applications | `String` default `empty` |
| **@ALTERTABLE@** | Allows generating table alterations for SQL applications | `String` default `empty` |
| **@ENTITYNAME@** | Name of the entity to be generated from the application in UPPER CASE | `String` |
| **@entityName@** | Name of the entity to be generated from the application in CAMEL CASE | `String` |
| **@entityname@** | Name of the entity to be generated from the application in LOWER CASE | `String` |
| **@EntityName@** | Name of the entity to be generated from the application in PASCAL CASE | `String` |
| **@Description@** | Description of the entity to be generated from the application| `String` |
| **@attrModelBuild@** | Defines for the entity attributes the `with` functions of the objects with the `Builder` pattern | `String` |
| **@attrModelBuildRequired@** | Defines the required entity attributes of objects with the `Builder` pattern | `String` |
| **@attrName@** | Defines the name for entity attributes in CAMEL CASE | `String` |
| **@AttrName@** | Defines the name for entity attributes in PASCAL CASE | `String` |
| **@attrType@** | Defines the data type for entity attributes in CAMEL CASE | `String` |
| **@attrRequire@** | Defines the obligation for the attributes of the entity in CAMEL CASE | `String` |
| **@attrIndex@** | Defines the query index for the entity attributes in CAMEL CASE | `String` |
| **@attrsModel@** | Assign all attributes to the entity model in CAMEL CASE | `String` |
| **@attrModelSet@** | Assigns all attributes the value of the constructor of the `Builder` pattern to the entity model in CAMEL CASE | `String` |
| **@attr_name@** | Defines the name of the attributes to document the entity in SWAGGER | `String` |
| **@attr_type@** | Defines the data type of the attributes to document the entity in SWAGGER | `String` |
| **@ref_attr_object@** | Defines the reference to the entity schema model in SWAGGER | `String` |
| **@swaggerRequireds@** | Map the required fields to the entity schema model in SWAGGER | `String` |
| **@swaggerProperties@** | Assigns attributes to the entity schema model in SWAGGER | `String` |
| **@attrsProperties@** | Defines schema properties for application entities | `String` |
| **@attrsRequired@** | Defines the required schema properties for the application entities | `String` |
| **@attrNullable@** | Defines nullable schema properties for application entities | `String` |
| **@attrAdd@** | Defines additional properties in the entity schema | `String` |
| **@quoted@** | Controls the comma character `,` in concatenation algorithms | `String` |