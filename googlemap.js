const results=document.getElementById('result').getElementsByTagName('a')
console.log(results)
const activateItem=()=>{
    for(i=0;i<results.length;i++){
        results[i].href='https://www.google.com/maps/search/'+results[i].innerHTML
    }
}
activateItem()

