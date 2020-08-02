/* Vietnamese localization for the jQuery UI date picker plugin. */
/* Written by Tien Do (tiendq@gmail.com) */

jQuery(function ($)
{
  $.datepicker.regional["vi-VN"] =
	{
		closeText: "Đóng",
		prevText: "Trước",
		nextText: "Sau",
		currentText: "Hôm nay",
		monthNames: ["Tháng 01 /", "Tháng 02 /", "Tháng 03 /", "Tháng 04 /", "Tháng 05 /", "Tháng 06 /", "Tháng 07 /", "Tháng 08 /", "Tháng 09 /", "Tháng 10 /", "Tháng 11 /", "Tháng 12 /"],
		monthNamesShort: ["Một", "Hai", "Ba", "Bốn", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười một", "Mười hai"],
		dayNames: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
		dayNamesShort: ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"],
		dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
		weekHeader: "Tuần",
		dateFormat: "dd/mm/yy",
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ""
	};

	$.datepicker.setDefaults($.datepicker.regional["vi-VN"]);
});