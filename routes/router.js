const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/users', async (req, res) => {
    const users = (await User.findAll()).map(user => {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
        }
    });

    res.json(users);
});

router.post('/login', async ({ body }, res) => {
    console.log(body)
    const user = await User.findOne({ where: { username: body.username } });
    const passVerified = await bcrypt.compare(body.password, user.password);

    res.json({ data: passVerified });
});

// router.post('/logout', (req, res) => {});

router.post('/register', async ({ body: user }, res) => {
    await User.create(user);
    res.json(user);
});

router.put('/update/user/:id', async (req, res) => {
    const { id } = req.params;
    await User.update(req.body, { where: { id } });
    res.json({});
});

router.delete('/delete/user/:id', async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.json({});
});

module.exports = router;