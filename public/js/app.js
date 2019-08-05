// console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data.puzzle)
//     })
// })

// fetch('http://localhost:3000/weather?address=boston')
// .then((response)=>{
//     if(response.error){
//         console.log(error)
//     }else{
//         response.json().then((data)=>{
//             console.log(data.location)
//         })    
//     }
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '' 
    fetch('/weather?address='+ location)
        .then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    //console.log(error)
                    messageOne.textContent = data.error
                }else{
                     messageOne.textContent = data.location
                     messageTwo.textContent = data.forecast
                    }   
            })
            
        })
})