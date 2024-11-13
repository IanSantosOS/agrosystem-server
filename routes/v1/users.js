const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

// Login
router.post('/login', async ({ body }, res) => {
    const user = await User.findOne({ where: { username: body.username } });
    let userVerified = false;
    if (user) {
        userVerified = await bcrypt.compare(body.password, user.password);
    }

    res.json({ data: userVerified });
});

// Logout
// router.post('/logout', (req, res) => {});

// Get All Users
router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
        }
    });

    res.json(users);
});

// Get One User
router.get('/:id', async ({ params }, res) => {
    const { id } = params;
    const user = await User.findOne({
        where: { id },
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
        }
    });

    res.json(user);
});

// Create New User
router.post('/', async ({ body: user }, res) => {
    if (user.name.trim() === "" || user.username.trim() === "" || user.email.trim() === "" || user.password.trim() === "" ) {
        res.json({ data: false });
    } else if (user.password === user.passwordVerify) {
        await User.create(user);
        res.json({ data: user });
    } else {
        res.json({ data: false });
    }
});

// Update User
router.patch('/:id', async ({ body, params }, res) => {
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

// Delete User
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.json({});
});

// Export Route
module.exports = router;