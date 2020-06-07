const mathApp = {};

mathApp.RandomSign = function(unique){
    const randomIndex = Math.floor(Math.random() * unique.length);
    return unique[randomIndex];
}

mathApp.sign = [
    {
        visual: '➕',
        factor: '+'
    },
    {   
        visual: '➖',
        factor: '-'
    },
    {
        visual: '✖',
        factor: '*'
    },
    {
        visual: '➗',
        factor: '/'
    }
    ]

mathApp.emoj = [
    '^^',
    ':D',
    'XD',
    '._.',
    '>"<',
    '>_<',
    '>.<',
    'o_O',
    'O_o',
    ':P',
    '$.$',
    '$_$',
    'T^T',
    '>O<',
    'QwQ',
    '*_*',
    '^_^',
    "~^^~"
    /* 18 */
]

mathApp.calc = function(var1,var2,sign){
    let ans = 0;
    if(sign === '+'){
        ans = var1 + var2;
    }else if(sign === '-'){
        ans = var1 - var2;
    }else if(sign === '/'){
        ans = var1 / var2;
        if(!Number.isInteger(ans)){
            ans = ans.toFixed(1);
        }
    }else{
        ans = var1 * var2;
    }
    console.log(ans);
    return Number(ans);
}

mathApp.result = [
    "Try harder~",
    "You did well!",
    "Nice!",
    "Super!",
    "Wonderful~",
    "Aced it!"
]

mathApp.HowManyTimes = 0;
mathApp.TotalScore = 0;

mathApp.scoreCount = function(){
    mathApp.TotalScore++;
    $("p.j-total-score").text(`${mathApp.TotalScore * 100}`);
}

mathApp.userQuestion = function(){
        $('form').on('submit', function(event) {
        event.preventDefault();

        let userAnswer = $('input.j-form-answer').val();
        if (userAnswer == '' || !$.isNumeric(userAnswer)){
            $('p.j-hint').hide().delay().slideDown(300).html(`Hint: Submit a number!`)
            $('input.j-form-answer').val('');
        }else{
            $("input").prop("disabled", true);
            $('.j-correct-wrong').hide().delay().slideDown(300).html(`Incorrect~`);
            $('.j-show-answer').hide().delay(600).slideDown(300).html(`You Answer:${userAnswer}, Correct Answer:${mathApp.computerAnswer}`);
        }
        if(mathApp.computerAnswer == userAnswer || (mathApp.computerAnswer).toFixed(1) == userAnswer){
            $('.j-correct-wrong').hide().delay().slideDown(300).html(`Correct!`);
            mathApp.scoreCount();
            return userAnswer;
        }
        
    });
}



let timeRemain = 10;
mathApp.timer = function() {
    timeRemain--;
        if ($("input").prop("disabled") === true){
        console.log('you are done');
        $('button.j-next').show();
        return clearTimeout(mathApp.clear);
        }else if(timeRemain > 0){
            setTimeout(mathApp.timer, 1000);
        }else if(timeRemain == 0){
            $('.j-timer').show().html(`${timeRemain} s`);
            console.log("timer = 0");
            $("input").prop("disabled", true);
            let displayEmoj = mathApp.RandomSign(mathApp.emoj);
            $('.j-correct-wrong').hide().delay().slideDown(300).html(`time is up! next question! ${displayEmoj}`);
            $('button.j-next').show();
        return clearTimeout(mathApp.clear);
        }
    $('.j-timer').show().html(`${timeRemain} s`);
    console.log(timeRemain);
}

    

    /* button */
    mathApp.start = $('button.start').on('click',function(){
        $('button.start,.j-hide').hide();
            /* random number 1 - 10 */
            $('input.j-form-answer').val('');
            let y = (Math.floor(Math.random() * 10) + 1);
            let z = (Math.floor(Math.random() * 10) + 1);
            let displaySign = mathApp.RandomSign(mathApp.sign);

            $('p,form').removeClass('disappear');
            $("p.j-total-score").text(`${mathApp.TotalScore * 100}`);
            $("p.j-math-question").show().html(`${y} ${displaySign.visual} ${z} = <span>x</span>`);
            mathApp.computerAnswer = mathApp.calc(y,z,displaySign.factor);
            mathApp.userAnswer = mathApp.userQuestion();

            $('.j-timer').show().html(`${timeRemain} s`);
            mathApp.clear = setTimeout(mathApp.timer,1000);

    });


    mathApp.continue = $('button.j-next').on('click',function(){
                
                $('p.j-hint,button.j-next').hide();
                    if(mathApp.HowManyTimes === 4){
                        $("input").prop("disabled", true);
                         
                        $("p.j-math-question").hide();
                        $("p.j-result").hide().delay(800).slideDown(400).text(mathApp.result[mathApp.TotalScore]);
                        let displayEmoj = mathApp.RandomSign(mathApp.emoj);
                        $("p.j-thanks").hide().delay(1500).slideDown(400).text(`Thanks for playing! ${displayEmoj} - Your Final Score: ${mathApp.TotalScore * 100}`);
                        $('.j-reset').hide().delay(2400).slideDown(400)
                    }else{

                        $('input.j-form-answer').val('');
                        $('.j-correct-wrong').delay().slideUp(300);
                        $('.j-show-answer').delay().slideUp(300);
                        $("input").prop("disabled", false);
                        timeRemain = 10;
                        $('.j-timer').show().html(`${timeRemain} s`);
                        /* Rest */
                    /* random number 1 - 10 */
                        let y = (Math.floor(Math.random() * 10) + 1);
                        let z = (Math.floor(Math.random() * 10) + 1);
                        let displaySign = mathApp.RandomSign(mathApp.sign);

                        $("p.j-math-question").html(`${y} ${displaySign.visual} ${z} = <span>x</span>`);

                        mathApp.computerAnswer = mathApp.calc(y,z,displaySign.factor);
                        mathApp.clear = setTimeout(mathApp.timer,1000);
                    }
                mathApp.HowManyTimes++;
            });

mathApp.init = function(){
    mathApp.start;
    mathApp.continue;
}
    /* $('.j-math-question').text("nei nai nai?"); */
    $('.j-math-question').on('click',function(){
        let cashe = $('.j-math-question span')
        if (cashe.text() == 'x'){
            cashe.text("Found you!");
        }else{
            cashe.text("x");
        }
    });
    $('.j-reset').on('click',function(){
        mathApp.TotalScore = 0;
        timeRemain = 10;
        mathApp.HowManyTimes = 0;
        mathApp.clear = setTimeout(mathApp.timer,1000);
        clearTimeout(mathApp.clear);
        $("input").prop("disabled", false);
        $('p.j-thanks,p.j-result,.j-reset,.j-correct-wrong,.j-show-answer,p.j-hint').hide();
        $('p,form').addClass('disappear');
        $('button.start,.j-hide').show();
    });
$(document).ready(function(){
    mathApp.init();
});