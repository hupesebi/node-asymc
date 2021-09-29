$(document).ready(function () {
    const url = "https://deckofcardsapi.com/api/deck";

    //Part 1
    async function singleCard(){
    let resp = await axios.get(url + "/new/draw/?count=1")
    let { suit, value } = resp.data.cards[0];
    console.log(`${value} of ${suit}`);
    };
    singleCard()
        

    //Part 2
    async function twoCards(){
    let firstCard = await axios.get(url + "/new/draw/");
    let deckId= firstCard.data.deck_id;
    let secondCard = await axios.get(`${url}/${deckId}/draw/`);
    [firstCard, secondCard].forEach(card => {
        let { suit, value } = card.data.cards[0];
        console.log(`${value} of ${suit}`);
      });
    };
    twoCards()

    //Part3
    async function drawCards(){ 
    let resp = await axios.get(`${url}/new/draw`);
    deckId = resp.data["deck_id"];
    if (deckId) {
        $("#card-button").show();
    }
    
    $("#give-me-card").on("click", async function () {
        let $cardDiv = $("#card");
        let $img = $("<img>");
        resp = await axios.get(`${url}/${deckId}/draw/`);
        if (resp.data["success"]) {
        for (let card of resp.data["cards"]) {
            $img.attr("src", card["image"]);
            $cardDiv.prepend($img);
        }
        } else {
            $cardDiv.prepend("<h1>All cards drawn</h1>");
            $("#give-me-card").hide();
        }
    });
};
    drawCards();
});    