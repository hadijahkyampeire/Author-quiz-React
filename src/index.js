import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import './index.css';
import AuthorQuiz from './Author';
import {shuffle, sample} from 'underscore';
import AddAuthorForm from './AddAuthorForm';

const authors =[
    {
    name: 'Mark Twain',
    imageUrl:'images/authors/marktwin.jpeg',
    imageSource:'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn']
    },
    {
    name: 'Joseph Conrad',
    imageUrl:'images/authors/josephconrad.jpeg',
    imageSource:'Wikimedia Commons',
    books: ['Heart of darkness']
    },
    {
    name: 'J K Rowling',
    imageUrl:'images/authors/jkrowling.jpeg',
    imageSource:'Wikimedia Commons',
    imageAttribution:'Daniel Ogren',
    books: ['Harry Porter and sorcerers stone']
    },
    {
    name: 'Stephen King',
    imageUrl:'images/authors/stephenking.jpeg',
    imageSource:'Wikimedia Commons',
    imageAttribution:'Pingiun',
    books: ['The shining', 'IT']
    },
    {
    name: 'Charlse Dickens',
    imageUrl:'images/authors/charlsedickens.jpeg',
    imageSource:'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities']
    },
    {
    name: 'William Shakespear',
    imageUrl:'images/authors/williamshakespear.jpeg',
    imageSource:'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Remeo and Juliet']
    }
]

function getTurnData(authors){
    const allBooks = authors.reduce(function (p,c,i){
        return p.concat(c.books)
    }, [])
    const fourRandomBooks = shuffle(allBooks).slice(0,4)
    const answer = sample(fourRandomBooks);
    return{
        books: fourRandomBooks,
        author: authors.find((author)=>author.books.some((title)=>title===answer))
    }
}
const state ={
    turnData: getTurnData(authors),
    highlight: ''
};

function onAnswerSelected(answer){
    const isCorreect = state.turnData.author.books.some((book)=> book === answer)
    state.highlight = isCorreect ? 'correct': 'wrong'
    render();
}

const AuthorWrapper = withRouter(({history}) =>
    <AddAuthorForm onAddAuthor={(author)=>{
        authors.push(author)
        history.push('/')
    }}/>
)
function App(){
    return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}/>;
}

function render(){
    ReactDOM.render(<BrowserRouter>
    <React.Fragment>
    <Route exact path="/" component={App} />
    <Route path="/add" component={AuthorWrapper} />
    </React.Fragment>
    </BrowserRouter>, 
    document.getElementById('root'));
}
render();

