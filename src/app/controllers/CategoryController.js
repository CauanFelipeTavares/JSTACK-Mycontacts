const CategoryRepository = require('../repositories/CategoryRepository')

class CategoryController{

  async index(req, res){

    const categories = await CategoryRepository.findAll()

    res.json(categories)

  }

  async show(req, res){

    // Obter 1 registro
    const { id } = req.params
    const category = await CategoryRepository.findById(id)

    if (!category){

      return res.status(404).json({ error: 'Category not found' })

    }

    res.json(category)

  }

  async store(req, res){

    const { name } = req.body

    if (!name) return res.status(400).json({ error: 'Name is required' })

    const category = await CategoryRepository.create(name)

    res.json(category)

  }

  async update(req, res){

    // Atualiza novo registro
    const { id } = req.params
    const {
      name,
    } = req.body

    const categoryExists = await CategoryRepository.findById(id)

    if (!categoryExists) return res.status(400).json({ error: 'Category not found' })

    const categoryByName = await CategoryRepository.findByName(name)

    if (categoryByName && categoryByName.id !== id) return res.status(400).json({ error: 'This name is alredy in use' })

    const category = await CategoryRepository.update(
      id,
      name,
    )

    res.json(category)

  }

  async delete(req, res){

    // Deleta novo registro
    const { id } = req.params

    await CategoryRepository.delete(id)

    res.sendStatus(204) // OK: No content

  }

}

module.exports = new CategoryController()
