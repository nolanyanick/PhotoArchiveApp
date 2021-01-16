
// variable to indicate how many images to load
var pageSize = 12;

// variable to determine which set of images to load
var pageIndex = 0;

// variable used for image id's
var x = 0;

// array to contain all the images
var images = [];



// modal to display image that has been clicked
$('#imageModal').on('show.bs.modal', function (event) {

    var img = document.createElement("img");
    img.src = event.relatedTarget.src;
    img.style.width = '100%';

    $('.modal-body').html(img);
    $('#imageModal').modal('show');
});

// ready function that listens for scroll event
// and calls GetData function if the user is at the bottom of the page
$(document).ready(function () {
    GetData();

    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (clientHeight + scrollTop >= scrollHeight - 5) {
            GetData();
        }
    });
});

// function to get images from HomeController's GetData method
// using an ajax call
function GetData() {

    $.ajax({
    type: 'GET',
        url: '/home/GetData',
        // send pageIndex and pageSize as arguments
        data: { "pageIndex": pageIndex, "pageSize": pageSize },
        dataType: 'json',
        // if successful and data is present, update the view with new images
        success: function (data) {
            if (data != null) {
                for (var i = 0; i < data.length; i++) {

                    // get container
                    var container = document.getElementById("container");

                    // create <img> tag for image, set its source & class, append to container
                    var img = document.createElement("img");
                    img.src = data[i];
                    img.className = "mainImages";
                    img.id = "img_" + x;
                    img.dataset.toggle = "modal";
                    img.dataset.target = "#imageModal";
                    document.body.appendChild(img);

                    images.push(img);

                    x++;
                }
            
                // increment pageIndex for next query
                pageIndex++;
                //images.forEach(image => image.addEventListener("mouseover", function () { image.style["boxShadow"] = "0 0 20px #999999" }, false));
                images.forEach(image => image.addEventListener("mouseover", function () { addShadow(image) }, false));

                //images.forEach(image => image.addEventListener("mouseout", function () { image.style["boxShadow"] = "0 0 0 #999999" }, false));
                images.forEach(image => image.addEventListener("mouseout", function () { removeShadow(image) }, false));

                //images.forEach(image => image.addEventListener("click", function () { console.log("function functioning"); }, false));





            }
        },
    // show loading text
    beforeSend: function () {
        },
    // hide loading text
    complete: function () {
        },
    // if error occurrs, send alert
    error: function () {
        alert("Error")
    }
    });

    function addShadow(element) {
        element.style["boxShadow"] = "0 0 20px #999999";
    }

    function removeShadow(element) {
        element.style["boxShadow"] = "0 0 0 #999999";
    }


}
