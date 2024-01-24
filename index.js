const express =require('express');

const database =require("./database");
//intialize expreess
const booky =express();
const bodyParser =require("body-parser");
booky.use(bodyParser.json())

/*
ROUTE :  /
DESCRIPTION : get all the books
Access : public
parameter :none
Methods :get

*/
booky.get("/",(req,res)=> {
  return res.json({data:database.books})
});


/*
ROUTE :  /is/:isbn
DESCRIPTION : get  the specific books on ISBN
Access : public
parameter :isbn
Methods :get

*/

booky.get("/is/:isbn",(req,res)=> {
  const getSpecificBook =database.books.filter((book)=>book.ISBN === req.params.isbn);

if(getSpecificBook.length === 0)
{
  return res.json({error:`NO book found for the isbn of ${req.params.isbn}`})
}
return res.json({books:getSpecificBook})
});

/*
ROUTE :  /c
DESCRIPTION : get  the specific books on category
Access : public
parameter :category
Methods :get

*/
booky.get("/c/:category",(req,res) => {
  const getSpecificBook =database.books.filter((book)=> book.category.includes(req.params.category));

  if(getSpecificBook.length === 0) {
    return res.json({error:`No book is there under this category of ${req.params.category}`})
  }
  return res.json({data:getSpecificBook});
});

/*
ROUTE :  /l
DESCRIPTION : get  the specific books on language
Access : public
parameter :language
Methods :get

*/

booky.get("/l/:language",(req,res) => {
  const getSpecificBook =database.books.filter((book)=>book.language.includes(req.params.language));
  if (getSpecificBook.length === 0) {
    return res.json({error:`no book is there of ${req.params.language}`});
  }
  return res.json({result:getSpecificBook});
});

/*
ROUTE :  /author
DESCRIPTION : get  the all the author
Access : public
parameter :NONE
Methods :get
*/

booky.get("/author",(req,res) => {
  return res.json({authour: database.author});
});


/*
ROUTE :  /author/id
DESCRIPTION : get  the specific author
Access : public
parameter :id
Methods :get
*/

booky.get("/author/isb/:id", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) => author.id === parseInt(req.params.id));

  if( getSpecificAuthor.length === 0) {
    return res.json({ error: `No author with the id ${req.params.id}` });
  }

  return res.json({ author: getSpecificAuthor });
});

/*
ROUTE :  /author/categeory
DESCRIPTION : get  the  author based on the category
Access : public
parameter :isbn
Methods :get
*/
booky.get("/author/book/:isbn",(req,res) => {
  const getSpecificAuthor =database.author.filter((authors)=> authors.books.includes(req.params.isbn));

  if(getSpecificAuthor.length === 0) {
    return res.json({error:`No authour is there under this category of ${req.params.isbn}`})
  }

  return res.json({data:getSpecificAuthor});
});

/*
ROUTE :  /publisher
DESCRIPTION : get  the  all the publisher
Access : public
parameter :NONE
Methods :get
*/

booky.get("/publisher" ,(req,res) => {
  return res.json({publisher:database.publication});
});

/*
ROUTE :  /publisher/
DESCRIPTION : get  the  all the publisher
Access : public
parameter :NONE
Methods :get
*/

booky.get("/publisher/is/:id" ,(req,res) => {
    const getSpecificPublisher =database.publication.filter((publica)=>publica.id === parseInt(req.params.id));

    if(getSpecificPublisher.length === 0) {
      return res.json({error:`No authour is there under this category of ${req.params.id}`})
    }

    return res.json({data:getSpecificPublisher});
});


//POST REQUEST
/*
ROUTE :  /book/new
DESCRIPTION : Add new books
Access : public
parameter :NONE
Methods :post
*/

booky.post("/book/new",(req,res)=> {
  const newBook =req.body;
  database.books.push(newBook);
  return res.json({updatedBook: database.books})
});

/*
ROUTE :  /publication/new
DESCRIPTION : Add new publication
Access : public
parameter :NONE
Methods :post
*/

booky.post("/publication/new",(req,res)=> {
  const newPublisher =req.body;
  database.publication.push(newPublisher);
  return res.json({updatedPublication: database.publication})
});

/*
ROUTE :/authour/new
DESCRIPTION: Add new authour
Access:public
parameter :NONE
methods :Post
*/

booky.post("/author/new",(req,res) => {
  const newAuthor =req.body;
  database.author.push(newAuthor);
  return res.json({updatedAuthor :database.author});
});

/*
ROUTE :  /publication/update/book
DESCRIPTION : update/add new publication
Access : public
parameter :isbn
Methods :put

*/

booky.put("/publication/update/book/:isbn",(req,res)=>{
  //update the publication database
    database.publication.forEach((pub) => {
    if (pub.id === req.body.pubId) {
      return pub.books.push(req.params.isbn);

  }
  });
  //update the book database
    database.books.forEach((book)=>{
      if(book.ISBN === req.params.isbn ) {
        book.publication = req.body.pubId;
        return res.json(
          {
            books :database.books,
            publisher :database.publication,
            message :"succesfully updated"
          }
        )
      }

    });

});

//********DELETE**************

/*
ROUTE :  /book/delete
DESCRIPTION : delete a book
Access : public
parameter :isbn
Methods :delete
*/

booky.delete("/book/delete/:isbn",(req,res)=>{

  const updatedBookDatabase = database.books.filter((book)=>{
  book.ISBN != req.params.isbn
  });
  database.books =updatedBookDatabase;
  return res.json({books:database.books})
});

/*
ROUTE :  /book/authour/delete
DESCRIPTION : delete  author from book
Access : public
parameter :id
Methods :delete
*/

booky.delete("/book/author/delete/:id",(req,res)=>{

  const updatedAuthorDatabase = database.author.filter((author)=>{
          author.id!=parseInt(req.params.id)
  });
  database.author.push(updatedAuthorDatabase);
  return res.json({author:database.author});
});

/*
ROUTE :  /book/delete/authour
DESCRIPTION : delete  author from book and related data from author
Access : public
parameter :isbn ,authorId
Methods :delete
*/

booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
    //update the book database
    //we have to itterate through entire book so we use foreach loop
    databse.books.forEach((book) => {
      if(book.ISBN === req.params.isbn)
      {
        const newAuthorList =book.author.filter(
          (eachAuthor)=> eachAuthor !=parseInt(req.param.authorId)
      );
      book.author =newAuthorList;
      return;
    }
    });


    //update the author database
    database.author.forEach((eachAuthor)=>{
      if(eachAuthor.id === parseInt(req.params.authorId)) {
        const newBookList =eachAuthor.books.filter(
          (book)=>book !== req.params.authorId;
      );
      eachAuthor.books =newBookList;
      return
      }
    });

    return res.json({
            author : database.author,
            book :database.book,
            messege:"authour was deleted"

    });

});
booky.listen(3000,()=> {
  console.log("server is up and running");
});
