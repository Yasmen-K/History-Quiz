function solve(){
  

  let questionSection = document.querySelector('.question-section')
  let score = 0;
  let dataInput = ''
  let id = 1

  
  
  
  function switchQuestion (){

    if(id < 10){
    id++
    createQuestion(dataInput,id)
    addEventListener()
    return
    }
    questionSection.remove()
    document.querySelector('.score-div h3').innerHTML = `You have ${score} right answers!`;
    document.querySelector('.score-div').style.display = 'block'
  }
  
  
  function createQuestion (data,id){
    let view = `
    <div class="questions">
    <img src="{{image}}">
    <h3>{{question}}</h3>
    <ul>
    
    <li>{{answer1}}</li>
    <li>{{answer2}}</li>
    <li>{{answer3}}</li>
    <li>{{answer4}}</li>
    
    </ul>
    </div>
    `
    
    let databaseKey = Object.keys(data)[0]
    
    
    let template = Handlebars.compile(view)
    
    questionSection.innerHTML =   template(data[databaseKey][id])
    
  }
  
  
  document.querySelector('#start-button')
  .addEventListener('click', e=>{
    
    fetch(`https://quiz-app-5e1c5-default-rtdb.firebaseio.com/.json`)
    .then(res => res.json())
    .then(data =>{
      
      dataInput = data;
      
      createQuestion(dataInput,id)
      questionSection.style.display = 'block'
      document.querySelector('.welcome-div').style.display = 'none'
      
      
      addEventListener()
      
      
      
    })
  })
  
  function addEventListener(){
    document.querySelectorAll('li').forEach(x =>{
        
      x.addEventListener('click', checkAnswer)
      
    })
  }
  function checkAnswer(e){
    let eContext = e.target.innerHTML
    let rightAnswers = ["Sandro Botticelli",'six','Cleopatra','Black Death','Saint Petersburg','Justinian I','John Vincent Atanasoff','Akita Inu','France','China']

    
    if(rightAnswers.includes(eContext)){
      score++
      switchQuestion()
      return
    }
    
    e.target.style.color = 'red'
    additionalInformation(e)
    
  }
  
  function additionalInformation(e){
    fetch(`https://quiz-app-5e1c5-default-rtdb.firebaseio.com/-MRW_9DF3D1EMPcnh5mc.json`)
    .then(res => res.json())
    .then(data =>{
      console.log(data[id])

      questionSection.querySelector('div').remove()
      let pElement = document.createElement('p')
      pElement.setAttribute('class','additional-information')
      pElement.innerHTML = data[id]
      questionSection.appendChild(pElement)
      
      setTimeout(switchQuestion,10000)
      
      //switchQuestion()

     
    
      
    })
  }
}
solve()