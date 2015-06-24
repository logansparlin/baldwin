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
				wx = $(window).width();

			var hero = {

				index:1,

				init: function() {
					this.setPosition();
					this.resize();
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
							console.log(hero.index)
							position = (startX - e.pageX) * hero.index;
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
					var currentIndex = hero.index;
					if(!dragging) {
						if(position >= (wx / 4)) {
							// Next
							container.css({
								'transform': 'translate3d(' + wx * $(this).index() + 'px, 0, 0)',
								'transition':'transform 400ms ease-out'
							})
							hero.index += currentIndex;
						} else if(position <= -(wx / 4)) {
							// Previous
							console.log('previous')
						}
					}
				},

				resize: function() {
					$(window).resize(function() {
						this.setPosition();
					})
				}

			}

			hero.init()

		})();
	})
});