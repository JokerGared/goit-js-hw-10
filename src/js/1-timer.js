import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = '';
const refs = {
  startButton: document.querySelector('[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};
const timer = {
  intervalId: null,
  start() {
    this.intervalId = setInterval(() => this.tick(), 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    console.log(this.intervalId);
  },
  tick() {
    const currentTime = Date.now();
    const diff = userSelectedDate.getTime() - currentTime;
    decrementTime(timeToStr(convertMs(diff)));
    if (diff < 1000) {
      this.stop();
      refs.dateInput.disabled = false;
    }
  },
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (options.defaultDate.getTime() >= userSelectedDate.getTime()) {
      iziToast.warning({
        position: 'topLeft',
        message: 'Please choose a date in the future',
      });
      refs.startButton.disabled = true;
    } else {
      refs.startButton.disabled = false;
    }
  },
};

refs.startButton.disabled = true;
flatpickr('#datetime-picker', options);
refs.startButton.addEventListener('click', () => {
  timer.start();
  refs.dateInput.disabled = true;
  refs.startButton.disabled = true;
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function timeToStr({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  return { days, hours, minutes, seconds };
}

function decrementTime({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = days;
  refs.hoursField.textContent = hours;
  refs.minutesField.textContent = minutes;
  refs.secondsField.textContent = seconds;
}
