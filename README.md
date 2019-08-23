# MobX FormStore



FormStore is part of a collection of loosely-coupled components for managing, rendering and validating forms in MobX-based apps.

## Detailed Documentation:
https://alexhisen.gitbooks.io/mobx-forms/

## FormStore Overview

Instances of FormStore \(models\) store the data entered by the user into form fields and provide observables for managing validation error messages. They also track changes and provide facilities for \(auto-\)saving the \(changed\) data.

## Features

* Tracks changes in each data property and by default saves only the changes.
* Will not deem a property as changed for string/number, etc datatype changes or different Date objects with the same date.
* Optionally auto-saves incremental changes \(if there are any\) every X milliseconds \(see [autoSaveInterval](https://alexhisen.gitbooks.io/mobx-forms/formstore-constructor.html)\).
* By default, will not \(auto-\)save data properties that failed validation or that are still being edited by the user \(note that FormStore only provides the facilities to track this - validation, etc is done in different components\).
* In a long-running app, can prevent unnecessary server requests to refresh data in the model by limiting them to not occur more often than Y milliseconds \(see [minRefreshInterval](https://alexhisen.gitbooks.io/mobx-forms/formstore-constructor.html)\).
* Will auto-save any unsaved data when attempting to refresh to prevent loss of user-entered data.
* Provides observable properties to drive things like loading indicators, enabling/disabling form or save button, error and confirmation messages, etc.
* Server [responses](https://alexhisen.gitbooks.io/mobx-forms/formstore-server-errors.html) to save requests can drive error / validation messaging and discard invalid values.
* Can differentiate between 'create' and 'update' save operations. A model that has not yet been created on the server will not try to refresh from server.
* Saves are queued automatically, never concurrent.
* \(NEW in v1.3\) Auto-save can be dynamically configured and enabled or disabled

## Requirements

FormStore only requires [MobX](https://mobx.js.org/) 2.2+, 3.x, 4.x or 5.x. _MobX strict mode is currently not supported._ It is published in NPM as an ES5 universal module, including a minified version. **FormStore does not implement the actual server requests, it only calls methods that you provide with the data to be sent to the server.**

## Installation

```
npm install --save mobx-form-store
```

## Minimal Usage Example

myStore.js \(a Singleton\):

```js
import FormStore from 'mobx-form-store';

const model = new FormStore({
  server: {
    // Example uses ES5 with https://github.com/github/fetch API and Promises
    get: function() {
      return fetch('myServerRefreshUrl').then(function(result) { return result.json() });
    },

    // Example uses ES6, fetch and async await
    set: async (info) => {
      const result = await fetch('myServerSaveUrl', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });
      return await result.json() || {}; // MUST return an object
    }
  },
});

export default model;
```

> IMPORTANT: Your server.get method MUST return an object with ALL properties that need to be rendered in the form. If the model does not yet exist on the server, each property should have a null value but it must exist in the object or it cannot be observed with MobX.

## Example of using FormStore in a React form

myForm.jsx \(this is _without_ MobxSchemaForm \(with it there is even less code\)\).

```js
import React from 'react';
import { observer } from 'mobx-react';
import model from './myStore.js'

@observer class MyForm extends React.Component {
  componentDidMount() {
    model.refresh();
  }

  onChange = (e) => {
    model.data[e.target.name] = e.target.value;
    model.dataErrors[e.target.name] = myCustomValidationPassed ? null : "error message";
  }

  onSaveClick = () => {
    if (!model.status.canSave || !model.status.hasChanges) return;
    if (myCustomValidationPassed) model.save();
  }

  render() {
    return (
      {/* ... more fields / labels ... */}

      <label className={model.dataErrors.myProperty ? 'error' : ''}>My Property</label>
      <input
        type="text"
        name="myProperty"
        className={model.dataErrors.myProperty ? 'error' : ''}
        value={model.data.myProperty || ''}
        readonly={model.status.isReadOnly}
        onChange={this.onChange}
      />
      <p>{model.dataErrors.myProperty}</p>

      <button
        className={(!model.status.canSave || !model.status.hasChanges) ? 'gray' : ''}
        onClick={this.onSaveClick}
      >
        Save
      </button>
    );
  }
}
```

