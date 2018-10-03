$(function() {
    // $('#select-menu').selectric();

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
                let storyUrl = `https://hacker-news.firebaseio.com/v0/item/${index}.json?print=pretty`;
                console.log("storyUrl is: ",storyUrl);
                $.ajax({
                    type: 'GET',
                    url: storyUrl,
                }).then(function(element) {
                    console.log(storyUrl);
                    createViewForItem(element);


                })


            })

            number = number + 30;
            if (number >= 500)
                $("load-button").attr("disabled", true);

            dataPartial = data.slice(number, number + 30);
        };

    })
});

function createViewForItem(element) {

    $.ajax({
        type: 'POST',
        url: "https://hackernewsoa.herokuapp.com/getImageUrl",
        data: {
            itemUrl: element.url
        }
    }).then(function(data) {
        let imageUrl = data.image;

    console.log("data is ",data);
    if (imageUrl) {
        $('.articles').append(`<h3>${element.title}</h3>
                           <img src=${imageUrl} />
                            `);
    } else {
        $('.articles').append(`<h3>${element.title}</h3>
                              `);
    }

  });

}

