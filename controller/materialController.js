const Material = require('../model/Material');
const course = require('../model/courses');
const router = require('express').Router();
const path = require('path');

router.get('/material', (req, res) => {
    const materials = Material.find()
        .populate('course')
        .then(docs => {
            // res.json(docs);
            console.log(docs);
        });

    // console.log(materials);
})


router.post('/addMaterials', (req, res) => {
    material = req.files.material;
    filename = Date.now() + material.name.replace(" ","");
     newMaterial = new Material({
        course: req.body.courseId,
        materialFile: filename
    });

    material.mv("uploads/materials/" + filename, (err) => {
        if (!err) {
            console.log("FILE ADDED SUCCESSFULLY NEW COURSE MATERIAL : " + JSON.stringify(newMaterial));
        }
        else {
            console.log("FILE cannot be added");
        }
    });

    newMaterial.save()
        .then(docs => {
        res.send(docs);
         })
        .catch(err => {
            res.send(err);
        })
});
var options = {
    root: __dirname + '/../uploads/materials/' 
};
router.get('/downloadMaterial/:id', (req, res) => {
    Material.findById(req.params.id).then(doc => {
        
        res.download(  __dirname + '/../uploads/materials/' +doc.materialFile,doc.materialFile, (err) => {
            if (!err) {
                console.log("nO error");

            }
            else {
                console.log("ERROR :" + err);
            }
        });
    })

})

router.delete('/material/:id', (req, res) => {
    Material.findByIdAndDelete(req.params.id).then(doc => {
        res.status(200).send("Successfully deleted the Material ");
    }).catch(err => {
        res.status(402).send("Error deleting the material");
    })
})
module.exports = router;