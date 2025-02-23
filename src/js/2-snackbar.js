import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const refs = {
  form: document.querySelector('.form'),
};
refs.form.addEventListener('submit', onSubmitPress);
function onSubmitPress(e) {
  e.preventDefault();
  const isFulfilled = document.querySelector(
    'input[value="fulfilled"]'
  ).checked;
  const delay = document.querySelector('input[type="number"]').value;
  if (delay < 0) {
    iziToast.warning({
      position: 'topRight',
      message: '⚠️ Введіть коректне число (0 або більше)',
    });
    return;
  }
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay =>
      iziToast.success({
        position: 'topRight',
        message: `✅ Fulfilled promise in ${delay}ms`,
      })
    )
    .catch(delay => {
      iziToast.error({
        position: 'topRight',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
  document.querySelector('input[type="number"]').value = '';
  document.querySelector('input[type="radio"]:checked').checked = false;
}
