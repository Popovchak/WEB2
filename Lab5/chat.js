window.onload = async () =>{
	const inputField = document.querySelector(".message_form__input");
	const messageForm = document.querySelector(".message_form");
	const messageBox = document.querySelector(".messages__history");
	var me ="";
    var socket=io.connect('http://localhost:3001');
    socket.on("joinuser", function(arg) {
        console.log(arg);
        me = arg
    });
    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!inputField.value) {
			return;
        }
		console.log(inputField.value)
        socket.emit("chat message", inputField.value);
        inputField.value = "";
    });
    socket.on("chat message", function (data) {
        console.log(me);
        if(me.toString().localeCompare(data.user.toString()) == 0)
			messageBox.innerHTML += `<p align="right">${data.data.toString()}</p>`
		else  
			messageBox.innerHTML += `<p>${data.user}: ${data.data.toString()}</p>`
    })
}