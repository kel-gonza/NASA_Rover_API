// create a time-up since curiositie's launch date: nov 26 2011 at 15:02:00

// main necessities

const yrs = document.querySelector(".yrs");
const mos = document.querySelector('.mos');
const day = document.querySelector('.days');
const hrs = document.querySelector('.hrs');
const mins = document.querySelector('.mins');
const secs = document.querySelector('.secs');


const startDate = new Date('2011-11-26T15:02:00Z');

function updateTimer() {
  const now = new Date();
  const timeDiff = now - startDate;
  
  const years = Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 365);
  
  let months = now.getMonth() - startDate.getMonth();
  if (months < 0) {
	  months += 12;
	}
	const yearsInMonths = years * 12;
	months += yearsInMonths;
	months %= 12; // cap the number of months to 12

  const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24) % months;
  const seconds = Math.floor(timeDiff / 1000) % 60;
  const minutes = Math.floor(timeDiff / 1000 / 60) % 60;
  const hours = Math.floor(timeDiff / 1000 / 60 / 60) % 24;

  
  const formattedYears = years.toString().padStart(2, '0');
  const formattedMonths = months.toString().padStart(2, '0');
  const formattedDays = days.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  yrs.textContent = formattedYears;
  mos.textContent = formattedMonths;
  day.textContent = formattedDays;
  hrs.textContent = formattedHours;
  mins.textContent = formattedMinutes;
  secs.textContent = formattedSeconds;
}

setInterval(updateTimer, 1000);
