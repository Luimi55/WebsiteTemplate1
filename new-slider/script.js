$(document).ready(function() {
    let slider = $('.slider');
    let timeline = $('.sliderImages');
    let images = timeline.find('img');
    let indicators = $('.indicators').find('span');
    let round = 0;
    let interval;
    let arrows = $('.arrws');
    let rightArrow = arrows.find('.fa-arrow-right');
    let leftArrow = arrows.find('.fa-arrow-left');
	 let animDur = 1000;
	 let intervalDur = 5000;

    rightArrow.on('click', function() {
        if (round < images.length - 1) {
            round++;
            let marginPercent = step(round);
            activeIndicator(round);
            animation(marginPercent);
        } else {
			  round = 0;
			  let marginPercent = step(round);
           activeIndicator(round);
           animation(marginPercent);
		  }
    });


    leftArrow.on('click', function() {
        if (round > 0) {
            round--;
            let marginPercent = step(round);
            activeIndicator(round);
            animation(marginPercent);
        } else {
			  round = images.length - 1;
			  let marginPercent = step(round);
           activeIndicator(round);
           animation(marginPercent);
		  }
    });



    function step(r) {
        var width = timeline.innerWidth();
        var step = width / images.length;
        var margin = step * r;
        return Math.round(parseInt(images.length * 100 * (margin / width)),3);
    }

    function animation(marginPercent) {
        timeline.animate({
            'margin-left': `-${marginPercent}%`
        }, animDur, 'swing');
    }

    function startSlider() {
        interval = setInterval(function() {
            var marginPercent;
            if (round < images.length - 1) {
                round++
                marginPercent = step(round);
            } else {
                marginPercent = 0;
                round = 0;
            }
            activeIndicator(round);
            animation(marginPercent);
        }, intervalDur);
    }



    function pauseSlider() {
        clearInterval(interval);
    }


    function activeIndicator(round) {
        indicators.eq(round).addClass('active').siblings().removeClass('active');
    }



    indicators.each(function() {
        $(this).on('click', function() {
            round = $(this).data('round');
            activeIndicator(round);
            if (round < images.length) {
                let marginPercent = step(round);
                animation(marginPercent);
            }
        });
    });


    startSlider();
    slider.on('mouseenter', pauseSlider);
    slider.on('mouseleave', startSlider);
});