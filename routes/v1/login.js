const router = require('express').Router();
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Login
router.post('/login', async ({ body }, res) => {
    const { username, password } = body;

    const user = await User.findOne({ where: { username } });

    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: '1h' });
            res.status(200).json({ user, token }); // talvez uma falha de segurança por mostrar a senha (mesmo que criptografada)
        } else {
            res.status(401).json({ error: "Login not successful."});
        }
    } else {http://localhost:3000/  
        res.status(401).json({ error: "Login not successful."});
    }
});

module.exports = router;