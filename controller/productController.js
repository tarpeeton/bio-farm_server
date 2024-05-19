const productSchema = require('../model/productModel');

// Create Product
exports.createProduct = async (req, res, next) => {
    try {
        const { productname , description , soldOut , status , discount  } = req.body;
        const productImages = req.files;
        const images = Array.isArray(productImages) ? productImages : [productImages];
        const imageNames = images.map(image => image.filename);
        const newProduct = new productSchema({
            productname,
            description,
            soldOut,
            status,
            discount,
            image: imageNames
        });
        const result = await newProduct.save();
        res.status(201).json({ success: true, result });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server xatosi' });
    }
};

// Get Product by ID
exports.getProductWithID = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const product = await productSchema.findById(_id).lean();

        if (!product) {
            return res.status(404).json({ success: false, error: 'Maxsulot topilmadi' });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server xatosi' });
    }
};
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productSchema.find().lean();
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server xatosi' });
    }
}
