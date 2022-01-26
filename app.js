//Global variable
let total = [];

//-----------------Click / Touch--------------------------

//Onclick mouse or tuch calcylator
const calCyl = $('.calCyl').toArray();
calCyl.forEach((element) => {
  element.addEventListener('click', () => {
    //If previesly calcylator return is there, clear
    controll();
    //Add style onClick
    element.classList.add('pressed');
    //Remove style
    setTimeout(() => {
      element.classList.remove('pressed');
    }, 100);
  });
});

//Add 'number' to sum onclick
const numbers = $('.number').toArray();
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', () => {
    //Visually show numer to user
    $('#sumInp').text($('#sumInp').text() + numbers[i].innerHTML);
    //Save to array
    total.push(numbers[i].innerHTML);
  });
}

//Add 'operator' to sum onclick
const operators = $('.operator').toArray();
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', () => {
    //If operator already is last, replace
    addOpe(operators[i].innerHTML);
  });
}

//Add 'special' to sum onclick
const specials = $('.special').toArray();
for (let i = 0; i < specials.length; i++) {
  specials[i].addEventListener('click', () => {
    addSpec(specials[i].innerHTML);
  });
}
//Add 'pi' to sum onclick
$('.pi').on('click', () => {
  addPi();
});

//Return 'total' onclick
$('#total').on('click', () => {
  calculate();
});

//'Clear' field on AC
$('#ac').on('click', () => {
  clearField();
});

//Remove last character
$('#c').on('click', () => {
  removeLast();
});

//------------------------Keys----------------------

$(document).on('keypress', (event) => {
  controllKey(event.keyCode);
});

function controllKey(key) {
  switch (key) {
    // 0
    case 48:
      addNum('0');
      pressed('#zero');
      break;
    // 1
    case 49:
      addNum('1');
      pressed('#one');
      break;
    // 2
    case 50:
      addNum('2');
      pressed('#two');
      break;
    // 3
    case 51:
      addNum('3');
      pressed('#three');
      break;
    // 4
    case 52:
      addNum('4');
      pressed('#four');
      break;
    // 5
    case 53:
      addNum('5');
      pressed('#five');
      break;
    // 6
    case 54:
      addNum('6');
      pressed('#six');
      break;
    // 7
    case 55:
      addNum('7');
      pressed('#seven');
      break;
    // 8
    case 56:
      addNum('8');
      pressed('#eight');
      break;
    // 9
    case 57:
      addNum('9');
      pressed('#nine');
      break;
    // .
    case 46:
      addOpe('.');
      pressed('#dot');
      break;
    // +
    case 43:
      addOpe('+');
      pressed('#addition');
      break;
    // *
    case 42:
      addOpe('*');
      pressed('#multiplication');
      break;
    // /
    case 47:
      addOpe('/');
      pressed('#division');
      break;
    // -
    case 45:
      addOpe('-');
      pressed('#subtraction');
      break;
    // Enter
    case 13:
      calculate();
      pressed('#total');
      break;
    // BackSpace 'c'
    case 8:
      removeLast();
      pressed('#c');
      break;
    // Delete 'ac'
    case 127:
      clearField();
      pressed('#ac');
      break;
    // (
    case 40:
      addSpec('(');
      pressed('#parR');
      break;
    // )
    case 41:
      addSpec(')');
      pressed('#parL');
      break;
    // %
    case 37:
      addOpe('%');
      pressed('#modulus');
      break;
    // PI
    case 960:
      addPi();
      pressed('#pi');
      break;
  }
}

//--------------------- Functions----------------------

//Add number by key
function addNum(a) {
  controll();
  $('#sumInp').text($('#sumInp').text() + a);
  //Save to array
  total.push(a);
}

// Add operator by key
function addOpe(a) {
  controll();
  //If operator already is last, replace
  if ($('#sumInp').text() !== '') {
    let num = $('#sumInp').text();
    if (num[num.length - 1].match(/[^0-9()π]/)) {
      num = num.slice(0, -1);
      $('#sumInp').text(num);
      //Remove last from array
      total = total.slice(0, -1);
    }
  }
  //If negativ numbers
  if ($('#sumInp').text() === '' && a === '-') {
    $('#sumInp').text($('#sumInp').text() + a);
    //Save to array
    total.push(a);
    //Else if regular math
  } else if ($('#sumInp').text() !== '') {
    $('#sumInp').text($('#sumInp').text() + a);
    //Save to array
    total.push(a);
  }
}

//Add specials
function addSpec(a) {
  if ($('#sumInp').text() !== '') {
    let num = $('#sumInp').text();
    if (num[num.length - 1].match(/[^0-9/+*-]/)) {
      num = num.slice(0, -1);
      $('#sumInp').text(num);
      //Remove last from array
      total = total.slice(0, -1);
    }
  }
  $('#sumInp').text($('#sumInp').text() + a);
  total.push(a);
}

//add pi
function addPi() {
  if (total[total.length - 1] !== '3.141592653589793') {
    $('#sumInp').text($('#sumInp').text() + $('.pi').text());
    total.push('3.141592653589793');
  }
}

//Calculate
function calculate() {
  try {
    let num = $('#sumInp').text();

    if (num[num.length - 1].match(/[^0-9π)]/)) {
      num = num.slice(0, -1);
      $('#sumInp').text(num);
      //Remove last from array
      total = total.slice(0, -1);
    }

    //Format array to single string and try calculate as math equation
    let calcylReady = total[0];
    for (let i = 1; i < total.length; i++) {
      calcylReady += total[i];
    }
    let sum = eval(calcylReady);
    $('#resInp').text(sum);

    //Add calcylated class
    $('#resInp').addClass('calcylated');
    $('#sumInp').addClass('calcylated');
  } catch (err) {
    $('#resInp').text('Invalid numbers');
  }
}

//Clear fields
function clearField() {
  total = [];

  $('#sumInp').html('');
  $('#resInp').html('');

  //Remove calcylated class
  $('#resInp').removeClass('calcylated');
  $('#sumInp').removeClass('calcylated');
}

//Remove last characther
function removeLast() {
  let num = $('#sumInp').text();
  num = num.slice(0, -1);
  $('#sumInp').text(num);
  //Remove last from array
  total = total.slice(0, -1);
}

//Controll if calculated
function controll() {
  //If previesly calcylator return is there, clear
  if ($('#resInp').text() !== '') {
    $('#sumInp').html('');
    $('#resInp').html('');

    //Remove calcylated class
    $('#resInp').removeClass('calcylated');
    $('#sumInp').removeClass('calcylated');

    //Clear array
    total = [];
  }
}

//Press effekt using keys
function pressed(a) {
  //Add style onClick
  $(a).addClass('pressed');
  //Remove style
  setTimeout(() => {
    $(a).removeClass('pressed');
  }, 100);
}
