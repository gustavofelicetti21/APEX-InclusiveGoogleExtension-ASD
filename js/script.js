
// configuração do botão de intensidade do filtro
const filterDecrementBtn = document.querySelector(".filter-decrement-btn");
const filterIcrementBtn = document.querySelector(".filter-icrement-btn");
const filterCounter = document.querySelector(".filter-counter");

let count = 0;

// funcionamento do botão de incrementar valor
filterIcrementBtn.addEventListener("click", () => {
    if (count != 10) {
        filterCounter.style.transform = "translateX(2.2rem)";
    }

    setTimeout(function () {
        if (count >= 10) {
            filterCounter.innerText = count;
        } else {
            count++;
            filterCounter.innerText = count;
            applyFilter(count);
        }
        filterCounter.style.transform = "translateX(0)";
    }, 500);
});

// funcionamento do botão de decrementar valor
filterDecrementBtn.addEventListener("click", () => {
    if (count != 0) {
        filterCounter.style.transform = "translateX(-2.2rem)";
    }

    setTimeout(function () {
        if (count <= 0) {
            filterCounter.innerText = 0;
        } else {
            count--
            filterCounter.innerText = count;
            applyFilter(count);
        }
        filterCounter.style.transform = "translateX(0)";
    }, 500);
});

function applyFilter(count) {
    let filterValue = count * 10;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: colorFilter,
            args: [filterValue]
        });
    });
}

function colorFilter(value) {
    document.documentElement.style.filter = `grayscale(${value}%)`;
}
