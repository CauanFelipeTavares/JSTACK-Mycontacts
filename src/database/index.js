const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
})

client.connect()

exports.query = async (query, values) => {

  const { rows } = await client.query(query, values)
    .catch((err) => { // Adição pessoal pra qualquer erro de query não quebrar a aplicação

      console.log(`Erro na query: ${err}`)

      return false

    })

  return rows

}

// Query('SELECT * FROM contacts').then(console.log) // Teste
