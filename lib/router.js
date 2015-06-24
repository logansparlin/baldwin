Router.configure({
	layoutTemplate: 'layout',
	waiton: function() {
		return Meteor.subscribe('sections');
	}
});

Router.route('/', {
	action: function() {
		document.title = "BALDWIN — Men's & Women's Clothing, Designer Denim Jeans"
		if(this.ready()) {
			this.render('mainHeader', {to: 'header'})
			this.render('home')
			this.render('mainFooter', {to: 'footer'})
		}
		this.next()
	},
	data: function() {
		return Sections.find()
	},
	fastRender:true
});
