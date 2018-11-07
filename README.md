# writers-blog
# WIP

This is blog application written with EmberJS and Firebase.
Live demo [writers-blog-test.firebaseapp.com](https://writers-blog-test.firebaseapp.com/)

## Installation

* `git clone <repository-url>` this repository
* `cd writers-blog`
* `yarn install`
* create new free [Firebase](https://console.firebase.google.com/) project
* create `.env` file in the the root directory and add `FIREBASE_KEY=YourFirebaseApiKey` line
* edit `environment.js`'s firebase settings

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
