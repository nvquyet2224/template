$(document).ready(function(){$(".filter-but, .catalog-item a, .btn.grey, .delete-but, .add-but, .sub-but").on("click",function(){$(".loadicon").addClass("is-processing"),setTimeout(function(){$(".loadicon").removeClass("is-processing")},3e3)}),$(".content").on("click","#login_but, .add-to-cart, .payment-but, .payment-next",function(){var t=this;$(t).addClass("is-processing"),setTimeout(function(){$(t).removeClass("is-processing")},3e3)})});