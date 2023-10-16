window.addEventListener('load', async function () {
  const notificationBell = document.querySelector('.bell-icon');
  const footer = document.querySelector('#footer');
  console.log("i am working");
  activateBell();
  setTimeout(deactivateBell, 5000);



  notificationBell.addEventListener('click', () => {
    deactivateBell();
    setTimeout(activateBell, 100);
  });

  function activateBell() {
      notificationBell.classList.add('activate');
  }

  function deactivateBell() {
    notificationBell.classList.remove('activate');
    console.log("hello");
}



});
