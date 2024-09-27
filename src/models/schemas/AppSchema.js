module.exports = {
    "type": "object",
    "properties": {
      "appName": {"type": "string", "nullable" : false},
      "appPort": {"type": "number", "nullable" : true},
      "appApiPath": {"type": "string", "nullable" : true},
      "appDescription": {"type": "string", "nullable" : false},
      "author": {"type": "string", "nullable" : true},
      "company": {"type": "string", "nullable" : true},
      "version": {"type": "string", "nullable" : true},
      "repository": {
        "type": "object",
        "properties": { 
          "type": {"type": "string", "nullable" : true},
          "url" : {"type": "string", "nullable" : true}
        },
        "required": [],
        "nullable": false
      },
      "auth": {
        "type": "object",
        "properties": { 
          "jwtSecretKey": {"type": "string", "nullable" : true}
        },
        "required": [],
        "nullable": false
      },
      "cache": {
        "type": "object",
        "properties": { 
          "ttl": {"type": "number", "nullable" : true}
        },
        "required": [],
        "nullable": false
      },
      "dataBase": {
        "type": "object",
        "properties": { 
          "type": {"enum":[...process.env.APP_SUPPORT.split(',')]},
          "serviceName": {"type": "string", "nullable" : true},
          "user": {"type": "string", "nullable" : true},
          "pass": {"type": "string", "nullable" : true},
          "host": {"type": "string", "nullable" : true},
          "port": {"type": "number", "nullable" : true},
          "protocol": {"type": "string", "nullable" : true}
        },
        "required": ["type"],
        "nullable": false
      },
      "entities": {
        "type": "array",
        "uniqueItems": true,
        "items": {
          "type": "object",
          "properties": { 
            "name": {"type": "string", "nullable" : false},
            "description": {"type": "string", "nullable" : false},
            "fields": {
                 "type": "array", "uniqueItems": true,
                 "items": {
                   "type": "object",
                   "properties": {
                      "name": {"type": "string", "nullable" : false},
                      "type": {
                        "enum": [...process.env.TYPES_SUPPORT.split(',')]
                      },
                      "items": {
                         "type":"object",
                         "properties": {
                          "type": {
                            "enum": [...process.env.TYPES_SUPPORT.split(',')]
                          },
                          "ref":{"type": "string", "nullable" : true}
                         },
                         "required": [],
                         "nullable": true
                      },
                      "pk":{"type": "boolean", "nullable" : false},
                      "required":{"type": "boolean", "nullable" : false},
                      "precision":{"type": "number", "nullable" : false}
                   },
                   "required": ["name","type","precision"],
                   "nullable": false
                 }
            }
          },
          "required": ["name","description","fields"],
          "nullable": false
        }
      }

    },
    "required": ["appName","appDescription","repository","auth","cache","dataBase","entities" ]
}