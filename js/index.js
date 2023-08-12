// Array of image paths
const imagePaths = [
    './img/banner.png',
    './img/banner1.png',
    './img/banner-2.png',
    './img/banner-3.png'
    // Add more image paths as needed
];
const dividerWidth = 2; // Width of the dividers in pixels
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fadeDuration = 5000; // Duration of fading in milliseconds
const loopInterval = 5000; // Interval between loops in milliseconds

let currentImageIndex = 0;

// Function to load the current image
function loadCurrentImage() {
    const imagePath = imagePaths[currentImageIndex];
    const img = new Image();
    img.src = imagePath;
    img.onload = function() {
        // Calculate the size of each slice
        const sliceWidth = (img.width + dividerWidth) / 5;
        const sliceHeight = (img.height + dividerWidth) / 4;
        canvas.width = img.width + dividerWidth;
        canvas.height = img.height + dividerWidth;

        // Create an array to store the opacity values for each slice
        const opacityArray = new Array(5).fill().map(() => new Array(3).fill(1));

        // Function to animate the fading effect
        function animateFade(sliceX, sliceY, startTime) {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const progress = 1 - Math.min(elapsedTime / fadeDuration, 1);
            opacityArray[sliceY][sliceX] = progress;

            // Clear the canvas and redraw all slices with the updated opacity
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 5; x++) {
                    const sx = x * sliceWidth;
                    const sy = y * sliceHeight;
                    const dx = x * (sliceWidth + dividerWidth);
                    const dy = y * (sliceHeight + dividerWidth);

                    ctx.globalAlpha = opacityArray[y][x];
                    ctx.drawImage(img, sx, sy, sliceWidth, sliceHeight, dx, dy, sliceWidth, sliceHeight);

                    // Draw vertical divider
                    if (x < 2) {
                        ctx.fillStyle = 'white'; // Change color if needed
                        ctx.fillRect(dx + sliceWidth, dy, dividerWidth, sliceHeight);
                    }

                    // Draw horizontal divider
                    if (y < 2) {
                        ctx.fillStyle = 'white'; // Change color if needed
                        ctx.fillRect(dx, dy + sliceHeight, sliceWidth + dividerWidth, dividerWidth);
                    }
                }
            }

            if (progress > 0) {
                requestAnimationFrame(() => animateFade(sliceX, sliceY, startTime));
            }
        }

        // Trigger fading effect for each slice randomly
        for (let i = 0; i < 9; i++) {
            const sliceX = i % 3;
            const sliceY = Math.floor(i / 3);
            const startTime = Date.now() + Math.random() * fadeDuration;
            animateFade(sliceX, sliceY, startTime);
        }

        // Increment the image index and continue with the loop
        currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
        setTimeout(loadCurrentImage, loopInterval);
    };
}

// Start the loop
loadCurrentImage();

$(document).ready(function() {
    const $body = $('body');
    const $sidrWrapper = $('.sidr-wrapper');

    // Function to open the sidr menu
    function openSidr() {
        $sidrWrapper.addClass('active');
        $body.addClass('sidr-open'); // Add a class to disable body scroll
    }

    // Function to close the sidr menu
    function closeSidr() {
        $sidrWrapper.removeClass('active');
        $body.removeClass('sidr-open'); // Remove the class to enable body scroll
    }

    // Toggle sidr menu on burger icon click
    $('.iqoniq-bargur').click(function() {
        if ($sidrWrapper.hasClass('active')) {
            closeSidr();
        } else {
            openSidr();
        }
    });

    // Close sidr menu on close button click
    $('.sidr-close-button').click(function() {
        closeSidr();
    });

    // Close sidr menu when clicking outside of it
    $(document).on('mouseup touchstart', function(event) {
        if (!$sidrWrapper.is(event.target) && $sidrWrapper.has(event.target).length === 0 && $sidrWrapper.hasClass('active')) {
            closeSidr();
        }
    });


    $('.iqoniq-about-slide').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000, // Adjust the autoplay speed (in milliseconds)
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            // Add more responsive settings as needed
        ]
    });
});
