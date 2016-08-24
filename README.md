# ADMIN CONSOLE GETKONG
====

To be described.

# Kong Admin (First steps to test)

## Connection to admin
curl -i -X POST --url http://localhost:8001/apis/ --data 'name=kong' --data 'upstream_url=http://localhost:8001' --data 'request_path=/kong' --data 'strip_request_path=true'

## Basic Authorization
curl -X POST http://localhost:8001/apis/kong/plugins --data 'name=basic-auth' --data 'config.hide_credentials=true'

## Admin consumer
curl -d 'username=kong_admin&custom_id=8a0f4c41-a9a9-4f84-8bd4-d9b9085b4569' http://localhost:8001/consumers/

## Admin credential
curl -X POST http://localhost:8001/consumers/kong_admin/basic-auth --data 'username=king' --data 'password=12345678'

## Cors
curl -X POST http://localhost:8001/apis/kong/plugins --data 'name=cors' --data 'config.credentials=false' --data 'config.preflight_continue=false'