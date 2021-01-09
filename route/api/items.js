const express = require('express')
const router = express.Router()
const methodOverride = require('method-override')

router.use(methodOverride('_method'))

//Item Model
const Item = require('../../model/Item')

// @route GET api/items
// @desc GET All Items
// @access Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((item) => res.json(item))
})

// @route POST api/items
// @desc Create An Item
// @access Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  })
  newItem.save().then((item) => res.json(item))
})

// @route DELETE api/items/:id
// @desc Delete An Item
// @access Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }))
})

// @route PUT api/items/:id
// @desc Update An Item
// @access Public
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    })
    await item.save().then((item) => res.json(item))
  } catch (err) {
    res.status(404).json({ success: false })
  }
})

module.exports = router
