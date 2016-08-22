$(document).ready(function() {
    var input = $('.buttons span');
    var equals = $('#equals');
    var output = $('#screen');
    var operator = $(".operator");

    function resetCalc(curValue) {
        $(output).val(curValue);
        $(".operator").removeClass("pendingFunc");
        $(output).data('isPendingFunc', false);
        $(output).data('thePendingFunc', '');
        $(output).data('firstValSet', false);
        $(output).data('secondValSet', false);
        $(output).data('firstVal', curValue);
        $(output).data('secondVal', 0);
        $(output).data('fromPrevious', false);
    }
    resetCalc(0)

    $(input).click(function() {
        if ($(this).hasClass('operator') !== true) {

            if ($(output).data("fromPrevious") == true) {
                resetCalc($(this).text());

            } else if (($(output).data("isPendingFunc") == true) && ($(output).data("firstValSet") == false)) {

                $(output).data("firstVal", $(output).val());
                $(output).data("firstValSet", true);

                $(output).val($(this).text());
                $(output).data("secondVal", $(output).val());
                $(output).data("secondValSet", true);
                console.log($(output).data("secondVal"));
                // clicking a num again, after first num is set and ready for second num
            } else if (($(output).data("isPendingFunc") == true) && ($(output).data("firstValSet") == true)) {

                var curValue = $(output).val();
                var toAdd = $(this).text();
                console.log("else if2 output data", $(output).data());
                console.log($(output).data("secondVal"));
                console.log($(output).data("firstVal"));
                var newVal = curValue + toAdd;

                $(output).val(newVal);

                $(output).data("secondVal", $(output).val());
                $(output).data("secondValSet", true);
                //clicking on number When screen is clear
            } else {
                let curValue = $("#screen").val();
                if (curValue == "0") {
                    curValue = "";
                }

                let toAdd = $(this).text();
                var newVal = curValue + toAdd;
                $(output).val(newVal)
            }
        }
    });

    // This sets operator (ex C and =) and sets next number to clear screen
    $(operator).click(function() {
        if (($(this).text() != "=") && ($(this).text() != "C")) {
            console.log($(this).text());
            if ($(output).data("fromPrevious") == true) {
                resetCalc($(output).val());
                $(output).data("firstValSet", false);
                $(output).data("fromPrevious", false)
            }

            var pendingFunc = $(this).text();
            $(output).data("isPendingFunc", true);
            $(output).data("thePendingFunc", pendingFunc);

            $(operator).removeClass("pendingFunc");
            $(this).addClass("pendingFunc");
        } else {

        }
    })

    //this does equation without eval()
    $("#equals").click(function() {
        if (($(output).data("firstValSet") == true) && ($(output).data("secondValSet") == true)) {
            if ($(output).data("thePendingFunc") == "+") {
                var answer = parseFloat($(output).data("firstVal")) + parseFloat($(output).data("secondVal"))
            } else if ($(output).data("thePendingFunc") == "-") {
                var answer = parseFloat($(output).data("firstVal")) - parseFloat($(output).data("secondVal"))
            } else if ($(output).data("thePendingFunc") == "x") {
                var answer = parseFloat($(output).data("firstVal")) * parseFloat($(output).data("secondVal"))
            } else if ($(output).data("thePendingFunc") == "÷") {
                var answer = parseFloat($(output).data("firstVal")) / parseFloat($(output).data("secondVal"))
            }

            $(output).val(answer);

            resetCalc(answer);
            $(output).data("fromPrevious", true);
        } else {
            $(output).val(42 + " ERROR");
        }
    });

    $("#clear").click(function() {
        resetCalc(0)
    })

    $("#calculator").draggable();

    // $("#opener, #closer ").click(function() {
    //     $("#opener").toggle();
    //     $("#calculator").toggle();
    // }); //would be cool but didnt feel like writing the extra code


    // Bonus 3 with eval
    $(output).keyup(function(e) {
        if (e.keyCode == 13) { // enter
            $(output).val(eval($(output).val()))
        }
        if (e.keyCode == 27) { // esc
            resetCalc('')
        }
    });

});
