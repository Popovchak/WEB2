let strings = ["This is", "That is", "This is", "That is", "That is not"];

function removeDuplicates(input){
	return unique = input.filter((c, index) => {
    return input.indexOf(c) === index; });
}

console.log(removeDuplicates(strings));