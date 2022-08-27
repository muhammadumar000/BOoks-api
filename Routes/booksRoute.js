const booksController = require('../Controllers/booksController');

// creating schemas

const item = {
    type: 'object',
    properties:{
        _id: {type: 'string'},
        bookName: {type: 'string'},
        author: {type:'string'},
        publisher: {type:'string'},
        publicationDate: {type:'string'}
    }
}

const getAllBooks = {
    schema:{
        response:{
            200:{
                type: 'array',
                items : item
            }
        }
    },
    handler: booksController.getAllBooks
}
const addNewBook = {
    schema:{
        response:{
            200:{
                type: 'object',
                properties:{
                    message: {type: 'string'}
                }
            }
        },
        body:{
            type: 'object',
            properties:{
                bookName: {type: 'string'} ,
                author:{type:'string'},
                publisher:{type:'string'},
                publicationDate:{type:'string'}
            }
        }
    },
    handler: booksController.AddNewBook
}

const updateBook = {
    schema:{
        response:{
            200:{
                type: 'object',
                properties:{
                    message: {type: 'string'}
                }
            }
        },
        body:{
            type: 'object',
            properties:{
                _id: {type: 'string'} ,
                bookName:{type:'string'} ,
                author : {type:'string'},
                publisher : {type:'string'},
                publicationDate : {type:'string'}

            }
        }
    },
    handler: booksController.updateBook
}
const deleteBook = {
    schema:{
        response:{
            200:{
                type: 'object',
                properties:{
                    message: {type: 'string'}
                }
                
            }
        },
        body:{
            type: 'object',
            properties:{
                _id:{type:'string'}
            }
        }
    },
    handler: booksController.deleteBook
}
const getBookById = {
    schema:{
        response:{
            200:{
                type: 'object',
                properties: {
                    _id: {type: 'string'},
                    bookName: {type: 'string'},
                    author: {type:'string'},
                    publisher: {type:'string'},
                    publicationDate: {type:'string'}
                }
            }
        },
        params: { 
            type: 'object',
            additionalProperties: false,
            required: [ 'id' ],
            properties: { id: { type: 'string' }
        }
    }
    },
    handler: booksController.getBookById
}



async function booksRoute(fastify,options,done) {

    fastify.get('/books',getAllBooks)
    fastify.post('/books',addNewBook)
    fastify.put('/books',updateBook)
    fastify.delete('/books',deleteBook)
    fastify.get('/books/:id',getBookById)

    done();
}

module.exports = booksRoute;