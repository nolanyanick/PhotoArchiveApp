
// variable to indicate how many images to load
var pageSize = 12;

// variable to determine which images to load
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
// and calls LoadData function if the user is at the bottom of the page
$(document).ready(function () {
    LoadData();

    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (clientHeight + scrollTop >= scrollHeight - 5) {
            LoadData();
        }
    });
});

// function w/ AJAX call to get images from HomeController's GetData method
function LoadData() {

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

                    // create <img> element for image, set its attributes, append to body
                    var img = document.createElement("img");
                    img.src = data[i];
                    img.className = "mainImages";
                    img.id = "img_" + x;
                    img.dataset.toggle = "modal";
                    img.dataset.target = "#imageModal";
                    document.body.appendChild(img);

                    // add to list for additional styling/manipulation
                    images.push(img);

                    // increment for next image ID
                    x++;
                }
            
                // increment pageIndex for next request
                pageIndex++;

                // add mouseover/out event for shadows
                images.forEach(image => image.addEventListener("mouseover", function () { addShadow(image) }, false));  
                images.forEach(image => image.addEventListener("mouseout", function () { removeShadow(image) }, false));            
            }
        },
        // function for before send
        beforeSend: function () {},

        // function for after send
        complete: function () {},

        // if error occurrs, send alert message
        error: function (data, status) {

            alert("An error had occurred, please try again.");     
            console.log("STATUS: " + status);        
        }
    });
}

// add box shadow to element
function addShadow(element) {
    element.style["boxShadow"] = "0 0 20px #999999";
}

// remove box shadow from element
function removeShadow(element) {
    element.style["boxShadow"] = "0 0 0 #999999";
}
