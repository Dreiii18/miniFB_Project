const express = require('express');
const router = express.Router();
const contacts = require('../Contacts');

// get contacts
router.get('/', (req, res) => res.json(contacts));

// get a specific contact
router.get('/search', (req, res) => {
    const name = req.query.name;
    const filteredContacts = contacts.filter(contact => contact.text.toLowerCase().includes(name.toLowerCase()));

    if (filteredContacts.length === 0) {
        return res.status(404).json({
            'message': 'No contacts found'
        })
    }

    res.json(filteredContacts);
});

module.exports = router;