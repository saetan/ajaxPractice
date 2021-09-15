
let locationName = "";

const successHandler = (dataList) => {
    console.log(dataList);
    for (let data of dataList) {
        //create a li
        $('ul').append($(`<li>${data.complaint_type}<div style="display: none" class="complainDetails">
        </br>
        ${data.resolution_description}
        </br>
        </div></li>`).addClass('complaint'));
        console.log(data.complaint_type);
    }
}

const errHandler = (err) => {
    console.log(err);
}

const getComplaints = (locationName, numberOfComplaints) => {
     $('ul').empty();
    $.ajax({
        url: `https://data.cityofnewyork.us/resource/erm2-nwe9.json?borough=${locationName}&agency=NYPD`,
        type: "GET",
        data: {
            "$limit": numberOfComplaints,
            "$$app_token": "86Biq7acOgARQuNt2wAWDnBb5"
        }
    }).then(successHandler).catch(errHandler);

}

$(() => {

    $("form").submit((event) => {
        event.preventDefault();
        $inputText = $('input[type="text"]').val();
        $('input[type="text"]').val("");
    })
    
    $location = $('.locationButton').click((event) => {
        $inputText = $('input[type="text"]').val();
        locationName = event.target.innerHTML
        if (!$inputText) {
            console.log($inputText);
            $inputText = 10;
        }
        getComplaints(locationName, $inputText);
        $('input[type="text"]').val("");
    })

    $(document).on('click', '.complaint', (event) => {
        let complain = $(event.currentTarget).children();
        let display = complain.css('display');

        if (display == "none") {
            complain.css('display', 'block');
        } else {
            complain.css('display', 'none');
        }
    }) 
});


