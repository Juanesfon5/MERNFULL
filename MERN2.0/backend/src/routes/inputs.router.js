const {Router} = require('express');
const router = Router();
const { getInputs, getInput, createInputs, deleteInput, updateInput } = require('../controllers/input.controller');

router.route('/')
    .get(getInputs)
    .post(createInputs);

router.route('/:id')
    .get(getInput)
    .put(updateInput)
    .delete(deleteInput);

module.exports = router;