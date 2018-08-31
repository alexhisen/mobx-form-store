import chai from 'chai';
import server from './mockServer';

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

describe('FormStore with idProperty', function () {
  before(function () {
    store = new FormStore({ name: 'MyStore1', idProperty: 'id', server, /* log: console.log.bind(console) */ });
  });

  it('should return the store name', () => {
    expect(store.options.name).to.be.equal('MyStore1');
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

  describe('after saving for first time', function () {
    before(async function () {
      server.delete();
      await store.refresh();
      await store.save();
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

describe('AutoSaving FormStore', function () {
  before(function () {
    store = new FormStore({ name: 'MyStore2', idProperty: 'id', autoSaveInterval: 1, server, /* log: console.log.bind(console) */ });
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
});

describe('FormStore with minRefreshInterval', function () {
  beforeEach(function () {
    store = new FormStore({
      name: 'MyStore3',
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