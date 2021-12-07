var date1 = new Date('10/01/2020');
var date2 = new Date('11/15/2020');

function DateDiff(d1,d2,step){
	let diffTime = Math.abs(date2 - date1);//ms
	let res = Math.ceil(diffTime / 1000);
	if(step==0)
		return ""+res+" sec";
	res = Math.ceil(res / (60 * 60 * 24));
	if(step==1)
		return ""+res+" days";
	res = Math.ceil(res / 7);
	if(step==2)
		return ""+res+" weeks";
}

console.log(DateDiff(date1,date2,0));
console.log(DateDiff(date1,date2,1));
console.log(DateDiff(date1,date2,2));