const { v4 } = require('uuid')

const db = require('../../database')

let contacts = [
  {
    id: v4(),
    name: 'Cauan',
    email: 'tavarescauanf@gmail.com',
    phone: '17992318569',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Cauan 2',
    email: 'tavarescauanf2@gmail.com',
    phone: '217992318569',
    category_id: v4(),
  },
]

class ContactRepository{

  async findAll(){

    const rows = await db.query('SELECT * FROM contacts')

    return rows

  }

  async findById(id){

    const [row] = await db.query(`
        SELECT * FROM contacts
        WHERE id = $1
    `, [id])

    return row

  }

  async findByEmail(email){

    const [row] = await db.query(`
        SELECT * FROM contacts
        WHERE email = $1
    `, [email])

    return row

  }

  async create(name, email, phone, category_id){

    /*

        ISSO PERMITE SQL INJECTION
        Ex: name = ';

        INSERT INTO contacts(name, email, phone, category_id)
        VALUES('${name}', '${email}', '${phone}', '${category_id}')

    */

    const [row] = await db.query(`
        INSERT INTO contacts(name, email, phone, category_id)
        VALUES($1, $2, $3, $4)
        RETURNING *
    `, [name, email, phone, category_id])

    /*

        $1 -> name
        $2 -> email
        $3 -> phone
        $4 -> category_id

    */

    return row

  }

  update(
    id,
    name,
    email,
    phone,
    category_id,
  ){

    return new Promise((res) => {

      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      }

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ))

      res(updatedContact)

    })

  }

  delete(id){

    return new Promise((res) => {

      contacts = contacts.filter((contact) => contact.id !== id)
      res()

    })

  }

}

module.exports = new ContactRepository()
