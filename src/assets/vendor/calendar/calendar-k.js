let  calendarDate = {};
(function () {
    var riliHtml = '';
    calendarDate.today = new Date();
    calendarDate.year = calendarDate.today.getFullYear();
    calendarDate.month = calendarDate.today.getMonth() + 1;
    calendarDate.date = calendarDate.today.getDate();
    calendarDate.day = calendarDate.today.getDay();

    function getIndexDay() {
        isLeapYear();
        getDays();
        riliHtml = '';
        riliHtml1 = '';
        calendarDate.monthStart = new Date(calendarDate.year + "/" + calendarDate.month + "/1").getDay();
        console.log(calendarDate);
        if (calendarDate.monthStart == 0) {
            calendarDate.monthStart = 7;
        }
        for (var i = calendarDate.monthStart; i > 0; i--) {
            var dataDateStr = calendarDate.lastYear + "-" + calendarDate.lastMonth + "-" + (calendarDate.lastDays - i +
                1);
            riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr +
                '"><span class="ht-rili-day">' + (calendarDate.lastDays - i + 1) +
                '</span><span class="ht-rili-money"></span></div>';
        }
        for (var k = 0; k < calendarDate.days; k++) {
            var flag;
            var dataDateStr = calendarDate.year + "-" + calendarDate.month + "-" + (k + 1);
            for (var d in calendarDate.opt.data) {
                var nowDate = dataDateStr;
                var dataDate = calendarDate.opt.data[d].date;//日期
                var state = calendarDate.opt.data[d].state;//房间数量情况
                var price = calendarDate.opt.data[d].price;//价格
                flag = checkDate(nowDate, dataDate);
                if (flag) {
                    riliHtml += '' +
                        '<div class="ht-rili-td ht-rili-onclick" data-date="' + dataDateStr +'">' +
                            '<span class="ht-rili-day">' + (k + 1) + '<i data-state="' + state +'">' +"余" +state + '</i>' +'</span>' +
                            '<span class="ht-rili-money" data-money="' +price + '">'+app.currencySign+'' + price + '</span>' +
                        '</div>';
                    break;
                }
            }
            if (!flag) {
                riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr +
                    '"><span class="ht-rili-day">' + (k + 1) + '</span><span class="ht-rili-money"></span></div>';
            }
        }
        for (var j = 0; j < (42 - calendarDate.days - calendarDate.monthStart); j++) {
            var dataDateStr = calendarDate.nextYear + "-" + calendarDate.nextMonth + "-" + (j + 1);
            riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr +
                '"><span class="ht-rili-day">' + (j + 1) + '</span><span class="ht-rili-money"></span></div>';
        }

        calendarDate.month++;
        if (calendarDate.month > 12) {
            calendarDate.year += 1;
            calendarDate.month = 1;
        }
        isLeapYear();
        getDays();
        calendarDate.monthStart = new Date(calendarDate.year + "/" + calendarDate.month + "/1").getDay();
        console.log(calendarDate);
        if (calendarDate.monthStart == 0) {
            calendarDate.monthStart = 7;
        }
        for (var i = calendarDate.monthStart; i > 0; i--) {
            var dataDateStr = calendarDate.lastYear + "-" + calendarDate.lastMonth + "-" + (calendarDate.lastDays - i +
                1);
            riliHtml1 += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr +
                '"><span class="ht-rili-day">' + (calendarDate.lastDays - i + 1) +
                '</span><span class="ht-rili-money"></span></div>';
        }
        for (var k = 0; k < calendarDate.days; k++) {
            var flag;
            var dataDateStr = calendarDate.year + "-" + calendarDate.month + "-" + (k + 1);
            for (var d in calendarDate.opt.data) {
                var nowDate = dataDateStr;
                var dataDate = calendarDate.opt.data[d].date;//日期
                var state = calendarDate.opt.data[d].state;//房间数量情况
                var price = calendarDate.opt.data[d].price;//价格
                flag = checkDate(nowDate, dataDate);
                if (flag) {
                    riliHtml1 += '' +
                        '<div class="ht-rili-td ht-rili-onclick" data-date="' + dataDateStr +'">' +
                            '<span class="ht-rili-day">' + (k + 1) + '<i data-state="' + state +'">' +"余"+ state + '</i>' +'</span>' +
                            '<span class="ht-rili-money" data-money="' +price + '">'+app.currencySign+'' + price + '</span>' +
                        '</div>';
                    break;
                }
            }
            if (!flag) {
                riliHtml1 += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr +
                    '"><span class="ht-rili-day">' + (k + 1) + '</span><span class="ht-rili-money"></span></div>';
            }
        }
        for (var j = 0; j < (42 - calendarDate.days - calendarDate.monthStart); j++) {
            var dataDateStr = calendarDate.nextYear + "-" + calendarDate.nextMonth + "-" + (j + 1);
            riliHtml1 += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr +
                '"><span class="ht-rili-day">' + (j + 1) + '</span><span class="ht-rili-money"></span></div>';
        }
        calendarDate.month--;
        if (calendarDate.month < 1) {
            calendarDate.year -= 1;
            calendarDate.month = 12;
        }
        $('.ht-rili-body').append(riliHtml);
        $('.ht-rili-body1').append(riliHtml1);

        //点击日期
        $('.ht-rili-onclick').on('click', function (e) {
            dateClick(this);
            setTimeout(function(){ getTotalPrice()},500);
            app.getLinerRoom();
            app.roomIds = [];
        })
    }

    function isLeapYear() {
        if ((calendarDate.year % 4 == 0) && (calendarDate.year % 100 != 0 || calendarDate.year % 400 == 0)) {
            calendarDate.isLeapYear = true;
        } else {
            calendarDate.isLeapYear = false;
        }
    }

    function dateClick(obj) {
        $(obj).siblings().each(function () {
            $(this).removeClass('ht-rili-td-active');
        });
        $(obj).addClass('ht-rili-td-active');
    }

    function getDays(num) {
        if(num==1){calendarDate.month++};
        if (parseInt(calendarDate.month) == 1) {
            calendarDate.lastDays = new Date(calendarDate.year - 1, 12, 0).getDate();
            calendarDate.lastMonth = new Date(calendarDate.year - 1, 12, 0).getMonth() + 1;
            calendarDate.lastYear = new Date(calendarDate.year - 1, 12, 0).getFullYear();
        } else {
            calendarDate.lastDays = new Date(calendarDate.year, calendarDate.month - 1, 0).getDate();
            calendarDate.lastMonth = new Date(calendarDate.year, calendarDate.month - 1, 0).getMonth() + 1;
            calendarDate.lastYear = new Date(calendarDate.year, calendarDate.month - 1, 0).getFullYear();
        }
        if (parseInt(calendarDate.month) == 12) {
            calendarDate.nextDays = new Date(calendarDate.year + 1, 1, 0).getDate();
            calendarDate.nextMonth = new Date(calendarDate.year + 1, 1, 0).getMonth() + 1;
            calendarDate.nextYear = new Date(calendarDate.year + 1, 1, 0).getFullYear();
        } else {
            calendarDate.nextDays = new Date(calendarDate.year, calendarDate.month + 1, 0).getDate();
            calendarDate.nextMonth = new Date(calendarDate.year, calendarDate.month + 1, 0).getMonth() + 1;
            calendarDate.nextYear = new Date(calendarDate.year, calendarDate.month + 1, 0).getFullYear();
        }
        calendarDate.days = new Date(calendarDate.year, calendarDate.month, 0).getDate();
    }

    function checkDate(dateStr1, dateStr2) {
        var date1 = dateStr1.split("-");
        var date2 = dateStr2.split("-");
        if (date1[1] < 10 && date1[1].length < 2) {
            date1[1] = "0" + date1[1];
        }
        if (date1[2] < 10 && date1[2].length < 2) {
            date1[2] = "0" + date1[2];
        }
        if (date2[1] < 10 && date2[1].length < 2) {
            date2[1] = "0" + date2[1];
        }
        if (date2[2] < 10 && date2[2].length < 2) {
            date2[2] = "0" + date2[2];
        }
        date1 = date1.join("-");
        date2 = date2.join("-");
        return date1 == date2;
    }
    function getTotalPrice() {
        var price = $(".ht-rili-td-active").children(".ht-rili-money").attr("data-money");//价格
        var adult = $('.ht-custom-right .adult-input').val();//成人数量
        var child = $('.ht-custom-right .child-input').val();//儿童数量
        var totalPrice = (parseInt(adult)+parseInt(child))*parseInt(price);//计算总价钱
        console.log('totalPrice--'+totalPrice);
        if(isNaN(totalPrice)) return false;
        $(".total-price>i").text(totalPrice);
    }

    //获取日期
    function getCalendar(){
        let year=calendarDate.year;
        let month=calendarDate.month<10?"0"+calendarDate.month:calendarDate.month;
        console.log(month);
    }

    $.fn.extend({
        calendar: function (opt) {
            console.log(opt);
            if ((opt.beginDate != undefined && opt.endDate != undefined) || (opt.data.length > 0)) {
                // var beginDate = opt.data[0].date;
                // var endDate = opt.data[opt.data.length - 1].date;
                // calendarDate.beginYear = parseInt(beginDate.split('-')[0]);
                // calendarDate.beginMonth = parseInt(beginDate.split('-')[1]);
                // calendarDate.beginDate = parseInt(beginDate.split('-')[2]);
                // calendarDate.endYear = parseInt(endDate.split('-')[0]);
                // calendarDate.endMonth = parseInt(endDate.split('-')[1]);
                // calendarDate.endDate = parseInt(endDate.split('-')[2]);
                // calendarDate.year = parseInt(beginDate.split('-')[0]);
                // calendarDate.month = parseInt(beginDate.split('-')[1]);
                // calendarDate.date = parseInt(beginDate.split('-')[2]);
                //清除原来的数据
                if(calendarDate.opt && calendarDate.opt.data) calendarDate.opt.data = [];
                calendarDate.opt = opt;
            } else {
                console.log('未传入beginDate或endDate！');
            }
            calendarDate.container = '' +
                '<div class="ht-rili-querybox">'+
                    '<div class="ht-rili-datebox">' +
                        '<span class="ht-rili-leftarr"></span>' +
                        '<span class="ht-rili-date"></span>' +
                        '<span class="ht-rili-date1" style="display:none;"></span>' +
                        '<span class="ht-rili-rightarr"></span>' +
                    '</div>' +
                '</div>' +
                '<div class="ht-rili-entirety floatl">'+
                    '<div class="ht-rili-head">' +
                        '<div class="ht-rili-th">日</div>' +
                        '<div class="ht-rili-th">一</div>' +
                        '<div class="ht-rili-th">二</div>' +
                        '<div class="ht-rili-th">三</div>' +
                        '<div class="ht-rili-th">四</div>' +
                        '<div class="ht-rili-th">五</div>' +
                        '<div class="ht-rili-th">六</div>' +
                    '</div>' +
                    '<div class="ht-rili-body"></div>'+
                '</div>'+
                '<div class="ht-rili-entirety floatl" style="display:none;">'+
                    '<div class="ht-rili-head">' +
                        '<div class="ht-rili-th">日</div>' +
                        '<div class="ht-rili-th">一</div>' +
                        '<div class="ht-rili-th">二</div>' +
                        '<div class="ht-rili-th">三</div>' +
                        '<div class="ht-rili-th">四</div>' +
                        '<div class="ht-rili-th">五</div>' +
                        '<div class="ht-rili-th">六</div>' +
                    '</div>' +
                    '<div class="ht-rili-body1"></div>'+
                '</div>'+
                '<div class="ht-bottom" style="display:none;">'+
                    '<ul>'+ app.tep + '</ul>'+
                '</div>';
          
            $(opt.ele).empty();
            $(opt.ele).append(calendarDate.container);

            $('.ht-rili-date').html(calendarDate.year + '年 ' + calendarDate.month + '月');
            var aa=calendarDate.year;
            var bb=calendarDate.month+1;
            $('.ht-rili-date1').html(aa + '年 ' + bb + '月');
            getIndexDay();
            $('.ht-rili-leftarr').on('click', function () {
                $('.ht-rili-body').html('');
                $('.ht-rili-body1').html('');
                var aa=calendarDate.year;
                var bb=calendarDate.month;
                if (calendarDate.month <= 1) {
                    calendarDate.year -= 1;
                    calendarDate.month = 12;
                } else {
                    calendarDate.month -= 1;
                }
                $('.ht-rili-date').html(calendarDate.year + '年 ' + calendarDate.month + '月');
                if (bb == 0) {
                    aa -= 1;
                    bb = 12;
                }
                $('.ht-rili-date1').html(aa + '年 ' + bb + '月');
                getIndexDay();
                // calendarDate.year;
                // calendarDate.month;
                app.calendarClick();
            });
            $('.ht-rili-rightarr').on('click', function () {
                $('.ht-rili-body').html(''); 
                $('.ht-rili-body1').html('');
                var aa=calendarDate.year;
                var bb=calendarDate.month;
                if (calendarDate.month == 12) {
                    calendarDate.year += 1;
                    calendarDate.month = 1;
                } else {
                    calendarDate.month += 1;
                }
                $('.ht-rili-date').html(calendarDate.year + '年 ' + calendarDate.month + '月');
                bb++;
                if (bb == 12) {
                    aa += 1;
                    bb = 1;
                } else if(bb == 13){
                    aa += 1;
                    bb = 2;
                }else {
                    bb += 1;
                }
                $('.ht-rili-date1').html(aa + '年 ' + bb + '月');
                getIndexDay();
                app.calendarClick();
            });
            $('.counter-add').on('click', function () {
                setTimeout(function(){ getTotalPrice()},500);
            });
            $('.ht-rili-close').on('click', function () {
                $('.calendar-box').empty();
                $('.calendar-box').hide();
            });

        },
        calendarGetActive: function () {
            var activeEle = $(this).find(".ht-rili-td-active");
            var date = activeEle.attr("data-date");//日期
            var price = activeEle.children(".ht-rili-money").attr("data-money");//价格
            var state = activeEle.children(".ht-rili-day").children("i").attr("data-state");//数量情况
            var adult = $('.ht-custom-right .adult-input').val();//成人数量
            var child = $('.ht-custom-right .child-input').val();//儿童数量
            var totalPrice = (parseInt(adult)+parseInt(child))*price;//计算总价钱
            return data = {
                date: date,
                price: price,
                state: state,
                adult: adult,
                child: child,
                totalPrice: totalPrice
            }
        },

    });
})(jQuery);