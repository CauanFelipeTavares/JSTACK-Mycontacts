const { v4 } = require('uuid')

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

  findAll(){

    return new Promise((res) => {

      res(contacts)

    })

  }

  findById(id){

    return new Promise((res) => {

      res(contacts.find((contact) => contact.id === id))

    })

  }

  findByEmail(email){

    return new Promise((res) => {

      res(contacts.find((contact) => contact.email === email))

    })

  }

  create(name, email, phone, category_id){

    return new Promise((res) => {

      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      }

      contacts.push(newContact)
      res(contacts)

    })

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
