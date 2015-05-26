(function($) {
	var userIdInput = $('#user-id');
	var largeBtnCheck = $('#large-btn');
	var btnPreview = $('#btn-preview');
	var previewBtn = $('#preview');
	var sourcePreview = $('#source-preview');
	var defaultUid = 'endurance';

	$(document).ready(function() {
		initViews();
		// event logic
		previewBtn.click(makeBtnPreview);
		userIdInput.keyup(makeSourcePreview);
		largeBtnCheck.change(makeSourcePreview);
	});

	function initViews() {
		userIdInput.val(defaultUid);
		makeSourcePreview();
		makeBtnPreview();
	}

	function makeSrc() {
		var uid = userIdInput.val(),
			isLarge = largeBtnCheck.is(':checked');
			coreUrl = 'http://wanwenli.com/zhihu-btn/core.html?',
			userPara = 'user=',
			largeTrue = 'large=true';
		var src = coreUrl + userPara + uid;
		if (isLarge) {
			src = [src, largeTrue].join('&');
		}
		return src;
	}

	function makeSourcePreview() {
		var frameTemplate = '<iframe src="{{source}}" frameborder="0"></iframe>';
		var frameStr = frameTemplate.replace(/{{source}}/g, makeSrc());
		sourcePreview.val(frameStr);
	}

	function makeBtnPreview() {
		btnPreview.attr('src', makeSrc());
	}
})(jQuery);
