const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Lista todos os registros
    const contacts = await ContactsRepository.findAll();

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

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (contactExists) {
      return response.status(400).json({ error: 'This email already has been used' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  update() {
    // Editar um registro
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404 not found
      response.send({ error: 'Contact Not Found' });
    }
    await ContactsRepository.delete(id);
    // 204 No Content
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
