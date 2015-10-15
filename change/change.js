var changeJS = {
    toggleDiv:function(bigWidth,smallWidth,speed) {
        var ul = $('.accordLi');

        ul.delegate('li', 'mouseover', function() {
            var width = $(this).width();
            var that = $(this);

            if (!that.is(':animated') && !that.siblings('li').is(':animated') && !that.find('dd').is(':animated')) {
                animate();
            };

            function animate() {

                if (width * 1 == smallWidth * 1) {
                    that.find('.hideDiv').stop().fadeIn(function() {
                        $(this).removeClass('hideDiv');
                    }).siblings('dd').stop().fadeOut(function() {
                        $(this).addClass('hideDiv');
                    });

                    that.animate({
                        'width': bigWidth + 'px'
                    }, speed);

                    that.siblings('li').stop().animate({
                        'width': smallWidth + 'px'
                    }, speed, function() {
                        that.siblings('li').find('.hideDiv').stop().fadeIn(function() {
                            $(this).removeClass('hideDiv');
                        }).siblings('dd').stop().fadeOut(function() {
                            $(this).addClass('hideDiv');
                        });
                    });
                }
            };
        })
    }
};