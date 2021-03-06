;(function ($) {
    $.fn.uiCheckbox = function (options) {
        return $(':checkbox+label').each(
            function () {
                if ($(this).prev().is(':disabled') == false) {
                    if ($(this).prev().is(':checked')) {
                        $(this).addClass("ui-checkbox-checked");
                    } else {
                        $(this).removeClass('ui-checkbox-checked');
                    }
                }
            }).click(function (event) {
                if ($(this).prev().is(':checked')) {
                    $(this).removeClass("ui-checkbox-checked");
                    $(this).prev().attr("checked", true);
                }
                else {
                    $(this).addClass('ui-checkbox-checked');
                    $(this).prev().attr("checked", false);
                }
                event.stopPropagation();
            });
    }
    $.fn.uiRadio = function (options) {
        return $(':radio+label').each(
            function () {
                if ($(this).prev().is(":checked"))
                    $(this).addClass('ui-radio-checked');
            }).click(function (event) {
                $(this).siblings().removeClass("ui-radio-checked");
                if (!$(this).prev().is(':checked')) {
                    $(this).addClass("ui-radio-checked");
                    $(this).prev()[0].checked = true;
                }
                event.stopPropagation();
            })
    }

    $.fn.uiSelect = function () {
		return $('.ui-select').each(function(){
	    var _self =$(this);
        var _parent = _self.parent();
        var wrapHtml = '<div class="ui-select"></div>';
        var $wrapHtml = $(wrapHtml).appendTo(_parent);
        var selectedOptionValue = _self.find("option:selected").attr("value");
		var selectedOptionText=_self.find("option:selected").text();
        var name = _self.attr("name");
		var inputHtml = '<input type="hidden" value="' + selectedOptionValue + '" name="' + name + '" />';
        $(inputHtml).appendTo($wrapHtml);
        var aHtml = '<a class="ui-selected-value" href="javascript:void(0);">' + selectedOptionText + '</a>';
        $(aHtml).appendTo($wrapHtml);
        var ulHtml = '<ul class="ui-select-options"></ul>';
        var $ulHtml = $(ulHtml).appendTo($wrapHtml);
        var liHtml = "";
        _self.find("option").each(function () {
            if ($(this).attr("selected")) {
                liHtml += '<li class="ui-select-option-item"><a href="javascript:void(0);" class="ui-select-option-selected" rel="' + $(this).attr("value") + '">' + $(this).text() + '</a></li>';
            } else {
                liHtml += '<li class="ui-select-option-item"><a href="javascript:void(0);" rel="' + $(this).attr("value") + '">' + $(this).text() + '</a></li>';
            }
        });
        $(liHtml).appendTo($ulHtml);
        $($wrapHtml, _parent).hover(function () {
            $(this).addClass("ui-select-hover");
        }, function () {
            $(this).removeClass("ui-select-hover");
        });
        $(".ui-selected-value", $wrapHtml).click(function () {
            $(this).blur();
            $(".ui-select-options", $wrapHtml).show();
            return false;
        });
        $(".ui-select-option-item a", $wrapHtml).click(function () {
            $(this).blur();
            var value = $(this).attr("rel");
            var txt = $(this).text();
			$(".ui-selected-value", $wrapHtml).prev().val(txt);
            $(".ui-selected-value", $wrapHtml).text(txt);
            $(".ui-select-option-item a", $wrapHtml).removeClass("selected");
            $(this).addClass("selected");
            $(".ui-select-options", $wrapHtml).hide();
            return false;
        });
        $(document).click(function (event) {
            if ($(event.target).attr("class") != "ui-select") {
                $(".ui-select-options", $wrapHtml).hide();
            }
        });
        _self.remove();
		})
     }

		$(".ui-select").uiSelect();
         $(".ui-form-text").uiRadio().uiCheckbox();

})(jQuery)
