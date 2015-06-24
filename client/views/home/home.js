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
				position,
				sliding;

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
						var startX = hero.index == 1 ? e.pageX : e.pageX + parseInt((hero.index - 1) * wx);
						$(this).on('mousemove', function(e) {
							position = hero.index == 1 ? startX - e.pageX : (startX - (e.pageX + parseInt((hero.index - 1) * wx))) + parseInt((hero.index - 1) * wx);
							dragging = true;
							sliding = true;
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
					if(!dragging && sliding) {
						if(position >= (wx / 4)) {
							// Next
							container.css({
								'transform': 'translate3d(' + -(wx * hero.index) + 'px, 0, 0)',
								'transition':'transform 400ms ease-out'
							})
							hero.index += 1;
						} else if(position <= -(wx / 4)) {
							// Previous
							// console.log('previous')
						}
						console.log(hero.index)
						sliding = false;
					}
				},

				resize: function() {
					$(window).resize(function() {
						hero.setPosition();
					})
				}

			}

			hero.init()

		})();
	})

});