const mongoose = require("mongoose");
const Institute = require("../model/institute").InstituteModel;
const router = require("express").Router();



/* 
    @routes 
        1. institutes : to view all institutes
        2. addInstitute : to add new institute
        3. addCampusAmbassador : to add new campus ambassador it take id of the institute as a parameter
        4. removeCampusAmbassador : to remove the campus ambassador it take id of the institute as a parameter 

*/


router.get("/institutes", async(req, res) => {
    findInstitutes = await Institute.find();
    res.send(findInstitutes);
});

router.post("/addInstitute", async(req, res) => {


    var imageFile = req.files.image;
    filename = Date.now() + imageFile.name;

    var institute = new Institute({
        name: req.body.name,
        campusAmbassador: req.body.campusAmbassador || '',
        image: filename,
        state: req.body.state,
        city: req.body.city,
        website: req.body.website
    });

    institute.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log(JSON.stringify(err));
        }
    });

    imageFile.mv('uploads/institute/' + filename, (err) => {
        if (!err) {
            console.log("SUCCESS : " + filename);
        } else {
            console.log("UNSUCcess  : " + JSON.stringify(err));
        }
    })
});

router.put("/addCampusAmbassador/:id", async(req, res) => {
    id = req.params.id;
    var institute = await Institute.findById(id);
    console.log(institute);
    institute.campusAmbassador = req.body.campusAmbassador || "";
    const result = await institute.save();
    res.send(result);
});

router.put("/removeCampusAmbassador/:id", async(req, res) => {
    id = req.params.id;
    var institute = await Institute.findById(id);
    console.log(institute);
    institute.campusAmbassador = "";
    const result = await institute.save();
    res.send(result);
});

module.exports = router;