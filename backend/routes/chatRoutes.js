const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroupChat,
    deleteGroupChat,
    addToGroupChat
} = require('../controllers/chatControllers');

const router = express.Router();

router.route('/').post(protect , accessChat);
router.route('/').get(protect , fetchChats);
router.route('/group').post(protect , createGroupChat);
router.route('/rename').put(protect , renameGroupChat);
router.route('/grouprename').put(protect , renameGroupChat);
router.route('/groupremove').delete(protect , deleteGroupChat);
router.route('/groupadd').put(protect , addToGroupChat);

module.exports = router;