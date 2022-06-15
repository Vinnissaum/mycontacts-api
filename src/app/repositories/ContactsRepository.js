const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Vinicius',
    email: 'vinicius@mail.com',
    phone: '123-456-1234',
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => { resolve(contacts); });
  }
}

module.exports = new ContactsRepository();
