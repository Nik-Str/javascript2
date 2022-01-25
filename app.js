//Global variabel for caalcylator
let total = [];

//Onclick mouse or tuch calcylator
const calCyl = $('.calCyl').toArray();
calCyl.forEach((element) => {
  element.addEventListener('click', () => {
    //If previesly calcylator return is there, clear
    if ($('#resInp').text() !== '') {
      $('#sumInp').html('');
      $('#resInp').html('');

      //Remove calcylated class
      $('#resInp').removeClass('calcylated');
      $('#sumInp').removeClass('calcylated');
    }
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
    $('#sumInp').text($('#sumInp').text() + numbers[i].innerHTML);
  });
}

//Add 'operator' to sum onclick
const operators = $('.operator').toArray();
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', () => {
    //If operator already is last, replace
    if ($('#sumInp').text() !== '') {
      let num = $('#sumInp').text();
      if (num[num.length - 1].match(/[^0-9]/)) {
        num = num.slice(0, -1);
        $('#sumInp').text(num);
      }
    }

    //Add operator to visual display
    $('#sumInp').text($('#sumInp').text() + operators[i].innerHTML);
  });
}

//Return 'total' onclick
$('#total').on('click', () => {
  try {
    let num = $('#sumInp').text();

    if (num[num.length - 1].match(/[^0-9]/)) {
      num = num.slice(0, -1);
      $('#sumInp').text(num);
    }

    let sum = eval(num);
    $('#resInp').text(sum);

    //Add calcylated class
    $('#resInp').addClass('calcylated');
    $('#sumInp').addClass('calcylated');
  } catch (err) {
    $('#resInp').text('Invalid numbers');
  }
});

//'Clear' field on AC
$('#ac').on('click', () => {
  $('#sumInp').html('');
  $('#resInp').html('');

  //Remove calcylated class
  $('#resInp').removeClass('calcylated');
  $('#sumInp').removeClass('calcylated');
});

//Remove last character
$('#c').on('click', () => {
  let num = $('#sumInp').text();
  num = num.slice(0, -1);
  $('#sumInp').text(num);
});
