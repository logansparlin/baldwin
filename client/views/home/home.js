Template.home.helpers({
	sections: function() {
		return Sections.find();
	}
});

Template.home.onRendered(function() {
	this.autorun(function() {
		var count = Sections.find().count();

		var app = (function() {

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
					wx = $(window).width();
					for(var i = 0; i<count; i++) {
						$('.hero').eq(i).css({
							'left': wx * i,
							'width': wx
						})
					}
					this.drag();
				},

				drag: function() {
					container.on('mousedown', function(e) {	
						container.css({'transition': 'none'})
						var startX = hero.index == 1 ? e.pageX : e.pageX + parseInt((hero.index - 1) * wx);
						$(this).on('mousemove', function(e) {
							position = hero.index == 1 ? startX - e.pageX : (startX - (e.pageX + parseInt((hero.index - 1) * wx))) + parseInt((hero.index - 1) * wx);
							dragging = true;
							sliding = true;
							$(this).css({
								"transform":"translate3d(" + (-((position / 2) + (parseInt((hero.index - 1) * wx) / hero.index))) + "px, 0, 0)",
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
						if(position >= parseInt((hero.index - 1) * wx) + 200) {
							console.log('next')
							// Next
							container.css({
								'transform': 'translate3d(' + -(wx * hero.index) + 'px, 0, 0)',
								'transition':'transform 600ms ease-out',
								'transition-timing-function': 'cubic-bezier(0.39, 0.575, 0.565, 1)'
							});
							hero.index += 1;
						} else if(-position <= parseInt((hero.index - 1) * wx) + 200) {
							// Previous
							console.log('previous')
							container.css({
								'transform': 'translate3d(' + -(wx * (hero.index - 2)) + 'px, 0, 0)',
								'transition':'transform 600ms ease-out',
								'transition-timing-function': 'cubic-bezier(0.39, 0.575, 0.565, 1)'
							})
							hero.index -= 1;
						} else {
							container.css({
								'transform': 'translate3d(' + -(wx * (hero.index - 1)) + 'px, 0, 0)',
								'transition':'transform 600ms ease-out',
								'transition-timing-function': 'cubic-bezier(0.39, 0.575, 0.565, 1)'
							})
						}
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