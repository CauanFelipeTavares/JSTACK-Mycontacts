const ContactRepository = require('../repositories/ContactRepository')

class ContactController{

  async index(req, res){

    // Listar todos os registros
    const contacts = await ContactRepository.findAll()

    res.json(contacts)

  }

  async show(req, res){

    // Obter 1 registro
    const { id } = req.params
    const contact = await ContactRepository.findById(id)

    if (!contact){

      return res.status(404).json({ error: 'User not found' })

    }

    res.json(contact)

  }

  async store(req, res){

    // Criar novo registro
    const {
      name, email, phone, category_id,
    } = req.body

    if (!name) return res.status(400).json({ error: 'Name is required' })

    const contactExists = await ContactRepository.findByEmail(email)

    if (contactExists) return res.status(400).json({ error: 'This email is alredy in use' })

    const contact = await ContactRepository.create(name, email, phone, category_id)

    res.json(contact)

  }

  async update(req, res){

    // Atualiza novo registro
    const { id } = req.params
    const {
      name, email, phone, category_id,
    } = req.body

    const contactExists = await ContactRepository.findById(id)

    if (!contactExists) return res.status(400).json({ error: 'User not found' })

    const contactByEmail = await ContactRepository.findByEmail(email)

    if (contactByEmail && contactByEmail.id !== id) return res.status(400).json({ error: 'This email is alredy in use' })

    const contact = await ContactRepository.update(
      id,
      name,
      email,
      phone,
      category_id,
    )

    res.json(contact)

  }

  async delete(req, res){

    // Deleta novo registro
    const { id } = req.params
    const contact = await ContactRepository.findById(id)

    if (!contact){

      return res.status(404).json({ error: 'User not found' })

    }

    await ContactRepository.delete(id)

    res.sendStatus(204) // OK: No content

  }

}

module.exports = new ContactController()
