**LIVE DEMO AVAILABLE** (selfhosted, built and deployed with Jenkins) **: [https://api.pirotechnics.sylvaindenyse.me](http://bit.ly/ApiPiRotechnics 'PiRotechnics API')**

[![Build Status](https://jenkins.sylvaindenyse.me/buildStatus/icon?job=build_PiRotechnics-api)](https://jenkins.sylvaindenyse.me/job/build_PiRotechnics-api)
![Project progress](https://img.shields.io/badge/Project%20progress-60%25-blue.svg)

![PiRotechnics](img/logo.png)

# PiRotechnics

## TODO

- [x] Finish routes
- [x] Handle errors with Hapi (Boom)
- [x] Test routes
- [x] Add Swagger
- [x] Implement canals
- [x] Really mock GPIO
- [ ] Handle data with socket

## Environment variable sample

```bash
export NODE_ENV=development|production

export HAPI_HOST=localhost
export HAPI_PORT=4444

export SWAGGER_HOST=localhost
export SWAGGER_SCHEMES=http

export SQLITE_PATH=piro.db
```

## Specs

Representation of _how to emulate 28 canals with 16 GPIO output_.\
With this implementation, we can use `CanalNumber % 2` to find if the last GPIO must be activated or not.

![Canals implementation](img/canalsOverGpio.png 'Canals over GPIO')
