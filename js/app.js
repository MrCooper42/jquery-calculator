$(document).ready(function() {
    var input = $('.buttons span');
    // console.log(input);
    var equals = $('#equals');
    var output = $('#screen');
    var operator = $(".operator");
    console.log(output);

    // /set if function with regex to check if .text() has /[0-9]/ then add to below function, create set area for the first set of numbers, and THEN think about adding a period funciton.

    $(input).click(function() {
        if ($(this).hasClass('operator') !== true) {
            console.log("this text b4", $(this).text());
            if ($(output).data("fromPrevious") == true) {
                resetCalc($(this).text());
                console.log("first if this text", $(this).text());
            } else if (($(output).data("isPendingFunc") == true) && ($(output).data("firstValSet") == false)) {

                $(output).data("firstVal", $(output).val());
                $(output).data("firstValSet", true);

                $(output).val($(this).text());
                $(output).data("secondVal", $(output).val());
                $(output).data("secondValSet", true);
                console.log("else if 1 this", this);
                // clicking a num again, after first num is set and ready for second num
            } else if (($(output).data("isPendingFunc") == true) && ($(output).data("firstValSet") == true)) {

                var curValue = $(output).val();
                var toAdd = $(this).text();
                console.log("else if2 toadd", toAdd);
                var newVal = curValue + toAdd;

                $(output).val(newVal);

                $(output).data("secondVal", $(output).val());
                $(output).data("secondValSet", true);
                //clicking on number When screen is clear
            } else {
                var curValue = $("#screen").val();
                if (curValue == "0") {
                    curValue = "";
                }
                console.log("else output", output);

                let toAdd = $(this).text();
                var newVal = curValue + toAdd;
                $(output).val(newVal)
                console.log("output", output);
                console.log("newval", newVal);

            }
        }
    });

    $(operator).click(function() {
        // var curValue = $("#screen").val();
        // $(output).val(curValue + $(this).text())
        if ($(output).data("fromPrevious") == true) {
            resetCalc($(output).val());
            $(output).data("firstValSet", false);
            $(output).data("fromPrevious", false)
        }
        var pendingFunc = $(this).text();
        $(output).data("isPendingFunc", true);
        $(output).data("thePendingFunc", pendingFunc);
        console.log(pendingFunc);
        $(operator).removeClass("pendingFunc");
        $(this).addClass("pendingFunc");

    })

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

    $("#equals").click(function() {
        if (($(output).data("firstValSet") == true) && ($(output).data("secondValSet") == true)) {
            if ($(output).data(thePendingFunc) == "+") {
                var answer = parseFloat($(output).data("firstVal")) + parseFloat($(output).data("secondVal"))
            } else if ($(output).data(thePendingFunc) == "-") {
                var answer = parseFloat($(output).data("firstVal")) - parseFloat($(output).data("secondVal"))
            } else if ($(output).data(thePendingFunc) == "*") {
                var answer = parseFloat($(output).data("firstVal")) * parseFloat($(output).data("secondVal"))
            } else if ($(output).data(thePendingFunc) == "/") {
                var answer = parseFloat($(output).data("firstVal")) / parseFloat($(output).data("secondVal"))
            }

            $(output).val(answer);

            resetCalc(finalValue);
            $(output).data("fromPrevious", true);
        } else {

        }
    });


});

//
//         $(output).append($(this).html());
//         console.log("nin", input);
//         // newOut = $(this).text();
//         // console.log("new", newOut);
//         //$(this).appendTo
//         // console.log(input.text());
//         console.log('output', output);
//     }
// });
//
// //
// $('.operator').click(function() {
//         var operator = $(this).text();
//         if (operator.innerText() === '-' && output.val().length === 0) {
//             output.val('-');
//         } else {
//
//         }
//     })
//
//    function //  do your clear work here
//

// operators function
//
// }
//
// equals function
//
// }
//
//funcition sor setting str to num
//
// }
//
// function for creating first held numbers
// set to match opperator to new numbers after
// try more es6 and regex
