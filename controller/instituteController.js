const mongoose = require("mongoose");
const Institute = require("../model/institute").InstituteModel;
const router = require("express").Router();

var multer = require("multer");
const passport = require("passport");

//validation
const validateInstituteInput = require("../validation/admin/institute");

/* 
    @routes 
        1. institutes : to view all institutes
        2. addInstitute : to add new institute
        3. addCampusAmbassador : to add new campus ambassador it take id of the institute as a parameter
        4. removeCampusAmbassador : to remove the campus ambassador it take id of the institute as a parameter 

*/

// var store = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads/institute");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "." + file.originalname);
//   }
// });

// var upload = multer({ storage: store }).single("file");

router.get(
  "/institutes",
  async (req, res) => {
    findInstitutes = await Institute.find();
    res.send(findInstitutes);
  }
);


router.get("/institute/:name", (req, res) => {
  const errors = {};

  Institute.findOne({ name: req.params.name })
    .then(institute => {
      if (!institute) {
        errors.noinstitute = "There is no institute with this id";
        res.status(404).json(errors);
      }

      res.json(institute.class);
    })
    .catch(err =>
      res.status(404).json({ institute: "There is no institute with this id" })
    );
});


router.post("/addInstitute", async (req, res) => {
  // filename = await fileupload(req, res);
  const { errors, isValid } = validateInstituteInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Institute.findOne({ name: req.body.name.toUpperCase() }).then(institute => {
    if (institute) {
      errors.name = "This institute already exists";
      return res.status(400).json(errors);
    } else {

      var Class = req.body.class.split(",");

      //trim and capatalize
      for (var i = 0; i < Class.length; i++) {
        var vall = Class[i];
        Class[i] = vall.toUpperCase().trim();
      }



      var institute = new Institute({
        name: req.body.name.toUpperCase(),
        campusAmbassador: req.body.campusAmbassador,
        // image: filename,
        state: req.body.state.toUpperCase().trim(),
        city: req.body.city.toUpperCase().trim(),
        website: req.body.website,
        class: Class
      });


      institute.save((err, docs) => {
        if (!err) {
          res.send(docs);
        } else {
          console.log(JSON.stringify(err));
        }
      });
    }
  });
});



router.put("/addCampusAmbassador/:id", async (req, res) => {
  id = req.params.id;
  var institute = await Institute.findById(id);
  console.log(institute);
  institute.campusAmbassador = req.body.campusAmbassador || "";
  const result = await institute.save();
  res.send(result);
});

router.put("/removeCampusAmbassador/:id", async (req, res) => {
  id = req.params.id;
  var institute = await Institute.findById(id);
  console.log(institute);
  institute.campusAmbassador = "";
  const result = await institute.save();
  res.send(result);
});

module.exports = router;

// async function fileupload(req, res) {
//   return new Promise(resolve => {
//     upload(req, res, err => {
//       if (!err) {
//         console.log(req.file.filename);
//         resolve(req.file.filename);
//       } else {
//         console.log(JSON.stringify(err));
//       }
//     });
//   });
// }
