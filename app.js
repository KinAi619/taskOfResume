// Список курсов
let courses = [
  { name: "Courses in England", prices: [0, 200] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [0, 100];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];
//==========================================================================

const minInput = document.getElementById("input-first");
const maxInput = document.getElementById("input-last");
const submitBtn = document.querySelector("#submit-btn");
const list = document.querySelector("#list");

function show() {
    list.innerHTML=""; // чтобы на странице каждый раз значения обновлялись, а не дополнялись
  const checkPrices = courses.filter((price) => {
    // const [minValue, maxValue] = requiredRange1 // Для удобства чтения кода, если Вы хотите сделать исключительно по тем значениям что у вас то просто раскоментируйте это и закомментируйте const minValue и const maxValue
    const [minPrice, maxPrice] = price.prices; // Для удобства чтения кода

    const minValue = minInput.value; // Фиксируем значения введенные в minInput, я это сделал чтобы отообразить, что фильтр действительно работает, при абсолютно любых значениях и чтобы можно было проверить все варианты фильтров ничего не меняя в самом коде. Просто введите необходимые значения на странице
    const maxValue = maxInput.value; // Фиксируем значения введенные в maxInput

    // Если оба значения цены курса null, то на данный момент этого курса нет в продаже
    if (minPrice === null && maxPrice === null) {
      return false;
    }
    
    // выводим курс если у него макс. знач. не определено, но он нам подходит
    if (maxPrice === null && minPrice !== null) {
/*       if (maxValue === null) return true; // он нам подходит, если макс. знач. фильтра так же не определено
      return maxValue >= minPrice; */
      return (maxValue === null || maxValue >= minPrice) // он нам подходит, если макс. знач. фильтра так же не определено или, если макс. знач. фильтра больше меньшего значения прайса
    }
    

    // Выводим курс если у него minPrice = null, но при этом он нам подходит
    if (minPrice === null && maxPrice !== null) {
      /* if (maxValue === null) return true; // он нам подходит, если макс. значение фильтра не определено
      return minValue <= maxPrice; // он нам подходит, если мин. значение фильтра меньше либо равно большего значения прайса */
      return (maxValue === null || minValue <= maxPrice)// Он нам подходит, если макс. значение фильтра не определено или ,если мин. значение фильтра меньше либо равно большего значения прайса 
    }

    // основной отбор курса
    return (
      (minValue >= minPrice && minValue <= maxPrice) || //он нам подходит, если мин. знач. фильтра входит в интервал цены курса
      (maxValue >= minPrice && maxValue <= maxPrice) // он нам подходит, если макс. знач. фильтра входит в интервал цены курса
    );
  });

  //осталось лишь перебрать те значения которые у нас получились и вывести их
  for (i = 0; i < checkPrices.length; i++) {
    const newLi = document.createElement("li");

    // Выводим на страницу названия с интервалами всех объектов, что нам подходят
    newLi.innerText = `${checkPrices[i].name}: ${checkPrices[i].prices[0]} - ${checkPrices[i].prices[1]}`;
    console.log(
      `${checkPrices[i].name}: ${checkPrices[i].prices[0]} - ${checkPrices[i].prices[1]}`
    ); // выводим в консоль названия с интервалами всех объектов, что нам подходят

    list.append(newLi);
  }
}

submitBtn.addEventListener("click", show);
