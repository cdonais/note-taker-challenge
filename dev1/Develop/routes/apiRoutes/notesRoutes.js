const router=require('express').Router();
const {notes}=require('../../db/db.json');

router.get('/notes',(req,res)=>{
    res.send(notes);
});
router.post('/notes',(req,res)=>{
    res.json(note)
})
