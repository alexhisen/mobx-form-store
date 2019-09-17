import chai from 'chai';
import server from './mockServer';
import { extendObservable } from "mobx";

let FormStore;
const npmScript = process.env.npm_lifecycle_event;
if (npmScript === 'test') {
  console.log('Testing compiled version');
  FormStore = require('../lib/FormStore');
} else {
  FormStore = require('../src/FormStore');
}

chai.expect();

const expect = chai.expect;

let store;

const delay = (time = 2) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

describe('FormStore with idProperty and id', function () {
  before(function () {
    store = new FormStore({ name: 'FormStore with idProperty and id', idProperty: 'id', server, /* log: console.log.bind(console) */});
  });

  it('should return the store name', () => {
    expect(store.options.name).to.be.equal('FormStore with idProperty and id');
  });

  describe('after getting the mock data', function () {
    before(async function () {
      server.delete();
      await store.refresh();
    });

    it('should have an email property in data', () => {
      expect(store.data).to.haveOwnProperty('email');
    });

    it('should have a status.isReady of true', () => {
      expect(store.status.isReady).to.be.true;
    });
  });

  describe('after saving bad email', function () {
    before(async function () {
      server.delete();
      await store.refresh();
      store.data.id = '1'; // only mockServer.create validates email, .set does not.
      store.data.email = 'bad';
      await store.save();
    });

    it('should have the email in data', () => {
      expect(store.data.email).to.equal('bad');
    });

    it('should have an error message', () => {
      expect(store.dataErrors.email).to.be.ok;
    });

    it('should have a status.canSave of false', () => {
      expect(store.status.canSave).to.be.false;
    });
  });
});

describe('FormStore with idProperty', function () {
    before(function () {
      store = new FormStore({ name: 'FormStore with idProperty', idProperty: 'id', server, /* log: console.log.bind(console) */});
    });

    describe('after saving for first time', function () {
    before(async function () {
      server.delete();
      await store.refresh();
      store.data.email = 'test@domain.com';
      await store.save({ allowCreate: true });
    });

    it('should have an id', () => {
      expect(store.data.id).to.be.ok;
    });
  });

  describe('refresh with unsaved data', function () {
    before(async function () {
      server.delete();
      await store.refresh();
      store.data.firstName = 'test';
      await store.refresh();
    });

    it('should save it so it\'s returned in refresh', () => {
      expect(store.data.firstName).to.equal('test');
    });
  });
});

describe('FormStore without idProperty', function () {
  const birthdate1 = new Date('2001-01-01');
  const birthdate2 = new Date('2001-01-01'); // same as 1
  const birthdate3 = new Date('2002-01-01');

  before(function () {
    store = new FormStore({ name: 'FormStore without idProperty', server, /* log: console.log.bind(console) */});
  });

  describe('after saving a date', function () {
    before(async function () {
      server.delete();
      await store.refresh();
      store.data.birthdate = birthdate1;
      await store.save();
    });

    it('should have a status.hasChanges of false', () => {
      expect(store.status.hasChanges).to.be.false;
    });
  });

  describe('after setting same date', function () {
    before(async function () {
      store.data.birthdate = birthdate2;
    });

    it('should have a status.hasChanges of false', () => {
      expect(store.status.hasChanges).to.be.false;
    });
  });

  describe('after changing multiple keys and saving', function () {
    before(async function () {
      store.data.firstName = 'test';
      store.data.birthdate = birthdate3;
      await store.save();
    });

    it('should have a status.hasChanges of false', () => {
      expect(store.status.hasChanges).to.be.false;
    });
  });
});

describe('AutoSaving FormStore', function () {
  before(function () {
    store = new FormStore({ name: 'AutoSaving FormStore', idProperty: 'id', autoSaveInterval: 1, server, /* log: console.log.bind(console) */});
  });

  describe('after auto-saving bad email for first time', function () {
    before(async function () {
      server.delete();
      await store.refresh();
      store.data.id = '1'; // only mockServer.create validates email, .set does not.
      store.data.email = 'bad';
      await delay(); // may not be necessary
    });

    it('should have an error message', () => {
      expect(store.dataErrors.email).to.be.ok;
    });
  });

  // relies on id set by test above
  describe('edits in progress', function () {
    it('should not save while editing', async () => {
      store.startEditing('firstName');
      store.data.firstName = 'first';
      await delay();
      // await store.save({ skipPropertyBeingEdited: true, keepServerError: true }); // same as auto-save
      const serverData = await server.get();
      expect(serverData.firstName).to.be.null;
    });

    it('should save when done editing', async () => {
      store.stopEditing();
      await delay();
      // await store.save({ skipPropertyBeingEdited: true, keepServerError: true }); // same as auto-save
      const serverData = await server.get();
      expect(serverData.firstName).to.equal('first');
    });

    it('field in error should remain unsaved', async () => {
      const serverData = await server.get();
      expect(serverData.email).to.be.null;
    });

    it('should save updated field when no longer in error', async () => {
      store.dataErrors.email = null;
      store.data.email = 'test@domain.com';
      await delay();
      // await store.save({ skipPropertyBeingEdited: true, keepServerError: true }); // same as auto-save
      const serverData = await server.get();
      expect(serverData.email).to.equal('test@domain.com');
    });
  });
});

describe('FormStore with minRefreshInterval', function () {
  beforeEach(function () {
    store = new FormStore({
      name: 'FormStore with minRefreshInterval',
      server,
      minRefreshInterval: 5000,
      /* log: console.log.bind(console) */
    });
  });

  it('should not perform a refresh right after prior refresh', async () => {
    server.delete();
    let result = await store.refresh();
    expect(result).to.be.true;
    result = await store.refresh();
    expect(result).to.be.false;
  });

  it('should not perform a refresh during another refresh', async () => {
    server.delete();
    store.refresh();
    const result = await store.refresh();
    expect(result).to.be.false;
  });
});

describe('FormStore with a computed', function () {
  beforeEach(function () {
    store = new FormStore({
      name: 'FormStore with a computed',
      server,
      afterRefresh: async (store) => {
        delete store.data.name;
        extendObservable(store.data, {
          get name() {
            return (store.data.firstName || store.data.lastName) && `${store.data.firstName || ''} ${store.data.lastName || ''}`.trim();
          },
        });
      },
      /* log: console.log.bind(console) */
    });
  });

  it('should update and save computed', async () => {
    server.delete();
    await store.refresh();
    store.data.firstName = 'first';
    store.data.lastName = 'last';
    expect(store.data.name).to.equal('first last');
    await store.save();
    expect(store.dataServer.name).to.equal('first last');
  });

  it('should save computed in saveAll', async () => {
    server.delete();
    await store.refresh();
    store.data.firstName = 'first';
    store.data.lastName = 'lastname';
    await store.save({ saveAll: true });
    expect(store.dataServer.name).to.equal('first lastname');
  });
});
