# amenities_API
Automated API Tests with Cypress for Amenities API

## Installation

Navigate to Project folder.
Run ```npm install```

## Usage

Requires the presence of `.env`, `.env.sndbx` or `.env.stg` file in the root folder. 

### To open Cypress on the environment determined by `.env` file:
```
npm run cy:open
```
To run headless:
```
npm run cy:run
```

### To open on Sandbox environment:
```
npm run cy:open:sndbx
```
To run headless:
```
npm run cy:run:sndbx
```

### To open on Staging environment:
```
npm run cy:run:stg
```
To run headless:
```
npm run cy:open:stg
```