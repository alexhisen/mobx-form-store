import extend from "just-extend";

/* eslint-disable import/no-mutable-exports */
let server;
/* eslint-enable */

const record = {
  id: null,
  firstName: null,
  lastName: null,
  name: null,
  email: null,
  phone: null,
  birthdate: null,
  hobbies: [],
  attributes: {
    weight: null,
    height: null, // we prevent changes to this one
  },
};

function getRecord() {
  const deep = true;
  return JSON.parse(localStorage.getItem('mockServerUser')) || extend(deep, {}, record);
}

function setRecord(data) {
  localStorage.setItem('mockServerUser', JSON.stringify(data));
}

class MockServer {
  async get() {
    const data = getRecord();
    Object.keys(data).filter((key) => key.match(/date/i)).forEach((key) => {
      data[key] = data[key] && new Date(data[key]);
    });
    return data;
  }

  async create(info) {
    const data = { id: 123 };
    setRecord(Object.assign(getRecord(), info, data));
    return { data };
  }

  async set(info) {
    const response = {};
    if (info.email && !info.email.match(/@/)) {
      info = Object.assign({}, info);
      delete info.email;
      response.status = 'error';
      response.error = {
        email: 'Invalid email address',
      };
    }
    if (info.attributes) {
      delete info.attributes.height;
    }
    setRecord(Object.assign(getRecord(), info));
    return response;
  }

  delete() {
    localStorage.removeItem('mockServerUser');
  }
}

server = new MockServer(); // eslint-disable-line prefer-const
// Store Singleton in window for ease of debugging:
if (typeof window !== 'undefined') {
  window.server = server;
}
export default server;
