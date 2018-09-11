import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './Author';
import enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter()})

const state = {
    turnData:{
    books: ['Hamlet', 'Macbeth', 'Remeo and Juliet'],
    author:{
        name: 'William Shakespear',
        imageUrl:'images/authors/williamshakespear.jpeg',
        imageSource:'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Remeo and Juliet']
        }
    },
    highlight: 'none'
    
}
describe('Author Quiz', ()=>{
    it('renders without crashing', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={()=>{}}/>, div);
    });
    describe('when no answer has been selected', ()=>{
        let wrapper;
        beforeAll(()=>{
            wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={()=>{}}/>)
        })
        it('should have no background color', ()=>{
            expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('');
        })
    })
    describe('when wrong answer has been selected', ()=>{
        let wrapper;
        beforeAll(()=>{
            wrapper = mount(<AuthorQuiz {...(Object.assign({},state, {highlight:'wrong'}))} onAnswerSelected={()=>{}}/>)
        })
        it('should have background color red', ()=>{
            expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('red');
        })
    })
    describe('when right answer has been selected', ()=>{
        let wrapper;
        beforeAll(()=>{
            wrapper = mount(<AuthorQuiz {...(Object.assign({},state, {highlight:'correct'}))} onAnswerSelected={()=>{}}/>)
        })
        it('should have background color green', ()=>{
            expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('green');
        })
    })
    describe('when the user selects their first answer', ()=>{
        let wrapper;
        const handleAnswerSelected = jest.fn();
        beforeAll(()=>{
            wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected}/>)
            wrapper.find('.answer').first().simulate('click');
        })
      it('onAnswerSelected be called', ()=>{
        expect(handleAnswerSelected).toHaveBeenCalled();
        })
        it('selected answer should be Hamlet', ()=>{
        expect(handleAnswerSelected).toHaveBeenCalledWith('Hamlet');
        })
    })
})