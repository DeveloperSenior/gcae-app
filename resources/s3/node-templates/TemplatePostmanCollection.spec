,
		{
			"name": "@EntityName@",
			"item": [
				{
					"name": "create@EntityName@",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:@appPort@@appApiPath@/create@EntityName@",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "@appPort@",
							"path": [
								"@appApiPath@",
								"create@EntityName@"
							]
						}
					},
					"response": []
				},
				{
					"name": "update@EntityName@",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:@appPort@@appApiPath@/@entityName@/{{_id}}",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "@appPort@",
							"path": [
								"@appApiPath@",
								"@entityName@",
								"{{_id}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "delete@EntityName@",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "http://localhost:@appPort@@appApiPath@/@entityName@/{{_id}}",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "@appPort@",
							"path": [
								"@appApiPath@",
								"@entityName@",
								"{{_id}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "get@EntityName@",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:@appPort@@appApiPath@/get@EntityName@/{{_id}}",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "@appPort@",
							"path": [
								"@appApiPath@",
								"get@EntityName@",
								"{{_id}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "getAll@EntityName@",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:@appPort@@appApiPath@/getAll@EntityName@",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "@appPort@",
							"path": [
								"@appApiPath@",
								"getAll@EntityName@"
							]
						}
					},
					"response": []
				},
				{
					"name": "get@EntityName@Pager",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
                        "body": {
							"mode": "raw",
							"raw": "{}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:@appPort@@appApiPath@/get@EntityName@/{{pageSize}}/{{pageNumber}}",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "@appPort@",
							"path": [
								"@appApiPath@",
								"get@EntityName@",
                                "{{pageSize}}",
                                "{{pageNumber}}"
							]
						}
					},
					"response": []
				}
			]
		}
@endpoints@