
import React, { useState } from "react";
import "./App.css";
import Progressbar from './Component/Progress_bar'; 
import noCalcImg from './Images/NoCalcIMG.png';
import CalcImg from './Images/CalcIMG.png';

import Oct2020 from "./Tests/Oct2020.json";
import Oct2020Curve from "./Tests/Oct2020Curve.json";


import May2020 from "./Tests/May2020.json";
import May2020Curve from "./Tests/Oct2020Curve.json";



function App() {
  //Test Arrays
  const testsAvail = [{
                        "index" : 0, 
                        "dateOfTest": Oct2020, 
                        "curveOfTest": Oct2020Curve, 
                        "display": "October 2020",
                        "link": "https://www.docdroid.net/jzexGtP/sat-october-2020-pdf"
                      },

                      {
                        "index" : 1, 
                        "dateOfTest": May2020, 
                        "curveOfTest": May2020Curve, 
                        "display": "May 2020",
                        "link": "https://focusonlearningcenter.com/wp-content/uploads/2020/07/March-2020-SAT-Test.pdf"
                      },]

  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  //json Test-Specific Arrays
  const [testAvailCurrentIndex, setTestAvailCurrentIndex] = useState(1);
  const [testName, setTestName] = useState(testsAvail[testAvailCurrentIndex].dateOfTest);
  const [testCurve, setTestCurve] = useState(testsAvail[testAvailCurrentIndex].curveOfTest);


  //set Section (1 - r, 2 - w, 3 - m (nc + c))
  const [section, setSection] = useState(1); 
 
  const [fullTest, setFullTest] = useState(false);

  const sectionNames = ["Reading", "Writing", "Math", "Math Calc"];

  const sectiontitles = [{"id" : 1, "title": "Reading"}, 
                        {"id" : 2, "title": "Writing"}, 
                        {"id" : 3, "title": "Math"}];

  //variable that sets array questions equal to the array in json file using function that only selects one section
  const questions = buildArray();
  
  function buildArray (){
    const tempArray = []; 
    for (let i = 0; i < testName.length; i++){
      //if full test: use all the questions
      if (fullTest){
        tempArray.push(testName[i]);
      }
      //combine the math sections
      else if(section === 3){
        if(testName[i].section === 3 || testName[i].section === 4){
          tempArray.push(testName[i]);
        }
      }
      //select by section
      else{
        if(testName[i].section === section){
          tempArray.push(testName[i]);
        }
      }
    }
    return tempArray;
  }

  //variable that sets array curve equal to array in json file
  const curve = testCurve[section-1];

  



  const [responses, setResponses] = useState([])


 // Helper Functions


  /* A possible answer was clicked */
  const optionClicked = (isCorrect, res) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
      responses.push({
        questionNum: currentQuestion + 1,
        correct: true,
        correctAns: questions[currentQuestion].correctAns,
        selected: res,

        responseSection: questions[currentQuestion].section
      });
    }

    else{
      //add to incorrect
      responses.push({
        questionNum: currentQuestion + 1,
        correct: false,
        correctAns: questions[currentQuestion].correctAns,
        selected: res,

        responseSection: questions[currentQuestion].section
      });
    }

    if(questions[currentQuestion].section == 4){
      responses[currentQuestion].questionNum -= 20;
    }

    //console.log(questions[currentQuestion].correctAns);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }

    //Tells the web that the next question may be frq so the DOM can respond 
    setIsFRQ(questions[currentQuestion+1].type === "frq")

    //console logs

  };



  //Go to Previous Question
  const optionPreviousQuestion = async() =>{

    if(currentQuestion == 0){
      //return an alert?
      alert("You Are At Question 1\nThere Is No Previous Question")
    }
    
    else{
      //sets the current question back 1
      setCurrentQuestion(currentQuestion - 1);

      //Deletes Prev Entry
      const currentRes = responses.pop();

      if(currentRes.correct){
        setScore(score - 1);
      }
    }


    setIsFRQ(questions[currentQuestion-1].type === "frq")

    console.log(score);
  } 




  //function to tally score
  const tallyScore = () =>{
    let tally = 0
    for (let i = 0; i < responses.length; i++){
      if (responses[i].correct){
        tally++;
      }
    }
    setScore(tally)
  }



  //User can use keyboard (WIP)
  function inputKeyPress(event){
    /*
    if(event.key === "A" || "B" || "C" || "D" || "a" || "b" || "c" || "d"){  
      optionClicked(questions[currentQuestion].option.isCorrect, event.key);
    }
    */
   if (event.key === "Enter"){
    console.log("test");
   }
  }


  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };



  //progress variable
  const progressStr = (currentQuestion+1) + "/" + questions.length;
  const progressPercent = (currentQuestion)/questions.length * 100.0;


  //Images
  const image = () =>{
    if(section == 3){
      return noCalcImg;
    }
    else if (section == 4){
      return CalcImg;
    }
    else
      return "";
  }






  //Everything FRQ
  const[isFRQ, setIsFRQ] = useState(questions[currentQuestion].type === "frq");

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");

  const handleChange1 = (e) => {
    setValue1(e.target.value);
    console.log(value1);
  };

  const handleChange2 = (e) => {
    setValue2(e.target.value);
    console.log(value2)
  };

  const handleChange3 = (e) => {
    setValue3(e.target.value);
    console.log(value3)
  };

  const handleChange4 = (e) => {
    setValue4(e.target.value);
    console.log(value4)
  };

  const resArray = (box1, box2, box3, box4) => {
    const array = [box1, box2, box3, box4];
    for (let i = 0; i < array.length; i++){
      if (array[i] === "")
        array.pop();
    }
    return array;
  }

  //submit frq question
  const frqNextQuestion = () => {

    let answer = 0;

    let answerArr = [value1, value2, value3, value4];
    let fraction = false;
    let fractionSeparator;

    let decimal = false;
    let decimalSeparator;

    console.log(answerArr);



    for(let i = 0; i < answerArr.length; i++){
      if(answerArr[i] == ""){
        answerArr.shift();
        i--;
      }
      else{
        break;
      }
    }
    for(let i = answerArr.length-1; i >= 0; i--){
      if(answerArr[i] == ""){
        answerArr.pop();   
      }
      else{
        break;
      }
    }

    console.log(answerArr);

    //find the fraction
    for(let i = 0; i < answerArr.length; i++){
      if(answerArr[i] == "/"){
        fraction = true;
        fractionSeparator = i;
      }
    }

    //find the decimal
    for(let i = 0; i < answerArr.length; i++){
      if(answerArr[i] == "."){
        decimal = true;
        decimalSeparator = i;
      }
    }

    if(fraction){
      let preFractionArr = [];
      let postFractionArr = [];
      for (let i = 0; i < fractionSeparator; i++){
        preFractionArr.push(answerArr[i]);
      }
      for (let i = fractionSeparator+1; i < answerArr.length; i++){
        postFractionArr.push(answerArr[i]);
      }
      
      let preFractionInt = 0;
      let postFractionInt = 0;
      for (let i = 0; i <preFractionArr.length; i++){
        console.log(preFractionArr[i]);

        preFractionInt += parseInt(preFractionArr[i])*Math.pow(10,preFractionArr.length - i - 1);
      }
      for (let i = 0; i <postFractionArr.length; i++){
        postFractionInt += parseInt(postFractionArr[i])*Math.pow(10,postFractionArr.length - i - 1);
      }

      
      answer = preFractionInt / postFractionInt;
      answer = Math.round(answer * 100) / 100;

      console.log(answer);
    }

    else if (decimal){
      //write for this
      let preDecimalArr = [];
      let postDecimalArr = [];
      for (let i = 0; i < decimalSeparator; i++){
        preDecimalArr.push(answerArr[i]);
      }
      for (let i = decimalSeparator+1; i < answerArr.length; i++){
        postDecimalArr.push(answerArr[i]);
      }
      
      let preDecimalInt = 0;
      let postDecimalInt = 0;
      for (let i = 0; i <preDecimalArr.length; i++){
        preDecimalInt += parseInt(preDecimalArr[i])*Math.pow(10,preDecimalArr.length - i - 1);

        console.log(preDecimalInt)
      }
      for (let i = 0; i <postDecimalArr.length; i++){
        postDecimalInt += parseInt(postDecimalArr[i])*Math.pow(10,postDecimalArr.length - i);


        console.log(postDecimalInt);
      }

      answer = (preDecimalInt + postDecimalInt / 100);

      console.log(answer);
    }

    else{
      for(let i = 0; i < answerArr.length; i++){
        answer += answerArr[i] * Math.pow(10, answerArr.length - i - 1);
      }

      console.log(answer);
    }



    if(questions[currentQuestion].range){
      if(answer >= questions[currentQuestion].correctAns[0] &&
         answer <= questions[currentQuestion].correctAns[1]){
        responses.push({
          questionNum: currentQuestion + 1,
          correct: true,
          correctAns: questions[currentQuestion].correctAnsDisplay,
          selected: [value1, value2, value3, value4],
  
          responseSection: questions[currentQuestion].section,

          range: "true"
        });   
      }
      else{
        responses.push({
          questionNum: currentQuestion + 1,
          correct: false,
          correctAns: questions[currentQuestion].correctAnsDisplay,
          selected: [value1, value2, value3, value4],
  
          responseSection: questions[currentQuestion].section,

          range: "true"
        }); 
      }
    }
    else{
      if(answer == questions[currentQuestion].correctAns){
        responses.push({
          questionNum: currentQuestion + 1,
          correct: true,
          correctAns: questions[currentQuestion].correctAns,
          selected: [value1, value2, value3, value4],
  
          responseSection: questions[currentQuestion].section
        });   
      }
      else{
        responses.push({
          questionNum: currentQuestion + 1,
          correct: false,
          correctAns: questions[currentQuestion].correctAns,
          selected: [value1, value2, value3, value4],
  
          responseSection: questions[currentQuestion].section
        }); 
      }
    }


    if(questions[currentQuestion].section == 4){
      responses[currentQuestion].questionNum -= 20;
    }




    setValue1("");
    setValue2("");
    setValue3("");
    setValue4("");


    //console.log(questions[currentQuestion].correctAns);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }

    setIsFRQ(questions[currentQuestion+1].type === "frq")

    //console logs
  }

  
  


  //test selector

  const handleTestChange = (e) => {
    setTestAvailCurrentIndex(e.target.value);
    
  };

  return (
    <div className={showResults ? "App": "AppQuestions"}>
      {/* 1. Header  */}
      <>
        <div class = "header">
          <div>
            <h1>SAT: {testsAvail[testAvailCurrentIndex].display}</h1>

          </div>

          <div class = "testSelector">
            <form className = "testSelectorDropDown">
                <select className = "testSelectorSelect" value={testAvailCurrentIndex} 
                onChange={showResults || currentQuestion || responses.questionNum == 1 ? {} : handleTestChange}>
                  <option className = "testSelectVal" value={testAvailCurrentIndex}></option>
                  <option className = "testSelectVal" value="0">October 2020</option>
                  <option className = "testSelectVal" value="1">May 2020</option>
                </select>
              </form>
          </div>

        </div>
        

        <div>
          <a href = {testsAvail[testAvailCurrentIndex].link} target = "_blank">Download Test</a>
          
        </div> 
      </>


        <ul class = "sections">
            {sectiontitles.map((name) => {
              return (
                <li
                  className = {name.id == section ? "sectionTitleCurrent" : "sectionTitle"}
                  
                  key={name.id}  
                  onClick = {showResults || currentQuestion || responses.questionNum == 1 ? {} : () => setSection(name.id)
                } 
                >
                  {name.title}
                  

                </li>
              );
            })}
        </ul>

      <div>
          {!showResults && questions[currentQuestion].section == 3 ? (
            <img class = "calcimages" src = {noCalcImg} alt = "nocalcimage"></img>
          )
          :
          (
            <div></div>
          )}
          {!showResults && questions[currentQuestion].section == 4 ? (
            <img class = "calcimages" src = {CalcImg} alt = "calcimage"></img>
          )
          :
          (
            <div></div>
          )}
        </div>


      {/* 3. Show results or show the question game  */}
      {showResults ? (


        /* 4. Final Results */
        <div className="final-results">
          <h1>Score:</h1>


          {/* Score that matters (100-400) */}
          <div className="curvedScore">
            
            {
              //questions.length-score = num incorrect
              curve.curveArr[questions.length-score]*10
            }
            &#160;/&#160;
            {
              curve.curveArr[0]*10
            }
          </div>


          <h2>
            {score} out of {questions.length} correct
          </h2>

          {/*show questions*/}

          {/*
          <ul>
            {responses.map((response) => {
              return (
                <li className={response.correct ? "correct": "incorrect"}>
                  {response.questionNum}
                  
                  {response.correctAns}
                </li>
                
              );
            })}
          </ul>
          
          
          
          */}
          <table>
            <tr>
              <th>Question Number</th>
              <th>Correct Answer</th>
              <th>Selected Answer</th>
            </tr>
            {responses.map((response) => {
              return (
                <tr>
                  <td className={response.correct ? "correctNum": "incorrectNum"}>
                    {response.questionNum}
                  </td>
                  <td className={response.correct ? "correct": "incorrect"}>
                    {response.correctAns}
                  </td>
                  <td className = {response.correct ? "correct": "incorrect"}>
                    {response.selected}
                  </td>
                </tr>        
              );
            })}
          </table>


        </div>
      ) : (

        /* 5. Question Card  */


        


        <div className="question-card">
          {/* Current Question  */}

          {questions[currentQuestion].section == 4? (
            <h2 className="progress">
            Question: <span>{currentQuestion + 1 - 20}</span> out of {questions.length - 20}
            </h2>
          )
          :
          (
            <h2 className="progress">
            Question: <span>{currentQuestion + 1}</span> out of {questions.length}
            </h2>
          )}

          

          
          <Progressbar bgcolor="rgb(8, 142, 251)" progress={progressPercent}  height={30} progressDisplay={progressStr}/>
          
          
          


          {/* List of possible answers  */}
          {isFRQ ? (
            <div className = "frq">

              <div className = "FrqOptions">
                <form className = "frqDropDown">
                  <select className = "frqSelect" value={value1} onChange={handleChange1}>
                    <option className = "frqValue" value=""></option>
                    <option className = "frqValue"  value="1">1</option>
                    <option className = "frqValue"  value="2">2</option>
                    <option className = "frqValue"  value="3">3</option>
                    <option className = "frqValue"  value="4">4</option>
                    <option className = "frqValue"  value="5">5</option>
                    <option className = "frqValue"  value="6">6</option>
                    <option className = "frqValue"  value="7">7</option>
                    <option className = "frqValue"  value="8">8</option>
                    <option className = "frqValue"  value="9">9</option>
                    <option className = "frqValue"  value=".">.</option>
                  </select>
                </form>
                
                <form className = "frqDropDown">
                  <select className = "frqSelect" value={value2} onChange={handleChange2}>
                    <option className = "frqValue"  value=""></option>
                    <option className = "frqValue"  value="0">0</option>
                    <option className = "frqValue"  value="1">1</option>
                    <option className = "frqValue"  value="2">2</option>
                    <option className = "frqValue"  value="3">3</option>
                    <option className = "frqValue"  value="4">4</option>
                    <option className = "frqValue"  value="5">5</option>
                    <option className = "frqValue"  value="6">6</option>
                    <option className = "frqValue"  value="7">7</option>
                    <option className = "frqValue"  value="8">8</option>
                    <option className = "frqValue"  value="9">9</option>
                    <option className = "frqValue"  value=".">.</option>
                    <option className = "frqValue"  value="/">/</option>
                  </select>
                </form>

                <form className = "frqDropDown">
                  <select className = "frqSelect" value={value3} onChange={handleChange3}>
                    <option className = "frqValue"  value=""></option>
                    <option className = "frqValue"  value="0">0</option>
                    <option className = "frqValue"  value="1">1</option>
                    <option className = "frqValue"  value="2">2</option>
                    <option className = "frqValue"  value="3">3</option>
                    <option className = "frqValue"  value="4">4</option>
                    <option className = "frqValue"  value="5">5</option>
                    <option className = "frqValue"  value="6">6</option>
                    <option className = "frqValue"  value="7">7</option>
                    <option className = "frqValue"  value="8">8</option>
                    <option className = "frqValue"  value="9">9</option>
                    <option className = "frqValue"  value=".">.</option>
                    <option className = "frqValue"  value="/">/</option>
                  </select>
                </form>

                <form className = "frqDropDown">
                  <select className = "frqSelect" value={value4} onChange={handleChange4}>
                    <option className = "frqValue"  value=""></option>
                    <option className = "frqValue"  value="0">0</option>
                    <option className = "frqValue"  value="1">1</option>
                    <option className = "frqValue"  value="2">2</option>
                    <option className = "frqValue"  value="3">3</option>
                    <option className = "frqValue"  value="4">4</option>
                    <option className = "frqValue"  value="5">5</option>
                    <option className = "frqValue"  value="6">6</option>
                    <option className = "frqValue"  value="7">7</option>
                    <option className = "frqValue"  value="8">8</option>
                    <option className = "frqValue"  value="9">9</option>
                  </select>
                </form>
              </div>

              <div className="frqParent">

                
                <div className="prevQuestion"
                onClick = {() => optionPreviousQuestion()}>
                Previous Question
                </div>

                <div className="nextQuestion"
                onClick = {frqNextQuestion}
                >
                Next Question
                </div>

              </div>


                
            </div>
          ) 
          : 
          (
            <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  className="choices"
                  key={option.id}  
                  onClick={() => optionClicked(option.isCorrect, option.text)} 
                                
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
          )}


          {isFRQ ? (
            <div></div>
          ) : (
            <div className="prevQuestionOnly"
            onClick = {() => optionPreviousQuestion()}>
            Previous Question
            </div>     
          )}


        </div>
      )}
    </div>
  );
}

export default App; 