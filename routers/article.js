const Router = require('express');
const router = new Router();
const controller = require('../controllers/article');
const permission_admin = require('../middleware/permission_admin');


router.post('/createArticle',permission_admin , controller.createArticle);
router.get('/getArticles',permission_admin ,  controller.getArticles);
router.get('/getArticles',controller.getArticles);
router.patch('/updateArticle',permission_admin ,  controller.updateArticle);
router.delete('/deleteArticle',permission_admin ,  controller.deleteArticle);

router.get('/addLanguages', permission_admin , controller.addLanguages)


module.exports = router;
