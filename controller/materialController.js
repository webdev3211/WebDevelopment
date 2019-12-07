const Material = require("../model/Material");
const course = require("../model/courses");
const router = require("express").Router();
const path = require("path");

router.get("/material", (req, res) => {
  const materials = Material.find()
    .populate("course", ["name"])
    .then(docs => {
      // res.json(docs);
      res.json(docs);
    });

  // console.log(materials);
});

router.post("/addMaterials/:id", (req, res) => {
  var newMaterial, i;
  allmaterials = [];
  if (!Array.isArray(req.files.file)) {
    i = 1;
  } else {
    i = req.files.file.length;
  }
  for (var key = 0; key < i; key++) {
    i === 1 ? (material = req.files.file) : (material = req.files.file[key]);

    filename = Date.now() + material.name.replace(" ", "");

    newMaterial = new Material({
      course: req.params.id,
      materialFile: filename
    });
    console.log(newMaterial);

    newMaterial.save((err, docs) => {});

    allmaterials.push(newMaterial);
    material.mv(
      `../WebDevelopment/client/public/uploads/materials/${filename}`,
      err => {
        if (!err) {
          console.log(
            "FILE ADDED SUCCESSFULLY NEW COURSE MATERIAL : " +
              JSON.stringify(newMaterial)
          );
        } else {
          console.log("FILE cannot be added");
        }
      }
    );
  }
  res.json(allmaterials);
});
var options = {
  root: __dirname + "/../uploads/materials/"
};
router.get("/downloadMaterial/:id", (req, res) => {
  Material.findById(req.params.id).then(doc => {
    console.log();
    for (var i = 0; i < doc.materialFile.length; i++) {
      res.download(
        __dirname + "/../uploads/materials/" + doc.materialFile[i],
        doc.materialFile[i],
        err => {
          if (!err) {
            console.log("nO error");
          } else {
            console.log("ERROR :" + err);
          }
        }
      );
    }
  });
});

router.delete("/material/:id", (req, res) => {
  Material.findByIdAndDelete(req.params.id)
    .then(doc => {
      res.status(200).send("Successfully deleted the Material ");
    })
    .catch(err => {
      res.status(402).send("Error deleting the material");
    });
});
module.exports = router;
