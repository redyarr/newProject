const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table');
const home = require('../controllers/home');

const auth = require('../middleware/is-auth');

router.get('/userTable',auth ,tableController.getTable);
router.post('/:id/delete', auth,tableController.deleteUser);
router.get('/:id/edit', auth,tableController.getEditUser);
router.post('/:id/edit', auth,tableController.postEditUser);

router.get('/addAnime',auth,home.getAddAnime);
router.post('/addAnime',auth,home.postAddAnime);
router.post('/deleteCard',auth,home.postDeteleCard);

module.exports = router;
