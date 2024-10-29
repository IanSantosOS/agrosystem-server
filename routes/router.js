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
    const user = await User.findOne({ where: { username: body.username } });
    let userVerified = false;
    if (user) {
        userVerified = await bcrypt.compare(body.password, user.password);
    }

    res.json({ data: userVerified });
});

// router.post('/logout', (req, res) => {});

router.post('/register', async ({ body: user }, res) => {
    if (user.name.trim() === "" || user.username.trim() === "" || user.email.trim() === "" || user.password.trim() === "" ) {
        res.json({ data: false });
    } else if (user.password === user.passwordVerify) {
        await User.create(user);
        res.json({ data: user });
    } else {
        res.json({ data: false });
    }
});

router.put('/update/user/:id', async ({ body, params }, res) => {
    const { id } = params;
    const user = await User.findOne({ where: { id } });

    if (body?.name && body.name.trim() !== "") {
        user.name = body.name;
    }
    if (body?.username && body.username.trim() !== "") {
        user.username = body.username;
    }
    if (body?.email && body.email.trim() !== "") {
        user.email = body.email;
    }

    await user.save();
    res.json({ data: true });
});

router.delete('/delete/user/:id', async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.json({});
});

module.exports = router;