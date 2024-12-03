const router = require('express').Router();
const { Product } = require('../../models');

// Get All Products
router.get('/', async (req, res) => {
    const products = await Product.findAll();

    res.json(products);
});

// Get One Product
router.get('/:id', async ({ params }, res) => {
    const { id } = params;
    const product = await Product.findOne({ where: { id } });

    res.json(product);
});

// Create New Product
router.post('/', async ({ body: product }, res) => {
    const prop1 = !product?.name || !product?.price || !product?.qnt;
    const prop2 = product?.name?.trim() === "" || product?.price < 0 || product?.qnt < 0;
    if (prop1 || prop2) {
        res.json({ data: false });
    } else {
        await Product.create(product);
        res.json({ data: product });
    }
});

// Update Product
router.patch('/:id', async ({ body, params }, res) => {
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

// Delete Product
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.json({});
});

// Export Route
module.exports = router;