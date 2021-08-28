import { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { MEDIA_QUERT_MD, MEDIA_QUERT_LG } from './constants/breakpoint';

// const TitleWrapper = styled.h2`
//   display: flex;
//   color: blue;

//   &:hover {
//     color: red
//   }

//   span {
//     color: yellow;
//   }
// `

// const titleStyle = {
//   color: 'red',
//   textAligin: 'center'
// }

// function Title({size}) {
//   if(size === 'XL') {
//     return (
//       <h1 style={{
//         color: 'blue',
//         textAligin: 'center'
//       }}>hello~</h1>
//     )
//   }
//   return (
//     <TitleWrapper>hello~<span>yo</span></TitleWrapper>
//   )
// }
// function Description({children}) {
//   return (
//     <p>
//       {children}
//     </p>
//   )
// }

// const Description = styled.p`
//   color: red;
//   padding: 20px;
//   border: 1px solid black;
// `

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid black;

  &+& {
    margin-top: 12px;
  }
`

const TodoContent = styled.div`
  color: ${props=>props.theme.colors.primary_400};
  /* font-size: ${props => props.size === 'XL' ? '20px' : '12px'}; */
  font-size: 12px;

  ${props => props.size === 'XL' &&`
    font-size: 20px
  `}

  ${props=> props.$isDone && `
    text-decoration: line-through
  `}
`
const TodoButtonWrapper = styled.div``
  
const Button = styled.button`
  padding: 4px;
  color: black;
  font-size: 20px;

  ${MEDIA_QUERT_MD} {
    font-size: 16px;
  }


  &:hover{
    color: red;
  }

  & + & {
    margin-left: 4px;
  }
`

const RedButton = styled(Button)`
  color: red;
`


function TodoItem  ({ className, size, todo, handleDeleteTodo, handleToggleIsDone}) {
  const handleToggleClick = () => {
    handleToggleIsDone(todo.id)
  }

  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id)
  }
  return (
    <TodoItemWrapper className ={className} data-todo-id={todo.id}>
    <TodoContent $isDone = {todo.isDone} size={size}>{todo.content}</TodoContent>
    <TodoButtonWrapper>
      <Button onClick = {handleToggleClick}>
        {todo.isDone ? '已完成' : '未完成'}
      </Button>
      <RedButton 
      onClick = {handleDeleteClick}
      >
        刪除
      </RedButton>
    </TodoButtonWrapper>
  </TodoItemWrapper>
  )
}

const BlackTodoItem = styled(TodoItem)`
  background: black;
`

// let id = 3
function App() {
  const [todos, setTodos] = useState([
    {id: 1, content: 'abc', isDone: true},
    {id: 2, content: 'not done', isDone: false},
  ])

  const [value,setValue] = useState('')
  const id = useRef(3)

  const handleButtonClick = () => {
    setTodos([{
      id: id.current,
      content: value
    }, ...todos])
    setValue('')
    id.current++
  }

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleToggleIsDone = id => {
    setTodos(todos.map(todo =>{
      if (todo.id !== id) return todo
      return {
        ...todo,
        isDone: !todo.isDone
      }
    }))
  }

  const handleDeleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id ))
  }

  return (
    <div className="App">
      <input type="text" placeholder="todo" value={value} onChange = {handleInputChange}/>
      {/* <input type="text" placeholder="todo" ref ={inputRef}/> */}
      <button onClick={handleButtonClick}>Add todo</button>
      {
        todos.map(todo=><TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsDone= {handleToggleIsDone}/>)
      }
      
      
    </div>
  );
}

export default App;
