const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).send({ allTags });
  } catch (err) {
    console.log('Error getting all tags', err);
    res.status(400).send({ err });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
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
    const oneTag = await Tag.findOne(sequelizeOptions);
    res.status(200).send({ oneTag });
  } catch (err) {
    console.log('Error getting that tag', err);
    res.status(400).send({ err });
  }
});

router.post('/', async (req, res) => {

    try {
      const createTag = await Tag.create({
        tag_id: req.body.tag_id,
        tag_name: req.body.tag_name,
      });
      res.status(200).send({ createTag });
    } catch (err) {
      console.log('Error creating that tag', err);
      res.status(400).send({ err });
    }
  
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const editTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    res.status(200).send({ editTag });
  } catch (err) {
    console.log('Error editing that tag', err);
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
    const deleteTag = await Tag.destroy(sequelizeOptions);
    res.status(200).send({ deleteTag });
  } catch (err) {
    console.log('Error deleting that tag', err);
    res.status(400).send({ err });
  }
});

module.exports = router;
