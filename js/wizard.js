(function($) {
	var userIdInput = $('#user-id');
	var largeBtnCheck = $('#large-btn');
	var btnPreview = $('#btn-preview');
	var previewBtn = $('#preview');
	var sourcePreview = $('#source-preview');
	var langDropdownBtn = $('#lang-dropdown-btn');
	var defaultUid = 'wang-xue-11-60';
	var captions = {
		"eng" : {
			"description" : "English",
			"nav-title" : "Zhihu Button",
			"user-id-lbl" : "Username",
			"large-btn-lbl" : "Large button",
			"source-preview-lbl" : "Source preview",
			"preview" : "Preview",
			"empty-uid-msg" : "Username cannot be empty"
		},
		"chn" : {
			"description" : "简体中文",
			"nav-title" : "知乎按钮",
			"user-id-lbl" : "用户名",
			"large-btn-lbl" : "大号按钮",
			"source-preview-lbl" : "源代码预览",
			"preview" : "真实效果预览",
			"empty-uid-msg" : "用户名不能为空"
		}
	};

	$(document).ready(function() {
		initViews();
		// event logic
		previewBtn.click(makeBtnPreview);
		userIdInput.keyup(makeSourcePreview);
		largeBtnCheck.change(makeSourcePreview);
		$(".dropdown-button").dropdown();

		// dropdown select logic
		$('#lang-dropdown a').click(function() {
			var langCd = $(this).data('langcd');
			changeLang(langCd);
			langDropdownBtn.html($(this).html());
		});
	});

	function initViews() {
		userIdInput.val(defaultUid);
		largeBtnCheck.prop('checked', true);
		makeSourcePreview();
		makeBtnPreview();
	}

	function makeSrc() {
		var uid = userIdInput.val(),
			isLarge = largeBtnCheck.is(':checked'),
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
		if (userIdInput.val().trim() === '') {
			alert(getCaption('empty-uid-msg'));
			return;
		}
		btnPreview.attr('src', makeSrc());
	}

	function changeLang(langCd) {
		if (langCd in captions) {
			var captionMap = captions[langCd];
			for (var id in captionMap) {
				var selector = '#' + id;
				var html = captionMap[id];
				$(selector).html(html);
			}
			langDropdownBtn.data('langcd', langCd);
		}
	}

	function getCaption(id) {
		var langCd = langDropdownBtn.data('langcd');
		var captionMap = captions[langCd];
		return captionMap[id];
	}
})(jQuery);
