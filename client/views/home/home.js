Template.home.helpers({
	sections: function() {
		return Sections.find();
	}
});

Template.home.onRendered(function() {
	this.autorun(function() {
		var count = Sections.find().count();

		(function() {

			var dragging = false,
				container = $('.hero-container'),
				wx = $(window).width(),
				index = $('.hero').length;

			var hero = {

				init: function() {
					this.setPosition();
				},

				setPosition: function() {
					for(var i = 0; i<count; i++) {
						$('.hero').eq(i).css({
							'left': wx * i
						})
					}
					this.drag();
				},

				drag: function() {
					container.on('mousedown', function(e) {
						var startX = e.pageX;
						$(this).on('mousemove', function(e) {
							position = startX - e.pageX;
							dragging = true;
							// console.log(position)
							$(this).css({
								"transform":"translate3d(" + (-position) + "px, 0, 0)",
								"color":"green"
							})
						})
					});
					container.on('mouseup mouseleave', function() {
						dragging = false;
						$(this).unbind('mousemove')
						hero.setSlide();
					});
				},

				setSlide: function() {
					if(!dragging) {
						if(position >= (wx / 4)) {
							console.log('next')
						} else if(position <= -(wx / 4)) {
							console.log('previous')
						}
					}
				}
			}

			hero.init()

			$(window).resize(function() {
				hero.init()
			})

		})();
	})
});