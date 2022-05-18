import React, {useState } from 'react'
import './calculator.css'

const Calculator = () => {

  const [display, setDisplay] = useState('RESULT')
  // Helper Array to map out the buttons. Can be changed into an array of objects if needed!
  const buttonValues = ['AC', '+/-', '%', '/', 7, 8, 9, 'X', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='];
  const renderButtons = (array) => array.map((value) => <button value={value} className="calculator--keys--button">{value}</button>);
  
  return (
    <div className="container">
      <div className="calculator--display">
        {display}
      </div>
      <div className="calculator--keys">
        {renderButtons(buttonValues)}
      </div>
    </div>
  )
}

export default Calculator;