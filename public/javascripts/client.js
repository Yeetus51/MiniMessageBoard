
console.log("Clinet Side JS is working !");

let messages = document.querySelectorAll(".message");

console.log(messages.length); 

messages.forEach(messagediv => {

    let deleteButton = messagediv.getElementsByClassName("delete"); 

    console.log(deleteButton[0]);
    deleteButton[0].addEventListener('click', () =>{
        messagediv.classList = "hidden"; 
    })



    
});


