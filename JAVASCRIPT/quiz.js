const url = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"


const title = document.querySelector("#title")   
const section = document.querySelector('#section')
const timeSec = document.querySelector('#time-sec')
const userScore = document.querySelector('#user-score') 

let hsText = document.querySelector('.hide-score-text')
hsText.style.display = 'none';       
let hUScore = document.querySelector('#hide-user-score') 
let feedback = document.querySelector('#feedback')
let i = 0 
let initTime = 30 
let score = 0 
let data; 
let compAns;   
     

function resetThings(){
    setTimeout(() => {
        title.innerText = ""
        section.innerText = ""
        section.value = ""
        i++
        question(data.results)
        
    }, 600)
} 



function showScoreText(score){         
    if(hsText.style.display === 'none'){
        hsText.style.display = 'block';
    }
    if(score<=8){
        feedback.innerText = "Your Computer Knowledge is so week." 
    }else if(score > 8 && score <=14){
        feedback.innerHTML = "Your Computer knowledge is good but we can improve it."
    }else{
        feedback.innerHTML = "Your Computer knowledge is great." 
    }
    console.log(score) 
    hUScore.innerText = score  
}
  

async function fetchData(){    
    let responce = await fetch(url)
    data = await responce.json()
    question(data.results)     
}


fetchData()
         
function question(fetchValue) { 
    async function showQuestion() {
        title.innerText = fetchValue[i].question            
        let optionValue = fetchValue[i].incorrect_answers    
        compAns = fetchValue[i].correct_answer
        optionValue.push(compAns)   
        optionValue.sort() 
        console.log(compAns)
        for (let key in optionValue) {
            console.log(key)  
            let newOption = document.createElement('option')      
            newOption.innerText = optionValue[key]
            newOption.value = optionValue[key]
            section.append(newOption)
        }  

    }
    
    if(initTime > -1){
        showQuestion()
    } 
}


function setTimeFun(){
    setTimeout(() => {
        if(initTime > -1){
            timeSec.innerText = initTime    
            initTime--
            setTimeFun()
        } 
        else{ 
            resetThings()
            setTimeout(showScoreText(score),2000)      
        }   
                     
    },1000) 
  
}  


setTimeFun() 
     
section.addEventListener('click', (e) => {  
    let userAns = e.target.value 
    if(userAns === compAns){       
        e.target.style.backgroundColor = "Green"
        score+=2
    }else{
        e.target.style.backgroundColor = "red"
        score-=2
    }
    userScore.innerText = score 
    resetThings()

})
  

       