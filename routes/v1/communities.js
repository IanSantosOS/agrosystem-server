const router = require('express').Router();
const Community = require('../../models/Community');

router.get('/communities', async (req, res) => {
    const communities = (await Community.findAll()).map(community => {
        return {
            id: community.id,
            title: community.title,
            description: community.description,
        }
    });

    res.json(communities);
});

router.post('/create/community', async ({ body: community }, res) => {
    const prop1 = !community?.title || !community?.description;
    const prop2 = community?.title?.trim() === "" || community?.description?.trim() === "";
    if (prop1 || prop2) {
        res.json({ data: false });
    } else {
        await Community.create(community);
        res.json({ data: community });
    }
});

router.put('/update/community/:id', async ({ body, params }, res) => {
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

router.delete('/delete/community/:id', async (req, res) => {
    const { id } = req.params;
    await Community.destroy({ where: { id } });
    res.json({});
});

module.exports = router;