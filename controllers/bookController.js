const bookModel = require("../models/books")


const getBookList = async (req,res) =>{
    let data= []
    let books = []
    try{
        data = await bookModel.find()
        
        data.forEach((bookSchema)=>{
            books.push({id: bookSchema.id, name: bookSchema.name, author: bookSchema.author, genre: bookSchema.genre})
        })
    }catch(err){
        console.log(err)
    }finally{
        res.render("bookList",{ books: books, txt: "Hello!"})
    }
}

const addBook = (req, res) =>{
    res.render("addBooks")
}

const postBook = (req, res) =>{
    const data = new bookModel({
        name: req.body.name,
        author: req.body.author,
        genre: req.body.genre
    })
    data.save().then(()=>{
        console.log("Book Added!")
    }).catch((error)=>{console.log(error)}).finally(()=>{
        res.redirect("/book-list")
    })
    
}

const deleteBook = (req, res) =>{
    const deleteId = req.params.id
    bookModel.findOneAndDelete({_id : deleteId}).then(()=>{
        console.log("Book Deleted! id:" + deleteId)
    }).catch((error)=>{console.log(error)}).finally(()=>{
        res.redirect("/book-list")
    })
}

const showUpdateBook = (req,res) => {
    const updateId = req.params.id
    bookModel.findById(updateId, function (err, book) {
        if (err){
            console.log(err);
        }
        else{
            res.render("updateBook", {book: book})
        }
    })
}

const updateBook = (req,res) => {
    updateId = req.params.id
    bookModel.findByIdAndUpdate(updateId,{
        name: req.body.name,
        author: req.body.author,
        genre: req.body.genre
    },(err)=>{
        if (err){
            console.log(err)
        }
        else{
            res.redirect("/book-list")
        }
    })
}

module.exports= {getBookList, addBook, postBook, deleteBook, showUpdateBook, updateBook}