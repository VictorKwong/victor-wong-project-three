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
    /* total emoj: 18 */
]

mathApp.calc = function(var1,var2,sign){
    let ans = 0;
    if(sign === '+'){
        ans = var1 + var2;
    }else if(sign === '-'){
        ans = var1 - var2;
    }else if(sign === "*"){
        ans = var1 * var2;
    }else if(sign === '/'){
        ans = var1 / var2;
        if(!Number.isInteger(ans)){
            ans = ans.toFixed(1);
        }
    }
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
    $("p.j-total-score").html(`${mathApp.TotalScore * 100}`);
}

mathApp.userQuestion = function(){
        $('form').on('submit', function(event) {
        event.preventDefault();

        let userAnswer = $('input.j-form-answer').val();
        
        if (userAnswer == '' || !$.isNumeric(userAnswer)){
            $('p.j-hint').hide().delay().slideDown(300).html(`Hint: Submit a number!`)
            $('input.j-form-answer').val('');
        }else if(mathApp.computerAnswer == userAnswer || (mathApp.computerAnswer).toFixed(1) == userAnswer){
            $("input").prop("disabled", true);
            $('.j-correct-wrong').hide().delay().slideDown(300).html(`Correct!`);
            $('.j-show-answer').hide().delay(600).slideDown(300).html(`You Answer:${userAnswer}, Correct Answer:${mathApp.computerAnswer}`);
            $('button.j-next').show().prop("disabled", false);
            mathApp.scoreCount();
            return userAnswer;
        }else{
            $("input").prop("disabled", true);
            $('.j-correct-wrong').hide().delay().slideDown(300).html(`Incorrect~`);
            $('.j-show-answer').hide().delay(600).slideDown(300).html(`You Answer:${userAnswer}, Correct Answer:${mathApp.computerAnswer}`);
            $('button.j-next').show().prop("disabled", false);
        }
        
    });
}



let timeRemain = 10;
mathApp.timer = function() {
    timeRemain = (timeRemain - 0.01).toFixed(2);
        if ($("input").prop("disabled") === true){
            return clearTimeout(mathApp.clear);
        }else if(timeRemain > 0){
            setTimeout(mathApp.timer,10);
        }else if(timeRemain == 0){
            $('.j-timer').show().html(`${timeRemain} s`);
            $("input").prop("disabled", true);
            let displayEmoj = mathApp.RandomSign(mathApp.emoj);
            $('.j-correct-wrong').hide().delay().slideDown(300).html(`time is up! next question! ${displayEmoj}`);
            $('button.j-next').show().prop("disabled", false);
            return clearTimeout(mathApp.clear);
        }
    $('.j-timer').show().html(`${timeRemain} s`);
}

    /* button */
mathApp.start = $('button.j-start').on('click',function(){
    $('button.j-start,.j-hide').hide();
    mathApp.clear = setTimeout(mathApp.timer,10);
        /* random number 1 - 10 */
    $('input.j-form-answer').val('');
    let y = (Math.floor(Math.random() * 10) + 1);
    let z = (Math.floor(Math.random() * 10) + 1);
    let displaySign = mathApp.RandomSign(mathApp.sign);

    $('p,form').removeClass('disappear');
    $("p.j-total-score").html(`${mathApp.TotalScore * 100}`);
    $("p.j-math-question").show().html(`${y} ${displaySign.visual} ${z} = <span>x</span>`);
    mathApp.computerAnswer = mathApp.calc(y,z,displaySign.factor);

    $('.j-timer').show().html(`${timeRemain} s`);
    

});


mathApp.continue = $('button.j-next').on('click',function(){
    $(this).prop("disabled", true).hide();
    $('p.j-hint').hide();
        if(mathApp.HowManyTimes === 4){
            $("input").prop("disabled", true);
            
            $("p.j-math-question,button.j-next").hide();
            $("p.j-result").hide().delay(800).slideDown(400).html(`Rating: ${mathApp.result[mathApp.TotalScore]}`);
            let displayEmoj = mathApp.RandomSign(mathApp.emoj);
            $("p.j-thanks").hide().delay(1500).slideDown(400).html(`Thanks for playing! ${displayEmoj} - Your Final Score: ${mathApp.TotalScore * 100}`);
            $('.j-reset').hide().delay(2400).slideDown(400)
        }else{
            timeRemain = 10;
            mathApp.clear = setTimeout(mathApp.timer,10);
            $('input.j-form-answer').val('');
            $('.j-correct-wrong').delay().slideUp(300);
            $('.j-show-answer').delay().slideUp(300);
            $("input").prop("disabled", false);
            
            
            /* Rest */
            let y = (Math.floor(Math.random() * 10) + 1);
            let z = (Math.floor(Math.random() * 10) + 1);
            let displaySign = mathApp.RandomSign(mathApp.sign);
            /* new question */
            $("p.j-math-question").html(`${y} ${displaySign.visual} ${z} = <span>x</span>`);

            mathApp.computerAnswer = mathApp.calc(y,z,displaySign.factor);

            $('.j-timer').show().html(`${timeRemain} s`);
            
        }
    mathApp.HowManyTimes++;
});


$('.j-math-question').on('click',function(){
    let cashe = $('.j-math-question span')
    if (cashe.html() == 'x'){
        cashe.html("Found you!");
    }else{
        cashe.html("x");
    }
});

$('.j-reset').on('click',function(){
    mathApp.TotalScore = 0;
    timeRemain = 10;
    mathApp.HowManyTimes = 0;
    mathApp.clear = setTimeout(mathApp.timer,10);
    clearTimeout(mathApp.clear);
    $("input").prop("disabled", false);
    $('p.j-thanks,p.j-result,.j-reset,.j-correct-wrong,.j-show-answer,p.j-hint,button.j-next').hide();
    $('p,form').addClass('disappear');
    $('button.j-start,.j-hide').show();
});

mathApp.init = function(){
    mathApp.userAnswer = mathApp.userQuestion();
    mathApp.start;
    mathApp.continue;
}

$(document).ready(function(){
    mathApp.init();
});