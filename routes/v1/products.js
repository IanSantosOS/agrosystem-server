const router = require('express').Router();
const Product = require('../../models/Product');

router.get('/products', async (req, res) => {
    const products = (await Product.findAll()).map(products => {
        return {
            id: products.id,
            name: products.name,
            price: products.price,
            qnt: products.qnt,
        }
    });

    res.json(products);
});

router.post('/create/product', async ({ body: product }, res) => {
    const prop1 = !product?.name || !product?.price || !product?.qnt;
    const prop2 = product?.name?.trim() === "" || product?.price < 0 || product?.qnt < 0;
    if (prop1 || prop2) {
        res.json({ data: false });
    } else {
        await Product.create(product);
        res.json({ data: product });
    }
});

router.put('/update/product/:id', async ({ body, params }, res) => {
    const { id } = params;
    const product = await Product.findOne({ where: { id } });

    if (body?.name && body.name.trim() !== "") {
        product.name = body.name;
    }
    if (body?.price && body?.price >= 0 && typeof body?.price === 'number') {
        product.price = body.price;
    }
    if (body?.qnt && body?.qnt >= 0 && typeof body?.qnt === 'number') {
        product.qnt = body.qnt;
    }

    await product.save();
    res.json({ data: true });
});

router.delete('/delete/product/:id', async (req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.json({});
});

module.exports = router;