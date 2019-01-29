var storyDetail ={
    _baseStory:{
        id: 1,
        img:"img/story/story-img.png",
        like: "20.244",
        share:"340",
        avatar: "img/story/avatar.png",
        author: "Nguyễn Hải Linh",
        title: "Yêu Chiếc Áo Đẫm Mồ Hôi Của Bố",
        content:"Những hôm đi làm về hơi muộn, con gái tôi vẫn hay ngóng và khi vừa nghe tiếng tôi mở cửa là sẽ chạy ra ngay và reo lên “A! Bố về! Bố ơi bố có mệt không?” rồi con bé sẽ mang cho tôi ly nước ép vợ tôi đã làm sẵn. Nhìn ánh mắt lấp lánh và tinh nghịch của con, tôi bỗng thấy bao mệt mỏi tan biến hết. Thật lạ lùng khi chỉ 1 câu hỏi thăm đơn giản và 1 ly nước cam lại có thể làm chúng ta hạnh phúc đến vậy."
    },
    resizeEnd: null,
    init: function(){
        this.reset();
        $(window).resize(function () {
            clearTimeout(storyDetail.resizeEnd);
            storyDetail.resizeEnd = setTimeout(storyDetail.setScroll, 500);
        });
    },
    setScroll: function(){
        if ($(window).width() < 680){
            $('.story-wrapper').slimScroll({
                railClass: 'element-slimScrollRail',
                barClass: 'element-slimScrollBar',
                wrapperClass: 'element-slimScrollDiv',
                'destroy': true
            }).slimScroll({
                height: $('.story-container').height() + 'px',
                railVisible: true,
                alwaysVisible: true,
                railClass: 'element-slimScrollRail',
                barClass: 'element-slimScrollBar',
                wrapperClass: 'element-slimScrollDiv'
            });
            $('.story-content').slimScroll({
                'destroy': true,
                railClass: 'element-slimScrollRail',
                barClass: 'element-slimScrollBar',
                wrapperClass: 'element-slimScrollDiv'
            }).css('height','auto');
        }
        else {
            $('.story-wrapper').slimScroll({
                railClass: 'element-slimScrollRail',
                barClass: 'element-slimScrollBar',
                wrapperClass: 'element-slimScrollDiv',
                'destroy': true
            }).css('height','100%');
            $('.story-content')
                /*.height($('.story-scroll .right-col').height() - $('.story-scroll .story-info').height())
                .show()*/
                .slimScroll({
                    'destroy': true,
                    railClass: 'element-slimScrollRail',
                    barClass: 'element-slimScrollBar',
                    wrapperClass: 'element-slimScrollDiv'
                }).slimScroll({
                    height: ($('.story-scroll .right-col').height() - $('.story-scroll .story-info').height()) + 'px',
                    railVisible: true,
                    alwaysVisible: true,
                    railClass: 'element-slimScrollRail',
                    barClass: 'element-slimScrollBar',
                    wrapperClass: 'element-slimScrollDiv'
                });
        }
    },
    reset: function(){
        $('.story-content').slimScroll({'destroy':true});
        $('.story-scroll').slimScroll({'destroy':true});
    },
    bindData: function(){
        $('.story-modal').attr('story-id',this.story.id);
        $('.story-img img').attr('src',this.story.img).attr('title',this.story.title);
        $('.like').attr('data', this.story.id);
        $('.like .function-count').html(this.story.like);
        $('.share').attr('href', this.story.share_action);
        $('.share .function-count').html(this.story.share);
        $('.avatar').attr('src',this.story.avatar).attr('title',this.story.author);
        $('.author-name').html(this.story.author);
        $('.story-name').html(this.story.title);
        $('.story-content').html(this.story.content);
        $('#add-user-story-action').attr('href', '/user-stories/add/' + this.story.collection);
        $('#view-collection-action').attr('onclick', 'storyDetail.hide(); if (loadedStory) { $(".wrapper-room").addClass("open-story-list-popup"); } else { loadStories(' + this.story.collection + ', "", 1); } return;');
    },
    show: function(story){
        this.story = $.extend({},this._baseStory,story);
        this.bindData();
        $(".room-render").addClass('blur');
        $(".story-modal").addClass('show');
        setTimeout(function () {
            $(".story-modal").addClass('story-show');
            storyDetail.setScroll();
        }, 300);
    },
    hide: function(){
        $(".story-modal").removeClass('story-show');
        $(".story-modal").removeClass('show');
        $(".room-render").removeClass('blur');
    }
}
