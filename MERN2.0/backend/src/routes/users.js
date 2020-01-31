const {Router} = require('express');
const router = Router();

const { getUser, getUsers, createUsers, updateUser, deleteUser } = require('../controllers/users.controllers');

router.route('/')
    .get(getUsers)
    .post(createUsers);
    
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;