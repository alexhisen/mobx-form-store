import chai from 'chai';
import FormStore from '../lib/FormStore.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of FormStore', function () {
  before(function () {
    lib = new FormStore({ server: { get: function(){}, set: function(){} } });
  });
  describe('when I need the name', function () {
    it('should return the name', () => {
      expect(lib.options.name).to.be.equal('FormStore');
    });
  });
});
