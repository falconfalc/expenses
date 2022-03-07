#!/bin/bash

ARGS=""

while test $# -gt 0; do
    case "$1" in
        --dev)
            ./node_modules/.bin/nodemon --experimental-specifier-resolution=node server.js | ./node_modules/.bin/pino-colada
            ;;
        --dev-trace-warnings)
            ./node_modules/.bin/nodemon --experimental-specifier-resolution=node --trace-warnings server.js | ./node_modules/.bin/pino-colada
            shift
            ;;
        --prod)
            node --experimental-specifier-resolution=node server.js | ./node_modules/.bin/pino-colada
            shift
            ;;
        *)
            exit 1
            shift
            ;;
    esac
done