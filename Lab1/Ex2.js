var sent = "Hello there I am here now";

function FirstLetterToUpperCase(input){
	let words = input.split(' ').filter(e => e);
	let res = [];
	let res_i =0;
	for(let elem of words){
		if(elem.length==1){
			res[res_i++]=elem.toUpperCase();
			continue;
		}
		res[res_i++] = ""+elem[0].toUpperCase()+elem.slice(1);
	}
	return res.join(" ");
}

console.log(FirstLetterToUpperCase(sent));