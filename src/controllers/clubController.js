const clubServere = require('../services/clubService');


async function getAllClubs(req,res){
    const result = await clubServere.getAllClubs();
    res.wirtehead(200,{
        "contect-type ": "application/json"
    })
    es
}