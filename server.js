const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const PORT=process.env.PORT || 3001;
const{v4:uuidv4}=require('uuid');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'))
});

//create route to go to notes html

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/notes.html'))
})
//create get route for notes api
app.get('/api/notes',(req,res)=>{
    fs.readFile('./db/db.json',(err,data)=>{
        if (err) {
            console.log(err)
        } else {
            if(data){
                res.json(JSON.parse(data))
            } else {
                res.json([])
            }
            
        }
    })
})
//route to post note

app.post('/api/notes',(req,res)=>{
    const newNote=req.body
    console.log(req.body)
    fs.readFile('./db/db.json',(err,data)=>{
        if(err){
            console.log(err)
        } else {
            
            let notes=JSON.parse(data) || []
            let noteId=uuidv4();
            console.log(newNote)
            notes.push({...newNote,id:noteId})
            fs.writeFile('./db/db.json', JSON.stringify(notes),(err)=>{
                if (err) {
                    console.log(err)
                } else {
                    res.json('Successfully added note!')
                }
            })
        }
    })
})
//route to delete note
app.delete('/api/notes/:id',(req,res)=>{
    fs.readFile('./db/db.json',(err,data)=>{
        if (err) {
            console.log(err)
        } else {
            let notes=JSON.parse(data) || []
            const id=req.params.id
            const index=notes.map(note=>note.id).indexOf(id)

            notes.splice(index,1)
            console.log(notes);
            fs.writeFile('./db/db.json', JSON.stringify(notes),(err)=>{
                if (err) {
                    console.log(err)
                } else {
                    res.json('Successfully deleted note!')
                }

            })
        }
})
})
app.listen(PORT,()=>{
    console.log(`API server now on port ${PORT}`);
});