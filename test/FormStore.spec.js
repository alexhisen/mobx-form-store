import chai from 'chai';
import FormStore from '../lib/FormStore.js';
import server from './mockServer';

chai.expect();

const expect = chai.expect;

let store;

describe('FormStore with idProperty', function () {
  before(function () {
    store = new FormStore({ name: 'MyStore', idProperty: 'id', server });
  });

  it('should return the store name', () => {
    expect(store.options.name).to.be.equal('MyStore');
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
