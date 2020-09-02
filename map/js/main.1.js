

/*
var byClick = false;
var markers = [];
var centerInfo = [];
var map = null;
var goCenter = false;

var locations = [
	{
		storeid: 1,
		lat: 10.7751766,
		lng: 106.680853,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 2,
		lat: 10.7870652,
		lng: 106.692827,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 3,
		lat: 10.8555812,
		lng: 106.6302274,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 4,
		lat: 10.8536002,
		lng: 106.6241764,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 5,
		lat: 10.8599602,
		lng: 106.7409336,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 6,
		lat: 10.8544059,
		lng: 106.7557397,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 7,
		lat: 10.8246728,
		lng: 106.7855409,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 8,
		lat: 10.8210055,
		lng: 106.7800049,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 9,
		lat: 10.8411791,
		lng: 106.6562364,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 10,
		lat: 10.8468904,
		lng: 106.6606784,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 11,
		lat: 10.8160353,
		lng: 106.6818353,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 12,
		lat: 10.8109557,
		lng: 106.6898389,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 13,
		lat: 10.807709,
		lng: 106.6677804,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 14,
		lat: 10.7952971,
		lng: 106.6672896,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 15,
		lat: 10.7964773,
		lng: 106.6414866,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 16,
		lat: 10.7964773,
		lng: 106.6414866,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 17,
		lat: 10.7951702,
		lng: 106.6786512,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 18,
		lat: 10.7961503,
		lng: 106.6782328,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 19,
		lat: 10.8117335,
		lng: 106.7257436,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 20,
		lat: 10.8089512,
		lng: 106.7336186,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 21,
		lat: 10.7813386,
		lng: 106.6967971,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 22,
		lat: 10.7837205,
		lng: 106.6938573,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 23,
		lat: 10.7767638,
		lng: 106.6714552,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 24,
		lat: 10.7761104,
		lng: 106.6719702,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 25,
		lat: 10.7675406,
		lng: 106.6549649,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 26,
		lat: 10.7666816,
		lng: 106.6545197,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 27,
		lat: 10.7586703,
		lng: 106.7059325,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 28,
		lat: 10.7564357,
		lng: 106.7028426,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 29,
		lat: 10.7577242,
		lng: 106.674287,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 30,
		lat: 10.7582565,
		lng: 106.6740027,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 31,
		lat: 10.7475051,
		lng: 106.6475239,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 32,
		lat: 10.7487594,
		lng: 106.6471054,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 33,
		lat: 10.7391671,
		lng: 106.6620614,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 34,
		lat: 10.7405268,
		lng: 106.6614283,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 35,
		lat: 10.7463436,
		lng: 106.6333179,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 36,
		lat: 10.7464276,
		lng: 106.6243699,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 37,
		lat: 10.7152633,
		lng: 106.7365493,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 38,
		lat: 10.7202178,
		lng: 106.7282019,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 39,
		lat: 10.8881109,
		lng: 106.462283,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 40,
		lat: 10.8881109,
		lng: 106.462283,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 41,
		lat: 10.888095,
		lng: 106.4622829,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 42,
		lat: 10.9017415,
		lng: 106.5153349,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 43,
		lat: 10.7308442,
		lng: 106.6728062,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 44,
		lat: 10.7326678,
		lng: 106.6732247,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 45,
		lat: 10.7139978,
		lng: 106.7028243,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 46,
		lat: 10.7144721,
		lng: 106.7024381,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 47,
		lat: 10.4034853,
		lng: 106.9127228,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 48,
		lat: 10.4004145,
		lng: 106.9160165,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 49,
		lat: 10.980583,
		lng: 106.6751558,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 50,
		lat: 10.9829423,
		lng: 106.6773874,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 51,
		lat: 11.0379953,
		lng: 106.6005002,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 52,
		lat: 11.0629319,
		lng: 106.5833308,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 53,
		lat: 11.0254273,
		lng: 106.6166239,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 54,
		lat: 11.0365394,
		lng: 106.6703618,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 55,
		lat: 10.9456357,
		lng: 106.6943169,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 56,
		lat: 10.9471513,
		lng: 106.7142306,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 57,
		lat: 10.9054271,
		lng: 106.7570626,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 58,
		lat: 10.9050478,
		lng: 106.7532431,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 59,
		lat: 11.2763514,
		lng: 106.7745401,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 60,
		lat: 11.2559252,
		lng: 106.7633853,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 61,
		lat: 11.2776088,
		lng: 106.3661449,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}, {
		storeid: 62,
		lat: 11.2796974,
		lng: 106.3676952,
		name: 'VinMart Hà Đông',
		km: '0.8km',
		address: 'Hà Đông, Tầng 1 & 2, Tòa nhà CT1A- CT1B Khu đô thị Xala, Quận Hà Đông, Thành phố Hà Nội',
		phone: '(024) 71066866',
		imgUrl: 'images/store-normal.png',
		imgUrlList: 'images/store-normal-list.png',
		workdate: 'Thứ 2 - Chủ Nhật',
		worktime: '8h00 - 22h00'
	}
];
*/

var mapId = 'map';
var map;
function initMap() {

	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 36.544138247541014, lng: -93.06138603986801 },
		zoom: 5,
		styles: [
			{
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#31363c"
					}
				]
			},
			{
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#212121"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "administrative.country",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "administrative.locality",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#bdbdbd"
					}
				]
			},
			{
				"featureType": "administrative.neighborhood",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#181818"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#1b1b1b"
					}
				]
			},
			{
				"featureType": "poi.sports_complex",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#f00f0f"
					},
					{
						"saturation": -30
					},
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "road",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#2c2c2c"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#8a8a8a"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#373737"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#3c3c3c"
					}
				]
			},
			{
				"featureType": "road.highway.controlled_access",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#4e4e4e"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "transit.station.airport",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#ffeb3b"
					},
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#3d3d3d"
					}
				]
			}
		]
	});


	createMarker();

}

function centerMap(lat, long) {
	var center = new google.maps.LatLng(lat, long);
	map.setCenter(center);
}



// 1 thành phố có lat, long là điểm bắt đầu
//

function createMarker() {
	var count = 0;
	$.getJSON("jsons/td.json", function (result) {
		$.each(result, function (i, field) {

			// Get by_source in field
			//if (count == 1) {

			// Get Regions in by_source
			for (const property in field.by_source) {
				// property is Region name
				var latRegion = field.by_source[property].lat;
				var lngRegion = field.by_source[property].long;

				if (latRegion != undefined || lngRegion != undefined) {
					console.log('add region');

					var marker = new google.maps.Marker({
						//storeid: locations[i].storeid,
						position: {
							lat: latRegion,
							lng: longRegion
						},
						//icon: logo,
						map: map,
						animation: google.maps.Animation.DROP,
						info: '<p>hello</p>'
					});

				}
			}

			//	}
			count++;

		});
	});
}

// Page Ready
(function () {

})();
