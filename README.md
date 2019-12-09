# React Node.js Currency

## Dependencies

[Node.js (v12)](https://nodejs.org/en/)\
[Yarn](https://yarnpkg.com/lang/en/)\
[PostgreSQL (v10)](https://www.postgresql.org/)

## Steps to run this project
1. Run `yarn` command to install dependencies
2. Copy `ormconfig_template.json` file to `ormconfig.json` (Use `ormconfig_template_dev.json` for development purposes)
3. Setup database settings inside `ormconfig.json` file (Remember to have your database created)
4. Copy `src/config/config_template.ts` file to `src/config/config.ts`
5. Setup extra settings inside `src/config/config.ts` file
6. Run Migrations (Add some Currencies, Countries and a Admin User)
7. Enter in frontend folder (React)
8. Run `yarn` command to install React dependencies

```
yarn
cp ormconfig_template.json ormconfig.json
nano ormconfig.json
cp src/config/config_template.ts src/config/config.ts
nano src/config/config.ts
yarn run migration:run
cd frontend
yarn
```

## Run as Production
1. Run ./build.sh (In root folder)
2. If you get no errors, open your browser in http://localhost:8080

```
# Remember to use this orm config "ormconfig_template.json"
./build.sh
```

## Run as Development

1. Run `yarn start` in the root folter command to start Node.js backend
2. Open another terminal and enter in folder frontend
4. Run `yarn start` command to start React frontend
5. If you get no errors, open your browser in http://localhost:3000

```
# Remember to use this orm config "ormconfig_template_dev.json"
yarn start
# In other terminal
cd frontend
yarn
yarn start
```

## Testing Backend

1. Build as production

1. Run `yarn test` (same code for Node.js and for React.js)

```
yarn test
# Test React on frontend part
cd frontend
yarn test
```