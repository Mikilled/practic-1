const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
const input = document.querySelector('.input-word');
let word = '';
let arr1 = [];
let arr2 = [];
let check = 0;

$(document).ready(function () {
    $('.btn-task1').click( function() {

        $('.gamer-1-input').keypress(function(event) {
            if (event.keyCode === 13) { // 13 - код клавиши Enter
                const input = document.querySelector('.gamer-1-input');
                check_word(input.value).then((data) => {
                    if (data === undefined){        /*Добавить модальное окно о неправильном слове*/
                        console.log('нет слолва');
                        word_not_exist(input);
                    }else {
                        console.log(data);
                        if(word_in_word(word,data)) {
                            if(arr1.includes(data))
                            {
                                word_not_exist(input);
                            } else {
                                arr1.push(data);
                                var listItem = $("<li>", {class: "list-group-item", text: data});
                                // Добавляем новый элемент в конец списка
                                $(".list-group-1").append(listItem);
                                input.value = "";
                            }
                        } else {
                            word_not_exist(input);
                        }
                    } });
            }
        });

        $('.gamer-2-input').keypress(function(event) {
            if (event.keyCode === 13) { // 13 - код клавиши Enter
                const input = document.querySelector('.gamer-2-input');
                check_word(input.value).then((data) => {
                    if (data === undefined){        /*Добавить модальное окно о неправильном слове*/
                        console.log('нет слолва');
                        word_not_exist(input);
                    }else {
                        console.log(data);
                        if(word_in_word(word,data)) {
                            if(arr2.includes(data))
                            {
                                word_not_exist(input);
                            } else {
                                arr2.push(data);
                                var listItem = $("<li>", {class: "list-group-item", text: data});
                                // Добавляем новый элемент в конец списка
                                $(".list-group-2").append(listItem);
                                input.value = "";
                            }
                        } else {
                            word_not_exist(input);
                        }
                    } });
            }
        });

        $('.btn-confirm').click( function() {

            var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
            myModal.show();

            $('.btn-primary').click(function() {
                myModal.hide();
            if (check === 1) {
                $('.fields-container').addClass('d-none'); //button-div-2
                $('.button-div-2').addClass('d-none');
                $('.title').text("Результаты");
                $('.results').removeClass('d-none');
                let player1 = arr1.length;
                let player2 = arr2.length;
                $('.result-1').text(player1.toString());
                $('.result-2').text(player2.toString());
                if (player1 > player2) {
                    $('.who-win').text("Player 1 win");
                } else if (player2 > player1) {
                    $('.who-win').text("Player 2 win");
                } else {
                    $('.who-win').text("Draw");
                }
                $('.div-win').removeClass('d-none');
                $('.button-div-3').removeClass('d-none');

            } else {
                $('.gamer-container-1').css({
                    '-webkit-filter': 'blur(5px)',
                    'filter': 'blur(5px)'
                });
                $('.gamer-1-input').prop('disabled', true);
                $('.gamer-1-input').attr('placeholder', '');
                $('.gamer-2-input').prop("disabled", false);
                $('.gamer-2-input').attr('placeholder', 'Введите слово');
                check = 1;
            }
            });
        });

        $('.button-div-3').click( function () {
           window.location.reload();
        });

        check_word(input.value).then((data) => {
            if (data === undefined){        /*Добавить модальное окно о неправильном слове*/
                console.log('нет слолва');
                word_not_exist(input);
            }else {
                console.log(data);
                word = data;
                $('.input-field').addClass('d-none');
                $('.button-div').addClass('d-none');
                $('.fields-container').removeClass('d-none'); //button-div-2
                $('.button-div-2').removeClass('d-none');
                $('.title').text(word);
                $('.restart').addClass('d-none');


            } });
    });
});

async function check_word(s) {
    const apiKey = 'dict.1.1.20230224T095439Z.9184bff1006b1511.31b84c39e763f3ba41bbf23fbe6fa0493221bc98';
    const response = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiKey}&lang=ru-ru&text=${s}`);
    if (response.status === 401) {
        console.log("error");
        return;
    }
    const json = await response.json();
    if (json.def.length !== 0) {
        //console.log(json.def[0].text);
        return json.def[0].text;
    }

}

function word_not_exist(input){ /*добавить к каждому полю*/
    input.style.transition = 'background-color 1s ease';
    input.style.backgroundColor = '#f25c5c';
    setTimeout(() => {
        input.style.backgroundColor = "";
    }, 1000);
}

function word_in_word(bigWord,smallWord){
    const charCount = new Map();
    for (const char of bigWord.toLowerCase()) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

// Проверка, можно ли составить маленькое слово из букв большого слова
    let canMakeWord = true;
    for (const char of smallWord.toLowerCase()) {
        const count = charCount.get(char);
        if (!count || count < 1) {
            canMakeWord = false;
            break;
        }
        charCount.set(char, count - 1);
    }

    if (canMakeWord) {
        console.log(`Можно составить слово ${smallWord} из букв ${bigWord}.`);
        return true;
    } else {
        console.log(`Нельзя составить слово ${smallWord} из букв ${bigWord}.`);
        return false;
    }
}