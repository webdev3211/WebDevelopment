const Material = require('../model/Material');
const course = require('../model/courses');
const router = require('express').Router();
const path = require('path');

router.get('/material', (req, res) => {
    const materials = Material.find()
        .populate('course')
        .then(docs => {
            // res.json(docs);
            res.json(docs);
        });

    // console.log(materials);
})


router.post('/addMaterials', async(req, res) => {
    
    
    
    newMaterial = new Material({
       course: req.body.courseId,
       materialFile: []
   });

    async function fileupload(){
      return new Promise((resolve,reject)=>{
          var f=1;
        for(var key in req.files){
            material = req.files[key];
           
           filename = Date.now() + material.name.replace(" ","");
           newMaterial.materialFile.push(filename);
           material.mv("uploads/materials/" + filename, (err) => {
               if (!err) {
                   console.log("FILE ADDED SUCCESSFULLY NEW COURSE MATERIAL : " + JSON.stringify(newMaterial));
               }
               else {
                   console.log("FILE cannot be added");
                   f=0;
               }
           });
        }
        resolve(f);
      })
        }

        console.log(newMaterial);
    
    const file = await fileupload();
    

    
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