exports.data = {
	userId:		'user123',
	userName:	'Don Lim',
	'email':	'email@domain.com',
	'subject':	'email test 123',
	content:	'sample content',
	general_timeout:	5000,
	user_data : process.env.SAMPLE_USER_DATA,
	isAdmin : false
};
// The key (the text in front of colon) doesn't have to be surrounded with quotes. The value (the text after the colon) should in quotes unless the value is a number, a variable or a boolean (true||false). Don Lim

exports.varInConfig = 1215;
// You can put multiple variables for exports in a single file.