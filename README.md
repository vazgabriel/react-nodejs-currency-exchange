# React Node.js Currency

## Dependencies

[Node.js (v10)](https://nodejs.org/en/)\
[Yarn](https://yarnpkg.com/lang/en/)\
[PostgreSQL (v10)](https://www.postgresql.org/)

## Steps to run this project

1. Run `yarn` command to install dependencies
2. Copy `ormconfig_template.json` file to `ormconfig.json`
3. Setup database settings inside `ormconfig.json` file (Remember to have your database created)
4. Copy `src/config/config_template.ts` file to `src/config/config.ts`
5. Setup extra settings inside `src/config/config.ts` file
6. Run `yarn start` command

```
yarn
cp ormconfig_template.json ormconfig.json
nano ormconfig.json
cp src/config/config_template.ts src/config/config.ts
nano src/config/config.ts
yarn start
```