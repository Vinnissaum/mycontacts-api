const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Lista todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    // Obter UM registro
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404 Not Found
      return response.status(404).json({ error: 'Contact Not Found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    // Criar novo registro
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'This email already has been used' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    // Editar um registro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);
    const contactEmailExists = await ContactsRepository.findByEmail(email);

    if (!contactExists) {
      return response.status(400).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (contactEmailExists && id !== contactEmailExists.id) {
      return response.status(400).json({ error: 'This email already has been used' });
    }

    const updatedContact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });
    response.json(updatedContact);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    await ContactsRepository.delete(id);
    // 204 No Content
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
