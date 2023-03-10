const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function findDuplicates(str) {
    let duplicates = [];
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
            let subStr = str.slice(i, j);
            let index = str.indexOf(subStr, i + 1);
            if (index !== -1) {
                if (!(index - i < subStr.length)) {
                    duplicates.push({substring: subStr, indexes: [i+1, index+1]});
                }
            }
        }
    }
    return duplicates;
}

$(document).ready(function () {
    $('.btn-task1').click( function() {
        const input = $("input").val();
        const result = findDuplicates(input);
        const myElement = $('.result');
        myElement.removeClass("d-none");
        /*myElement.innerHTML='';
        myElement.style.whiteSpace = "pre-line";
        for(let i =0;i<result.length;i++){
            myElement.textContent += `${result[i].substring} - [${result[i].indexes[0]}, ${result[i].indexes[1]}]\n`;
        }
        console.log(result);*/

        $('.list-group').empty();
        // Создаем новый элемент списка
        for(let i =0;i<result.length;i++){
            var listItem = $("<li>", {class: "list-group-item", text: `${result[i].substring} - [${result[i].indexes[0]}, ${result[i].indexes[1]}]`});

            // Добавляем новый элемент в конец списка
            $(".list-group").append(listItem);
        }


    });
});