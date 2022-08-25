const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).send({ allCategories });
  } catch (err) {
    console.log('Error getting all categories', err);
    res.status(400).send({ err });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const sequelizeOptions = {
    where: {
      id,
    },
    include: [{ 
      model: Product 
    }]
  };

  try {
    const oneCategory = await Category.findOne(sequelizeOptions);
    res.status(200).send({ oneCategory });
  } catch (err) {
    console.log('Error getting that category', err);
    res.status(400).send({ err });
  }
});

router.post('/', async (req, res) => {

    try {
      const createCategory = await Category.create({
        category_id: req.body.category_id,
        category_name: req.body.category_name,
      });
      res.status(200).send({ createCategory });
    } catch (err) {
      console.log('Error creating that category', err);
      res.status(400).send({ err });
    }
  
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const editCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    res.status(200).send({ editCategory });
  } catch (err) {
    console.log('Error editing that category', err);
    res.status(400).send({ err });
  }
  
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const { id } = req.params;

  const sequelizeOptions = {
    where: {
      id,
    },
  };

  try {
    const deleteCategory = await Category.destroy(sequelizeOptions);
    res.status(200).send({ deleteCategory });
  } catch (err) {
    console.log('Error deleting that category', err);
    res.status(400).send({ err });
  }
});

module.exports = router;
