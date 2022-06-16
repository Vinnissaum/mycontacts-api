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

  store() {
    // Criar novo registro
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
