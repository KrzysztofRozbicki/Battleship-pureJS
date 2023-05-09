import Toastify from 'toastify-js';

export const showHit = () =>
  Toastify({
    text: 'HIT!',
    duration: 750,
    destination: '',
    newWindow: true,
    close: false,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
    },
    offset: {
      x: '25vw', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: '15vh', // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
  }).showToast();

export const showSinked = (type, points) =>
  Toastify({
    text: `${type} SINKED! \n +${points} POINTS `,
    duration: 1000,
    destination: '',
    newWindow: true,
    close: false,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
      width: '20rem',
      height: '30rem',
      display: 'flex',
      'justify-content': 'center',
      'text-align': 'center',
      'align-items': 'center',
      'font-size': '3rem',
    },
    offset: {
      x: '25vw', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: '15vh', // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
  }).showToast();

export const showMiss = points =>
  Toastify({
    text: `MISS \n -${points} POINTS`,
    duration: 750,
    destination: '',
    newWindow: true,
    close: false,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, #c78e43, #ff6600)',
      'text-align': 'center',
    },
    offset: {
      x: '25vw', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: '10vh', // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
  }).showToast();

export const youWin = points =>
  Toastify({
    text: `YOU WIN AND GOT ${points} POINTS!!!`,
    duration: 3000,
    destination: '',
    newWindow: true,
    close: false,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
      width: '30rem',
      height: '30rem',
      display: 'flex',
      'justify-content': 'center',
      'text-align': 'center',
      'align-items': 'center',
      'font-size': '5rem',
    },
    offset: {
      x: '25vw', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: '15vh', // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
  }).showToast();
