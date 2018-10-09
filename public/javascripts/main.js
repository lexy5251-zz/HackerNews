retrieveAndRender(0);

$("#all-stories").click(function() {
    retrieveAndRender(0);
});

$("#odd-stories").click(function() {
    console.log("this odd button is triggered:");
    retrieveAndRender(1);
    console.log("this odd button is triggered: and get data",mode);
});

$("#even-stories").click(function() {
    retrieveAndRender(2);
});

function retrieveAndRender(mode) {
    $('.articles').empty();
    $(function() {
        $.ajax({
            type: 'GET',
            url: `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`,
        }).then(function(data) {

            let number = 0;
            let dataPartial = data.slice(number, number + 30);
            loadThirty();

            $("#load-button").click(function() {
                loadThirty()
            });

            function loadThirty() {
                dataPartial.forEach(function(index) {
                    if (mode === 0 || (mode === 1 && index % 2 === 1) || (mode === 2 && index % 2 === 0)) {
                        let storyUrl = `https://hacker-news.firebaseio.com/v0/item/${index}.json?print=pretty`;
                        console.log("storyUrl is: ", storyUrl);
                        $.ajax({
                            type: 'GET',
                            url: storyUrl,
                        }).then(function(element) {
                            console.log(storyUrl);
                            createViewForItem(element);
                        });
                    }
                });

                number = number + 30;
                if (number >= 500)
                    $("load-button").attr("disabled", true);

                dataPartial = data.slice(number, number + 30);
            };

        })
    });
}


function createViewForItem(element) {

    $.ajax({
        type: 'POST',
        url: "https://hackernewsoa.herokuapp.com/getImageUrl",
        data: {
            itemUrl: element.url
        }
    }).then(function(data) {
        let imageUrl = data.image;

        console.log("data is ", data);
        if (imageUrl) {
            $('.articles').append(`<div class="card"><img src=${imageUrl} />
                               <div class="card-content">
                               <div class="author">${element.by}</div>
                               <h3 class="card-h3">${element.title}</h3>
                               </div>
                               </div>
                            `);
        } else {
            $('.articles').append(`<div class="card">
                               <img src="images/trade-war-final.jpg" />
                               <div class="card-content">
                               <div class="author">${element.by}</div>
                               <h3><h3 class="card-h3">${element.title}</h3>
                               </div>
                               </div>
                              `);
        }

    });

}

