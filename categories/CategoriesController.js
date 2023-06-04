const express = require('express');
const router = express.Router();
const Category = require('./Category');
const Slugify = require('slugify');

// Rota para criar uma nova categoria
router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new')
});


// Rota para salvar uma categoria
router.post('/categories/save', (req, res) => {
    var title = req.body.title;
    if(title != undefined) {
        Category.create({
            title: title,
            slug: Slugify(title)
        })
        .then(() => res.redirect('/admin/categories'));
    }
    else {
        res.redirect('/admin/categories/new');
        alert('Nenhum titulo informado!')
    }
});

// Rota para a página principal de Categorias
router.get('/admin/categories', (req, res) => {

    Category.findAll().then(Categories => {
        res.render('/admin/categories/index', {
            categories: Categories
        });
    })
})

router.post('/categories/delete', (req, res) => {
    var id = req.body.id;
    if(id != undefined) {
        if(!isNaN(id)){

            Category.destroy({
                where: {
                    id: id
                }
            })
            .then(() => res.redirect('/admin/categories'));

        } else { //SE NÃO FOR UM NÚMERO
            res.redirect("/admin/categories");
        }
    } else { //SE NULL
        res.redirect("/admin/categories");
    }
});

module.exports = router;