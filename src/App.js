import logo from './logo.svg';
import './App.css';
import React, {useEffect,useState} from "react";

// Dependencies
import * as tf from "@tensorflow/tfjs"; 
import * as speech from "@tensorflow-models/speech-commands"; 


const App = ()  => {
// creating model & action states
const [model,setModel] = useState(null);
const [action,setAction] = useState(null);
const [labels,setLabels] = useState(null);


// creating recognizer

const loadModel = async () => {

  const recognizer = await speech.create("BROWSER_FFT");
  console.log("Model Loaded")
  await recognizer.ensureModelLoaded()
  console.log(recognizer.wordLabels())
  setModel(recognizer)
  setLabels(recognizer.wordLabels());
}

useEffect(() =>  { loadModel()},[]);


// Listening for actions

function argMax(arr) {
  return arr.map((x,i)=> [x,i]).reduce((r,a)=> (a[0] > r[0] ? a:r))[1];

}

const recognizeCommands = async() => {
  console.log("Listening for commands")
  model.listen(result => {
    console.log(result)
    setAction(labels[argMax(Object.values(result.scores))])
    console.log(action)
  }, {includeSpectrogram:true,  probabilityThreshold: 0.8}  )
  
  setTimeout(() => model.stopListening(),10e3)


}

return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
    
       <button onClick= {recognizeCommands} >Command</button>

       {action ? <div>{action}</div> : <div>No action Detected</div>}

    </header>
  </div>

   );

}
export default App;


















 
