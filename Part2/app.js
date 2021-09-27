$(document).ready(function () {
    const url = "https://deckofcardsapi.com/api/deck";

    //Part 1
    axios.get(url + "/new/draw/?count=1")
        .then(response => {
            let { suit, value } = response.data.cards[0];
            console.log(`${value} of ${suit}`);
        })
        .catch((err) => console.log(err));

    //Part 2
    let firstCard = null;
    axios.get(url + "/new/draw/")
        .then(response => {
            firstCard = response.data.cards[0]
            let deckId= response.data.deck_id;
            return axios(`${url}/${deckId}/draw/`)
        })
        .then(response =>{
            let secondCard = response.data.cards[0]
            console.log(
                  `${secondCard.value} of ${secondCard.suit} and ${firstCard.value} of ${firstCard.suit}`
                );
             
            })
        .catch((err) => console.log(err));


    let $button = $("#give-me-card");
    let $cardDiv = $("#card");
    
    let deckId = axios.get(url + "/new/shuffle/?deck_count=1").then(
        (response) => {
        deckId = response.data.deck_id;
        }
    );
      
    $button.on("click", function () {
        axios.get(url + `/${deckId}/draw/?count=1`)
        .then((response) => {
            if (response.data.remaining != 0) {
            let $img = $("<img>");
            $img.attr("src", response.data.cards[0].image);
            $cardDiv.prepend($img);
            } else {
            $cardDiv.prepend("<h1>All cards drawn</h1>");
            $button.hide();
            }
        })
        .catch((err) => console.log(err));
    });        

    });