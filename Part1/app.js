const url = "http://numbersapi.com/"

   
$(document).ready(function () {
//Part 1
async function getNumberFact(num){
    let resp = await axios.get(`${url}${num}?json`)
    $("#fav-number-fact").text(resp.data.text);
}

getNumberFact(11)

//Part 2
async function getFactsForMultipleNums(listOfNums){
    const resp = await axios.get(`${url}${listOfNums}?json`)
    listOfNums.forEach(num => {
        let $li = $("<li>").text(resp.data[num]);
        $("#mul-numbers-fact").append($li);
    });   
}

getFactsForMultipleNums([1,4,5,6,7]);

//Part 3
async function get4Facts(num){
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => axios.get(`${url}${num}?json`)));
    // console.log(facts)
    facts.forEach(fact => {
            let $li = $("<li>").text(fact.data.text);
            $("#four-facts").append($li);
        })  

    };
get4Facts(11)
});
    