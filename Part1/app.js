const url = "http://numbersapi.com/"

   
$(document).ready(function () {
//Part 1
axios.get(url + '11?json')
    .then((data) =>{
        let resp = data.data
        $("#fav-number-fact").text(resp.text);
    })
    .catch((err) => console.log(err));

//Part 2
axios.get(url + '1..3,11?json')
    .then((data) =>{
        let resp = data.data
        Object.values(resp).forEach(val => {
            $("#mul-numbers-fact").append([val]).append("<br>");
        });
        $("#fav-number-fact").text(resp.text);
    })
    .catch((err) => console.log(err));

//Part 3
let fourFacts = [];
for (let i=0; i<4; i++){
    fourFacts.push(axios.get(url + "11?json"))
}

Promise.all(fourFacts)
    .then(factsArr => factsArr.forEach(f => 
        $("#four-facts").append(f.data.text).append("<br>")))
    .catch( err => console.log(err))
});
    