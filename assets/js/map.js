var byClick =false;
var markers = [];
var centerInfo = [];
var map = null;
var goCenter = false;
var acencyHtml = '';

var locations = [
	{
		cityId:2,
		districtId:760,
		lat:10.7751766, 
		lng:106.680853,
		html:"<h3>Ho Chi Minh City Vocational Training College</h3><p>235 Hoàng Sa, Tân Định, Quận 1, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"235 Hoàng Sa, Tân Định, Quận 1, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:760,
		lat:10.7870652, 
		lng:106.692827,
		html:"<h3>Quận Đoàn 1</h3><p>178 Đường Nguyễn Văn Thủ, Đa Kao, Quận 1, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"178 Đường Nguyễn Văn Thủ, Đa Kao, Quận 1, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:761,
		lat:10.8555812, 
		lng:106.6302274,
		html:"<h3>Trường Trung Cấp Bách Khoa Hồ Chí Minh</h3><p>802/1-3-5 Đường Nguyễn Văn Quá, Đông Hưng Thuận, Quận 12, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"802/1-3-5 Đường Nguyễn Văn Quá, Đông Hưng Thuận, Quận 12, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:761,
		lat:10.8536002, 
		lng:106.6241764,
		html:"<h3>Biotechnology Center of Ho Chi Minh city</h3><p>2374 QL1A, Trung Mỹ Tây, Quận 12, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"2374 QL1A, Trung Mỹ Tây, Quận 12, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:762,
		lat:10.8599602, 
		lng:106.7409336,
		html:"<h3>Bệnh viện Quận Thủ Đức</h3><p>29 Phú Châu, Tam Phú, Thủ Đức, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"29 Phú Châu, Tam Phú, Thủ Đức, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:762,
		lat:10.8544059, 
		lng:106.7557397,
		html:"<h3>UBND quận Thủ Đức</h3><p>Quận Thủ Đức, Nguyễn Văn Bá, Bình Thọ, Thủ Đức, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"Quận Thủ Đức, Nguyễn Văn Bá, Bình Thọ, Thủ Đức, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:763,
		lat:10.8246728, 
		lng:106.7855409,
		html:"<h3>Công Ty TNHH MTV DV Du Lịch Ngọc Thắng</h3><p>141B Dương Đình Hội, Phước Long B, Quận 9, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"141B Dương Đình Hội, Phước Long B, Quận 9, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:763,
		lat:10.8210055, 
		lng:106.7800049,
		html:"<h3>Công Ty TNHH Đầu Tư Phát Triển Du Lịch Tầm Nhìn Mới</h3><p>153, Đỗ Xuân Hợp, Phường Phước Long B, Quận 9, Thành Phố Hồ Chí Minh, Phước Long B, Quận 9, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"153, Đỗ Xuân Hợp, Phường Phước Long B, Quận 9, Thành Phố Hồ Chí Minh, Phước Long B, Quận 9, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:764,
		lat:10.8411791, 
		lng:106.6562364,
		html:"<h3>Spa Diệu Oanh</h3><p>5A, Thống Nhất, Phường 11, Quận Gò Vấp, Thành Phố Hồ Chí Minh, Phường 11, Gò Vấp, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"5A, Thống Nhất, Phường 11, Quận Gò Vấp, Thành Phố Hồ Chí Minh, Phường 11, Gò Vấp, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:764,
		lat:10.8468904, 
		lng:106.6606784,
		html:"<h3>Milky Skin Spa</h3><p>204/1 Thống Nhất, Phường 15, Gò Vấp, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"204/1 Thống Nhất, Phường 15, Gò Vấp, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:765,
		lat:10.8160353, 
		lng:106.6818353,
		html:"<h3>Go Spa Bình Thạnh</h3><p>111 Nguyễn Văn Đậu, Phường 5, Quận Bình Thạnh, Phường 7, Bình Thạnh, Hồ Chí Minh 700000, Vietnam</p><span>8AM - 9PM</span>",
		address:"111 Nguyễn Văn Đậu, Phường 5, Quận Bình Thạnh, Phường 7, Bình Thạnh, Hồ Chí Minh 700000, Vietnam"
	},{
		cityId:2,
		districtId:765,
		lat:10.8109557, 
		lng:106.6898389,
		html:"<h3>Spa Việt Hàn</h3><p>90 Lê Quang Định, Phường 14, Bình Thạnh, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"90 Lê Quang Định, Phường 14, Bình Thạnh, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:766,
		lat:10.807709, 
		lng:106.6677804,
		html:"<h3>Spa Tiên Home</h3><p>39, Giải Phóng, Phường 4, Quận Tân Bình, Thành Phố Hồ Chí Minh, Phường 4, Tân Bình, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"39, Giải Phóng, Phường 4, Quận Tân Bình, Thành Phố Hồ Chí Minh, Phường 4, Tân Bình, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:766,
		lat:10.7952971, 
		lng:106.6672896,
		html:"<h3>Spa Thiên Hương Thảo</h3><p>230 Đường Lê Văn Sỹ, Phường 1, Tân Bình, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"230 Đường Lê Văn Sỹ, Phường 1, Tân Bình, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:767,
		lat:10.7964773, 
		lng:106.6414866,
		html:"<h3>Minh Châu Spa</h3><p>87, Diệp Minh Châu, Phường Tân Sơn Nhì, Quận Tân Phú, Thành Phố Hồ Chí Minh, Tân Sơn Nhì, Tân Phú, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"87, Diệp Minh Châu, Phường Tân Sơn Nhì, Quận Tân Phú, Thành Phố Hồ Chí Minh, Tân Sơn Nhì, Tân Phú, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:767,
		lat:10.7964773, 
		lng:106.6414866,
		html:"<h3>Da Phấn Spa</h3><p>58A Trương Vĩnh Ký, Phường Tân Thành,Quận Tân Phú, Tân Thạnh, Ho Chi Minh, Hồ Chí Minh 700000, Vietnam</p><span>8AM - 9PM</span>",
		address:"58A Trương Vĩnh Ký, Phường Tân Thành,Quận Tân Phú, Tân Thạnh, Ho Chi Minh, Hồ Chí Minh 700000, Vietnam"
	},{
		cityId:2,
		districtId:768,
		lat:10.7951702, 
		lng:106.6786512,
		html:"<h3>Linh Chi Spa</h3><p>54A Trần Huy Liệu, Phường 12, Phú Nhuận, Hồ Chí Minh 700000, Vietnam</p><span>8AM - 9PM</span>",
		address:"54A Trần Huy Liệu, Phường 12, Phú Nhuận, Hồ Chí Minh 700000, Vietnam"
	},{
		cityId:2,
		districtId:768,
		lat:10.7961503, 
		lng:106.6782328,
		html:"<h3>F'Miss Spa</h3><p>110 Trần Huy Liệu, Phường 15, Phú Nhuận, Hồ Chí Minh, Vietnam</p><span>8AM - 9PM</span>",
		address:"110 Trần Huy Liệu, Phường 15, Phú Nhuận, Hồ Chí Minh, Vietnam"
	},{
		cityId:2,
		districtId:769,
		lat:10.8117335, 
		lng:106.7257436,
		html:"<h3>Nhà Hàng Ngon</h3><p>195 Nguyễn Văn Hưởng, Thảo Điền, Quận 2, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"195 Nguyễn Văn Hưởng, Thảo Điền, Quận 2, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:769,
		lat:10.8089512, 
		lng:106.7336186,
		html:"<h3>MAD House</h3><p>6/1/2 Nguyễn Ư Dĩ, Thảo Điền, Quận 2, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"6/1/2 Nguyễn Ư Dĩ, Thảo Điền, Quận 2, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:770,
		lat:10.7813386, 
		lng:106.6967971,
		html:"<h3>Shri Restaurant & Lounge</h3><p>72 Nguyễn Thị Minh Khai, Phường 6, Quận 3, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"72 Nguyễn Thị Minh Khai, Phường 6, Quận 3, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:770,
		lat:10.7837205, 
		lng:106.6938573,
		html:"<h3>Nhà Hàng Hải Sản Hồng Hải</h3><p>236 Pasteur, Phường 6, Quận 3, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"236 Pasteur, Phường 6, Quận 3, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:771,
		lat:10.7767638, 
		lng:106.6714552,
		html:"<h3>Nhà Hàng Mùa Vàng</h3><p>268 Tô Hiến Thành, Cư xá Bắc Hải, Quận 10, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"268 Tô Hiến Thành, Cư xá Bắc Hải, Quận 10, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:771,
		lat:10.7761104, 
		lng:106.6719702,
		html:"<h3>Nhà hàng Đông Hồ Eden</h3><p>12, 195-199 Cao Thắng, Phường 12, Quận 10, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"12, 195-199 Cao Thắng, Phường 12, Quận 10, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:772,
		lat:10.7675406, 
		lng:106.6549649,
		html:"<h3>Nhà Hàng Buffet Sea</h3><p>184 Lê Đại Hành, Phường 15, Quận 11, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"184 Lê Đại Hành, Phường 15, Quận 11, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:772,
		lat:10.7666816, 
		lng:106.6545197,
		html:"<h3>Beefsteak Titi ( Quán Pháp TiTi)</h3><p>14 Tôn Thất Hiệp, Phường 13, Quận 11, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"14 Tôn Thất Hiệp, Phường 13, Quận 11, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:773,
		lat:10.7586703, 
		lng:106.7059325,
		html:"<h3>Spa Tống</h3><p>Hẻm 58 Tôn Thất Thuyết, Phường 16, Quận 4, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"Hẻm 58 Tôn Thất Thuyết, Phường 16, Quận 4, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:773,
		lat:10.7564357, 
		lng:106.7028426,
		html:"<h3>Spa Moon</h3><p>201, Tôn Thất Thuyết, Phường 3, Quận 4, Thành Phố Hồ Chí Minh, Phường 3, Quận 4, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"201, Tôn Thất Thuyết, Phường 3, Quận 4, Thành Phố Hồ Chí Minh, Phường 3, Quận 4, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:774,
		lat:10.7577242, 
		lng:106.674287,
		html:"<h3>Spa Mộc</h3><p>274, Trần Phú, Phường 8, Quận 5, Thành Phố Hồ Chí Minh, Phường 8, Quận 5, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"274, Trần Phú, Phường 8, Quận 5, Thành Phố Hồ Chí Minh, Phường 8, Quận 5, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:774,
		lat:10.7582565, 
		lng:106.6740027,
		html:"<h3>Spa Khánh Hương</h3><p>48 Đường Sư Vạn Hạnh, Phường 9, Quận 5, Phường 9, Quận 5, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"48 Đường Sư Vạn Hạnh, Phường 9, Quận 5, Phường 9, Quận 5, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:775,
		lat:10.7475051, 
		lng:106.6475239,
		html:"<h3>Thủy Spa</h3><p>132 Văn Thân, Phường 4, Quận 6, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"132 Văn Thân, Phường 4, Quận 6, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:775,
		lat:10.7487594, 
		lng:106.6471054,
		html:"<h3>Công ty TNHH Chăm Sóc Sức Khỏe Phúc Hưng</h3><p>103 Hậu Giang, Phường 5, Quận 6, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"103 Hậu Giang, Phường 5, Quận 6, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:776,
		lat:10.7391671, 
		lng:106.6620614,
		html:"<h3>Dr Bảo Clinic and spa</h3><p>843A Tạ Quang Bửu, Phường 5, Quận 8, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"843A Tạ Quang Bửu, Phường 5, Quận 8, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:776,
		lat:10.7405268, 
		lng:106.6614283,
		html:"<h3>Spa Thẩm Mỹ Kiều My 2</h3><p>20/12, Đường Phạm Thế Hiển, Phường 5, Quận 8, Phường 5, Quận 8, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"20/12, Đường Phạm Thế Hiển, Phường 5, Quận 8, Phường 5, Quận 8, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:777,
		lat:10.7463436, 
		lng:106.6333179,
		html:"<h3>Nhà Hàng Phố Ốc</h3><p>16 Số 4, An Lạc A, Bình Tân, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"16 Số 4, An Lạc A, Bình Tân, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:777,
		lat:10.7464276, 
		lng:106.6243699,
		html:"<h3>Nhà Hàng Bê Vàng</h3><p>110 Vành Đai Trong, An Lạc A, Bình Tân, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"110 Vành Đai Trong, An Lạc A, Bình Tân, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:778,
		lat:10.7152633, 
		lng:106.7365493,
		html:"<h3>Sài Gòn Phố Palace Quận 7</h3><p>1521 Huỳnh Tấn Phát, Phú Mỹ, Quận 7, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"1521 Huỳnh Tấn Phát, Phú Mỹ, Quận 7, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:778,
		lat:10.7202178, 
		lng:106.7282019,
		html:"<h3>Nhà hàng Cham Charm</h3><p>2 Phan Văn Chương, Tân Phú, Quận 7, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"2 Phan Văn Chương, Tân Phú, Quận 7, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:783,
		lat:10.8881109, 
		lng:106.462283,
		html:"<h3>Bò Út Den Củ Chi</h3><p>Thái Mỹ, Củ Chi, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"Thái Mỹ, Củ Chi, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:783,
		lat:10.8881109, 
		lng:106.462283,
		html:"<h3>Bò tơ Xuân Anh</h3><p>79 Mui Lon, Tân An Hội, Củ Chi, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"79 Mui Lon, Tân An Hội, Củ Chi, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:784,
		lat:10.888095, 
		lng:106.4622829,
		html:"<h3>Nhà Hàng Ẩm Thực 6 Hòn</h3><p>100 TP. HCM, Đường Song Hành QL 22, Chung Chánh, Hóc Môn, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"100 TP. HCM, Đường Song Hành QL 22, Chung Chánh, Hóc Môn, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:784,
		lat:10.9017415, 
		lng:106.5153349,
		html:"<h3>Ẩm thực Mạ Non</h3><p>187, 22 QL22, Tân Hiệp, Hóc Môn, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"187, 22 QL22, Tân Hiệp, Hóc Môn, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:785,
		lat:10.7308442, 
		lng:106.6728062,
		html:"<h3>Nhà Hàng Bình Xuyên</h3><p>C3/ 18 Phạm Hùng, Bình Hưng, Bình Chánh, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"C3/ 18 Phạm Hùng, Bình Hưng, Bình Chánh, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:785,
		lat:10.7326678, 
		lng:106.6732247,
		html:"<h3>Hầm Rượu Bá Tước</h3><p>69 Đường Số 9, Bình Hưng, Bình Chánh, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"69 Đường Số 9, Bình Hưng, Bình Chánh, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:786,
		lat:10.7139978, 
		lng:106.7028243,
		html:"<h3>Nhà Hàng Khoái Chi Nhánh 2</h3><p>Ngân Long, Nguyễn Hữu Thọ, 27 Khu Biệt Thự, Phước Kiển, Nhà Bè, Hồ Chí Minh 70000, Việt Nam</p><span>8AM - 9PM</span>",
		address:"Ngân Long, Nguyễn Hữu Thọ, 27 Khu Biệt Thự, Phước Kiển, Nhà Bè, Hồ Chí Minh 70000, Việt Nam"
	},{
		cityId:2,
		districtId:786,
		lat:10.7144721, 
		lng:106.7024381,
		html:"<h3>Nhà hàng 368</h3><p>Hẻm số 5 Lê Văn Lương, Phước Kiển, Nhà Bè, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"Hẻm số 5 Lê Văn Lương, Phước Kiển, Nhà Bè, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:787,
		lat:10.4034853, 
		lng:106.9127228,
		html:"<h3>Nhà hàng Cần Giờ</h3><p>Đường Thạnh Thới, Huyện Cần Giờ, Long Hoà, Cần Giờ, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"Đường Thạnh Thới, Huyện Cần Giờ, Long Hoà, Cần Giờ, Hồ Chí Minh, Việt Nam"
	},{
		cityId:2,
		districtId:787,
		lat:10.4004145, 
		lng:106.9160165,
		html:"<h3>Làng Nướng 54</h3><p>Thạnh Thới, Long Hoà, Cần Giờ, Hồ Chí Minh, Việt Nam</p><span>8AM - 9PM</span>",
		address:"Thạnh Thới, Long Hoà, Cần Giờ, Hồ Chí Minh, Việt Nam"
	},{
		cityId:3,
		districtId:14401,
		lat:10.980583, 
		lng:106.6751558,
		html:"<h3>Yên Spa</h3><p>71 Đường D1, Phú Hoà, Thủ Dầu Một, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"71 Đường D1, Phú Hoà, Thủ Dầu Một, Bình Dương, Việt Nam"
	},{
		cityId:3,
		districtId:14401,
		lat:10.9829423, 
		lng:106.6773874,
		html:"<h3>Maika Home Spa</h3><p>370 Phú Lợi, Phú Hoà, Thủ Dầu Một, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"370 Phú Lợi, Phú Hoà, Thủ Dầu Một, Bình Dương, Việt Nam"
	},{
		cityId:3,
		districtId:24402,
		lat:11.0379953, 
		lng:106.6005002,
		html:"<h3>Nhà Hàng Tiệc Cưới Út Tuyết</h3><p>Hoà Lợi, Bến Cát, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"Hoà Lợi, Bến Cát, Bình Dương, Việt Nam"
	},{
		cityId:3,
		districtId:24402,
		lat:11.0629319, 
		lng:106.5833308,
		html:"<h3>Chợ Thùng Thơ</h3><p>ĐT744, An Tây, Bến Cát, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"ĐT744, An Tây, Bến Cát, Bình Dương, Việt Nam"
	},{
		cityId:3,
		districtId:34403,
		lat:11.0254273, 
		lng:106.6166239,
		html:"<h3>Spa Thúy Huỳnh</h3><p>1464, khu phố Mỹ Hiệp, phường Thái Hoà, thị, xã, Thái Hoà, Tân Uyên, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"1464, khu phố Mỹ Hiệp, phường Thái Hoà, thị, xã, Thái Hoà, Tân Uyên, Bình Dương, Việt Nam"
	},{
		cityId:3,
		districtId:34403,
		lat:11.0365394, 
		lng:106.6703618,
		html:"<h3>Ngọc Thu Home Spa</h3><p>Thành Phố Mới Bình Dương, TL746, Xã Tân Hiệp, Tân Uyên, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"Thành Phố Mới Bình Dương, TL746, Xã Tân Hiệp, Tân Uyên, Bình Dương, Việt Nam"
	},{
		cityId:3,
		districtId:34404,
		lat:10.9456357, 
		lng:106.6943169,
		html:"<h3>Spa Thảo Mộc</h3><p>59A, Thủ Khoa Huân, Phường An Thạnh, Thị Xã Thuận An, Tỉnh Bình Dương, An Thạnh, Thuận An, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"59A, Thủ Khoa Huân, Phường An Thạnh, Thị Xã Thuận An, Tỉnh Bình Dương, An Thạnh, Thuận An, Bình Dương, Việt Nam"
	},{
		cityId:3,
		districtId:34404,
		lat:10.9471513, 
		lng:106.7142306,
		html:"<h3>Mộc nhiên Spa_ Vsip1 Bình Dương</h3><p>1 Đường D21, Làng chuyên gia Oasis, Thuận An, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"1 Đường D21, Làng chuyên gia Oasis, Thuận An, Bình Dương, Việt Nam"
	},{
		cityId:3,
		districtId:34405,
		lat:10.9054271, 
		lng:106.7570626,
		html:"<h3>Tâm Beauty</h3><p>ĐT 743, Phường Bình An, Thị Xã Dĩ An, Tỉnh Bình Dương, Xã Bình Thắng, Dĩ An, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"ĐT 743, Phường Bình An, Thị Xã Dĩ An, Tỉnh Bình Dương, Xã Bình Thắng, Dĩ An, Bình Dương, Việt Nam"
	},{
		cityId:3,
		districtId:34405,
		lat:10.9050478, 
		lng:106.7532431,
		html:"<h3>Salon Tóc Thùy Diệu</h3><p>152 Phạm Hữu Lầu, Dĩ An, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"152 Phạm Hữu Lầu, Dĩ An, Bình Dương, Việt Nam"
	},{
		cityId:3,
		districtId:34406,
		lat:11.2763514, 
		lng:106.7745401,
		html:"<h3>Khách Sạn Nhà Hàng Hoa Ngọc Lan</h3><p>152 ĐT741, Vĩnh Hoà, Phú Giáo, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"152 ĐT741, Vĩnh Hoà, Phú Giáo, Bình Dương, Việt Nam"
	},{
		cityId:3,
		districtId:34406,
		lat:11.2559252, 
		lng:106.7633853,
		html:"<h3>Cầu Gãy Phú Giáo ( Cầu Phước Hoà )- Bình Dương</h3><p>Sông Bé, Vĩnh Hoà, Phú Giáo, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"Sông Bé, Vĩnh Hoà, Phú Giáo, Bình Dương, Việt Nam"
	},{
		cityId:3,
		districtId:34407,
		lat:11.2776088, 
		lng:106.3661449,
		html:"<h3>Spa Diệu Thy</h3><p>Cách Mạng Tháng 8, Dầu Tiếng, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"Cách Mạng Tháng 8, Dầu Tiếng, Bình Dương, Việt Nam"
	},{
		cityId:3,
		districtId:34407,
		lat:11.2796974, 
		lng:106.3676952,
		html:"<h3>Spa Thanh Nhi</h3><p>Cách Mạng Tháng 8, Dầu Tiếng, Bình Dương, Việt Nam</p><span>8AM - 9PM</span>",
		address:"Cách Mạng Tháng 8, Dầu Tiếng, Bình Dương, Việt Nam"
	}
];

function initMap(){
	
	var Center = new google.maps.LatLng(10.823099, 106.629664);	

	var styles = [
        {
            stylers: [
                { hue: "#929292"},
                { saturation: -100 }
            ]
        },{
            featureType: "road",
            elementType: "geometry",
            stylers: [
               { lightness:-5},
               { visibility: "simplified" }
            ]
        },{
            featureType: "road",
            elementType: "labels",
            stylers: [
              { visibility: "on" }
            ]
        }
    ];
	
	var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });
	
	var mapOptions = {
            center: Center,
            zoom:10,
            scrollwheel:false,
            draggable:true,
            draggingCursor:'move',
            noclear:true,
            disableDoubleClickZoom : true,
            clickableIcons: false,
            mapTypeControlOptions: {
            mapTypeIds:[google.maps.MapTypeId.ROADMAP, 'map_style'],
            position:google.maps.ControlPosition.TOP_RIGHT
      }
    };

	google.maps.event.addDomListener(window, "resize", function () {});
	
	var logo = './assets/img/marker.png';
	var mapId = 'map-agency';
	
	map = new google.maps.Map(document.getElementById(mapId), mapOptions);
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
	
	var infowindow = new google.maps.InfoWindow();
	
	//Tạo mảng marker
	for (var i = 0; i < locations.length; i++) {
		
		var infobox = "<div class='infobox'><div class='infobox-inr'>"+ locations[i].html +"</div></div>";
		acencyHtml += '<div class="agency">'+ locations[i].html +'</div>';
		
		var marker = new google.maps.Marker({
				cityId: locations[i].cityId,
				districtId: locations[i].districtId,
				position: {
					lat: locations[i].lat,
					lng: locations[i].lng
				},
				icon: logo,
				map: map,
				animation: google.maps.Animation.DROP,
				info: infobox,
				address: change_alias(locations[i].address)
		});
		
		marker.addListener('click', function() {
			var id = this.id;
			infowindow.setContent(this.info);
			infowindow.open(map, this);
		});
		markers.push(marker);
	}
	
	$('.list-agency').html(acencyHtml);
	
}


function centerMap(lat, long) {
	var center = new google.maps.LatLng(lat, long);
	map.setCenter(center);
}

function sortByCity(cityId){
	
	acencyHtml = '';
	for(var i = 0; i < markers.length; i++) {
		
		if(cityId == 0) {
			markers[i].setVisible(true);
			acencyHtml += '<div class="agency">'+ locations[i].html +'</div>';
		}else {
			if(markers[i].cityId != cityId) {
				markers[i].setVisible(false);
			}else {
				markers[i].setVisible(true);
				acencyHtml += '<div class="agency">'+ locations[i].html +'</div>';
			}	
			
		}
		
	}
	$('.list-agency').html(acencyHtml);
	
}

function sortByDistrict(districtId, cityId){
	goCenter = false;
	acencyHtml = '';
	
	for(var i = 0; i < markers.length; i++) {
		if(districtId == 0) {
			
			if(cityId == 0) {
				markers[i].setVisible(true);
				acencyHtml += '<div class="agency">'+ locations[i].html +'</div>';
				if(!goCenter) {
					goCenter = true;
					map.setCenter(markers[i].position);
					map.setZoom(12);
				}
			}else {
				if(markers[i].cityId == cityId) {
					markers[i].setVisible(true);
					acencyHtml += '<div class="agency">'+ locations[i].html +'</div>';
					if(!goCenter) {
						goCenter = true;
						map.setCenter(markers[i].position);
						map.setZoom(12);
					}
				}else {
					markers[i].setVisible(false);
				}
			}
			
		} else {
			if(markers[i].districtId != districtId) {
				markers[i].setVisible(false);
			}else {
				markers[i].setVisible(true);
				acencyHtml += '<div class="agency">'+ locations[i].html +'</div>';
				if(!goCenter) {
					goCenter = true;
					map.setCenter(markers[i].position);
					map.setZoom(12);
				}
			}
		}
		
	}
	$('.list-agency').html(acencyHtml);
}

function sortByStreet(street, cityId, districtId){
	goCenter = false;
	for(var i = 0; i < markers.length; i++) {
		
		if(street == 'duong') {
			if(cityId == 0 && districtId == 0) {
				markers[i].setVisible(true);
				if(!goCenter) {
					goCenter = true;
					map.setCenter(markers[i].position);
					map.setZoom(12);
				}
			}else if(districtId == 0 && cityId != 0) {
				if(markers[i].cityId == cityId) {
					markers[i].setVisible(true);
					if(!goCenter) {
						goCenter = true;
						map.setCenter(markers[i].position);
						map.setZoom(12);
					}
				}else {
					markers[i].setVisible(false);
				}
			}
			else {
				if(markers[i].districtId == districtId) {
					markers[i].setVisible(true);
					if(!goCenter) {
						goCenter = true;
						map.setCenter(markers[i].position);
						map.setZoom(12);
					}
				}else {
					markers[i].setVisible(false);
				}
			}
		}else {
			if(markers[i].address.indexOf(street) <= -1){
				markers[i].setVisible(false);
			}else if(markers[i].address.indexOf(street) > -1 && (cityId == 0 || markers[i].cityId == cityId) && (districtId == 0 || markers[i].districtId == districtId)) {
				markers[i].setVisible(true);
				if(!goCenter) {
					goCenter = true;
					map.setCenter(markers[i].position);
					map.setZoom(12);
				}
			}	
		}
		
	}
	
}
