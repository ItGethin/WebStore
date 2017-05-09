/**
 * Created by me on 2017/03/29.
 */


$(function () {


    //跳转到购物车
        $(".myTop .top_right").children("a").on("click",function(){
            // console.log(11); 
            window.location.href = "html/car.html";
            // window.loacltion.href = "html/car.html";
        })





    //hot-good
    //按钮
    $(".hot-good>.hot>.hot-good-btn").find("img").hover(function () {
            $(this).animate({opacity: 0.8}, 500);
        },
        function () {
            $(this).animate({opacity: 1}, 500);
        });

    //li图片
    $(".hot-good>.hot>ul").children().hover(function () {
            $(this).animate({opacity: 0.7}, 500);
        },
        function () {
            $(this).animate({opacity: 1}, 500);
        });

    //ul滚动
    $(".hot-good>.hot").find("span:first-child").on("click", function () {
        // console.log($(this).parent().next().position().left);
        // if($(this).parent().next().position().left==0){
        // console.log($(this));
        $(this).parent().next().animate({left: "0px"}, 800);
        // }else{

        // }
    }).end().find("span:last-child").on("click", function () {
        // console.log($(this));
        $(this).parent().next().animate({left: "-1200px"}, 800);
        if ($(this).parent().next().position().left >= 1200) {
            $(this).parent().next().css("left", "1200px");
        }
    });

});

//tab 切换
$(function () {

    $(".tab>div").children("a").on("click", function () {
        // console.log();
        $(this).addClass("act").next().children().show().end().end()
            .parent().siblings().find("a").removeClass("act").next().children().hide();
    });

    /*
     $(".tab>div").children("a").each(function(index,ele){
     $(ele).removeClass("act");
     $(ele).on("click",function(){
     // console.log($(ele));
     $(ele).addClass("act");
     })
     })*/

    //中间图片的模糊度
    $(".all-content").find("img").hover(function () {
            $(this).animate({opacity: 0.8}, 200);
        },
        function () {
            $(this).animate({opacity: 1}, 200);
        })

});

// 回到顶部
$(function () {

    //显示与隐藏
    $(window).scroll(function () {
        // console.log(11);
        // console.log($(this).scrollTop());
        if ($(this).scrollTop() <= 600) {
            $(".fixed-bottom #toTop").hide();
        } else {
            $(".fixed-bottom #toTop").show();
        }
    });

    //回到顶部
    $(".fixed-bottom").children("#toTop").on("click", function () {
        var sc = $(window).scrollTop();
        $('body,html').animate({scrollTop: 0}, 500);
        // $(window).animate({scrollTop:0},500);
    });


});


//登录页面

// tab切换
$(function () {
    $("#jsSeltab").children("h3").on("click", function (data) {
        $(this).addClass("cstyle").siblings().removeClass("cstyle");
        var $ipu1 = $(this).data("ltn");
        var $ipu2 = $(this).data("ltw");
        // console.log($ipu2);

        $("#myform").find(".ltn").text($ipu1).end().find(".ltw").text($ipu2);
    })
});


function suijishu() {
    var str = "";
    for (var i = 0; i < 4; i++) {
        var flag = Math.floor(Math.random() * 10) % 2;
        if (flag) {
            str += Math.floor(Math.random() * 10);
        } else {//大写字母
            str += String.fromCharCode(Math.floor(Math.random() * 26 + 65));
        }
    }
    return str;
}

//产生随机数
function change() {
    var sjs = suijishu();

    $("#myform .yzm").find(".yam_nr").text(sjs);

    $("#mobile_form .items .right_inp .mySpan").find("i").text(sjs);
}


//登录的跳转
function go_login() {
    window.location.href = "http://10.20.159.52/banggou1/src/html/login.html";
}


//注册的跳转
function go_register() {
    window.location.href = "http://10.20.159.52/banggou1/src/html/register.html";
}


//产品列表的放大镜
$(function () {
    // console.log(11);

    var _smallImg = $("#smallImg");//小图
    var _smallArea = $("#smallArea");//小区域
    var _bigImg = $("#bigImg");//大图
    var _bigArea = $("#bigArea");//大区域

    //图片的放大比例
    var scale = 1.2;

    $("#myProduct_content").find(".bigImg").hover(
        function () {
            // console.log($(this));
            $(this).children("#bigArea").show();

            //放大镜
            $(document).mousemove(function (e) {
                //小图的边界
                var leftSide = _smallImg.offset().left;
                var rightSide = leftSide + _smallImg.width();
                var topSide = _smallImg.offset().top;
                var bottomSide = topSide + _smallImg.height();


                //如果在小图的区域内
                if (e.pageX > leftSide && e.pageX < rightSide && e.pageY > topSide && e.pageY < bottomSide) {
                    //显示小区域
                    _smallArea.css("display", "block");
                    //小区域的位置
                    var x = e.pageX - _smallImg.offset().left - _smallArea.width() / 2;
                    var y = e.pageY - _smallImg.offset().top - _smallArea.height() / 2;


                    //如果超出左边界，则设置X为0
                    if (x < 0) {
                        x = 0;
                    }
                    //如果超出右边界, 则设置为右边界位置的值
                    else if (x > _smallImg.width() - _smallArea.width()) {
                        x = _smallImg.width() - _smallArea.width();
                    }

                    //如果超出上边界, 则最小为0
                    if (y < 0) {
                        y = 0;
                    }
                    //如果超出下边界, 则设置为下边界位置的值
                    else if (y > _smallImg.height() - _smallArea.height()) {
                        y = _smallImg.height() - _smallArea.height();
                    }

                    //移动小区域
                    _smallArea.css({left: x, top: y});
                    //移动大图的位置
                    _bigImg.css({left: -x * scale, top: -y * scale});
                }
                else {
                    //隐藏小区域
                    _smallArea.css("display", "none");
                }
            })


        },
        function () {
            $(this).children("#bigArea").hide();
        }
    );


    $("#myProduct_content .list_left .smallImg").find("img").on({
        mouseenter: function () {
            $(this).addClass("imgactive").siblings().removeClass("imgactive");
        },
        click: function () {
            $(this).addClass("imgactive").siblings().removeClass("imgactive");
            $("#smallImg").css("background","url(../images/226399_01--w_500_h_500.jpg)");
            $("#bigImg").attr("src","../images/226399_01--w_1000_h_1000.jpg");
        }
    });



    //选择衣服颜色
    $(".mbshop_detail_colorSizeList .color_list dd").children("a").on("click",function(data){

        $(this).addClass("select").siblings().removeClass("select");

        $("#smallImg").css("background","url("+$(this).data("smallsrc")+")");
        $("#bigImg").attr("src",$(this).data("bigsrc"));
    });


    //增加与减少数量
    // console.log($(".mbshop_detail_num .nums").find("input"));
    var inp = $(".mbshop_detail_num .nums input");
    var nums = parseInt($(inp).val());
    // console.log(nums);
    $(".mbshop_detail_num .nums #jianshao").on("click",function(){
        nums--;
        // console.log(nums);
        if(nums<1){
            nums = 1;
        }
        $(inp).val(nums);
    });
    $(".mbshop_detail_num .nums #zenjia").on("click",function(){
        nums++;
        $(inp).val(nums);
    })
});


