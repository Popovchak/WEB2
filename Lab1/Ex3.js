var n_input = 10;

function Fibonachi(n){
	var res = "";
	let previous = 1;
	let now = 1;
	if(n>0){
		res += ""+previous+",";
	}
	if(n>1){
		res += ""+now+",";
	}
	for(let i = 2; i<=n; i++){
		let t = now;
		now += previous;
		previous = t;
		res += ""+now+",";
	}
	console.log(res);
}

Fibonachi(n_input);