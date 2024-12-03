const router = require('express').Router();
const { Community } = require('../../models');

// Get All Communities
router.get('/', async (req, res) => {
    const communities = await Community.findAll();

    res.json(communities);
});

// Get One Community
router.get('/:id', async ({ params }, res) => {
    const { id } = params;
    const community = await Community.findOne({ where: { id } });

    res.json(community);
});

// Create new Community
router.post('/', async ({ body: community }, res) => {
    const prop1 = !community?.title || !community?.description;
    const prop2 = community?.title?.trim() === "" || community?.description?.trim() === "";
    if (prop1 || prop2) {
        res.json({ data: false });
    } else {
        await Community.create(community);
        res.json({ data: community });
    }
});

// Update Community
router.patch('/:id', async ({ body, params }, res) => {
    const { id } = params;
    const community = await Community.findOne({ where: { id } });

    if (body?.title && body.title.trim() !== "") {
        community.title = body.title;
    }
    if (body?.description && body.description.trim() !== "") {
        community.description = body.description;
    }

    await community.save();
    res.json({ data: true });
});

// Delete Community
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Community.destroy({ where: { id } });
    res.json({});
});

// Export Route
module.exports = router;