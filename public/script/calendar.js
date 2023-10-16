const currentDate = document.getElementById('current-date');

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const months = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const date = new Date();
console.log(date);
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

function displayCalendar(month, year) {
    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDate(); //getting first day of month
    //console.log(firstDayOfMonth);

    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //getting last date of month

    // Clear the previous calendar
    document.getElementById('calendar-body').innerHTML = '';

    for (let day = 1; day < lastDayOfMonth; day++) {
        const cell = document.createElement("td");
        cell.innerHTML = day;
        document.getElementById('calendar-body').appendChild(cell);
    }
}

displayCalendar();

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    displayCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    displayCalendar(currentMonth, currentYear);
}

