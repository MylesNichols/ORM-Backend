const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', (req, res) => {
Tag.findAll({
  include: [
  {
    model: Product,
    through: ProductTag,
  },
    ],
  })
  .then((tags) => res.json(tags))
  .catch((err) => {
  console.log(err);
  res.status(500).json(err);
  });
});

  // find a single tag by its `id`
router.get('/:id', (req, res) => {
Tag.findOne({
  where: {
    id:req.params.id
  },
  include: [
    {
      model: Product,
      through: ProductTag
    }
  ]
})
.then((Tag) => {
  if (!Tag) {
    res.status(404).json({ message: 'No tag was found'});
    return;
  }
  res.json(Tag)
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then(Tag => res.status(201).json(Tag))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
Tag.update(
  {
    tag_name: req.body.tag_name,
})
.then((Tag) => {
  if (!Tag[0]) {
    res.status(404).json({ message: 'Tag not found with the given id' });
    return;
  }
  res.json(Tag);
})
.catch((err) => {
console.log(err);
res.status(400).json(err);
});
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
Tag.destroy({
  where: {
    id: req.params.id,
  }
})
.then((Tag) => {
  if (!Tag) {
    res.status(404).json({ message: 'No tag found with given id' });
    return;
  }
  res.json(Tag);
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
})
});

module.exports = router;
