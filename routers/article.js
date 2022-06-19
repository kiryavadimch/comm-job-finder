const Router = require('express');
const router = new Router();
const controller = require('../controllers/article');
const permission_volunteer = require('../middleware/permission_volunteer');
const permission_company = require('../middleware/permission_company');

router.post('/createArticle', controller.createArticle);
router.get('/getArticles', controller.getArticles);
router.patch('/updateArticle', controller.updateArticle);
router.delete('/deleteArticle', controller.deleteArticle);
// router.patch('/addTags', controller.addTags);
router.get('/addLanguages', /*ADMIN_PERMISSION_HERE,*/controller.addLanguages)
// router.delete('/deleteTag', controller.deleteTag);

module.exports = router;
