# Common Angular Starter Kit

Common Angular Starter Kit including modern tools and workflow based on angular-cli, best practices from the community, a scalable base template and a good learning base.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2.

### Benefits

- Quickstart a project in seconds and focus on features, not on frameworks or tools
- Industrial-grade tools, ready for usage in a continuous integration environment and DevOps
- Scalable architecture with base app template including example components, services and tests

# Getting started

1. Go to project folder and install dependencies:
 ```bash
npm install
 ```
 
2. Launch development server, and open `localhost:4200` in your browser:
```bash
npm start
```

# Project structure

```
doc/                         project coding guides
src/                         project source code
|- app/                      
|  |- core/                  include all elements as root module
|  |- commmon/               include all components implemented as use to shared (common components, directives, services, validator, pipes...)
|  |- layout/                layout module (header, footer, breadcrumb, side-nav...)
|  |- pages/
|  |  |- [feature]/             additional feature (business module) ex: dashboard, admin, setting ... including
|  |  |  |- components/         each component has grouped in seperated folder with name
|  |  |  |  |- component/       
|  |  |  |  |  |- .ts
|  |  |  |  |  |- .html
|  |  |  |  |  |- .scss
|  |  |  |  |  |- .spec.ts
|  |  |  |  |  |- .api.ts
|  |  |  |  |  |- .config.ts
|  |  |  |  |  |- ...
|  |  |  |- feature-routing.module.ts
|  |  |  |- feature.module.ts
|  |  |  |- feature.api.ts      handle Http requests to the Api service
|  |- app-routing.module.ts  app routes
|  |- app.module.ts          app root module definition
|  |- app.facade.ts          a bridge service used to seperate between component and NgRx
|  |- app.component.*        app root component (shell)
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- styles/                   app styles
|- favicon.ico               application index icon 
|- index.html                html entry point
!- karma.conf.js             Karma configuration file
|- polyfills.ts              polyfills needed by Angular
|- test.ts                   unit tests entry point             
.eslintrc.json               project eslint config
angular.json
package-lock.json
package.json    
README.md
tsconfig.app.json            application typescript config
tsconfig.json                project tslint config
tsconfig.spec.json           application typescript config for testing                 
```

# Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

Tasks                         | Description
------------------------------|---------------------------------------------------------------------------------------
npm start                     | Run development server on `http://localhost:4200/`
npm build                     | Lint code and build app for production in `dist/` folder
npm lint                      | Lint code
npm run test                  | Run unit tests via [Karma](https://karma-runner.github.io) in watch mode

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# What's in the box

The app template is based on [HTML5](http://whatwg.org/html), [TypeScript](http://www.typescriptlang.org). The translation files use the common [JSON](http://www.json.org) format.

#### Tools

Development, build and quality processes are based on [angular-cli](https://github.com/angular/angular-cli) and
[NPM scripts](https://docs.npmjs.com/misc/scripts), which includes:

- Optimized build and bundling process with [Webpack](https://webpack.github.io)
- [Development server](https://webpack.github.io/docs/webpack-dev-server.html) with live reload
- Cross-browser CSS with [autoprefixer](https://github.com/postcss/autoprefixer) and
  [browserslist](https://github.com/ai/browserslist)
- Asset revisioning for [better cache management](https://webpack.github.io/docs/long-term-caching.html)
- Unit tests using [Jasmine](http://jasmine.github.io) and [Karma](https://karma-runner.github.io)
- Static code analysis: [TSLint](https://github.com/palantir/tslint), [Codelyzer](https://github.com/mgechev/codelyzer),
  [Stylelint](http://stylelint.io) and [HTMLHint](http://htmlhint.com/)

#### Libraries

- [Angular](https://angular.io)
- [Angular Material](https://material.angular.io/)
- [Angular Firebase](https://github.com/angular/angularfire2)
- [ngx-translate](https://github.com/ngx-translate/core)
- [Lodash](https://lodash.com)
- [Moment](https://momentjs.com)

#### Coding guides

- [Angular](doc/angular.md)
- [TypeScript](doc/typescript.md)
- [Sass](doc/sass.md)
- [HTML](doc/html.md)
- [Unit tests](doc/unit-tests.md)
- [Apply Common Module](doc/common-module.md)

#### Other documentation

- [I18n guide](doc/i18n.md)
- [Updating dependencies and tools](doc/updating.md)

# Licence

The MIT License (MIT)

Copyright (c) 2012-2022 Thales Services SAS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
