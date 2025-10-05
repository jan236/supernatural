(function () {
    const calendar = document.getElementById('calendar');
    const now = new Date();
    let selectedDate = null;
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();

    function renderCalendar(year, month) {
        calendar.innerHTML = '';
        const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
            "Juli", "August", "September", "Oktober", "November", "Dezember"];

        // Steuerelemente für Monat und Jahr
        const controls = document.createElement('div');
        controls.style.display = "flex";
        controls.style.justifyContent = "space-between";
        controls.style.alignItems = "center";
        controls.style.marginBottom = "0.5em";

        // Jahr zurück
        const prevYear = document.createElement('button');
        prevYear.textContent = "<<";
        prevYear.onclick = () => {
            currentYear--;
            renderCalendar(currentYear, currentMonth);
        };
        controls.appendChild(prevYear);

        // Monat zurück
        const prevMonth = document.createElement('button');
        prevMonth.textContent = "<";
        prevMonth.onclick = () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentYear, currentMonth);
        };
        controls.appendChild(prevMonth);

        // Titel
        const title = document.createElement('div');
        title.className = "calendar-title";
        title.textContent = monthNames[month] + ' ' + year;
        title.style.flexGrow = "1";
        title.style.textAlign = "center";
        controls.appendChild(title);

        // Monat vor
        const nextMonth = document.createElement('button');
        nextMonth.textContent = ">";
        nextMonth.onclick = () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentYear, currentMonth);
        };
        controls.appendChild(nextMonth);

        // Jahr vor
        const nextYear = document.createElement('button');
        nextYear.textContent = ">>";
        nextYear.onclick = () => {
            currentYear++;
            renderCalendar(currentYear, currentMonth);
        };
        controls.appendChild(nextYear);

        calendar.appendChild(controls);

        // Wochentage Kopf
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headRow = document.createElement('tr');
        const daysShort = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
        daysShort.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headRow.appendChild(th);
        });
        thead.appendChild(headRow);
        table.appendChild(thead);

        // Tage des Monats
        const tbody = document.createElement('tbody');
        const firstDay = new Date(year, month, 1);
        let startDay = firstDay.getDay(); // Sonntag = 0 ... Samstag = 6
        startDay = (startDay === 0) ? 7 : startDay; // auf Montag=1 umstellen

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let row = document.createElement('tr');
        let dayCount = 1;
        for (let i = 1; i < startDay; i++) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }
        for (let i = startDay; i <= 7; i++) {
            const cell = createDayCell(dayCount, year, month);
            row.appendChild(cell);
            dayCount++;
        }
        tbody.appendChild(row);

        while (dayCount <= daysInMonth) {
            row = document.createElement('tr');
            for (let i = 1; i <= 7; i++) {
                if (dayCount > daysInMonth) {
                    const emptyCell = document.createElement('td');
                    row.appendChild(emptyCell);
                } else {
                    const cell = createDayCell(dayCount, year, month);
                    row.appendChild(cell);
                    dayCount++;
                }
            }
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        calendar.appendChild(table);
    }

    function createDayCell(day, cellYear, cellMonth) {
        const cell = document.createElement('td');
        cell.textContent = day;
        const isToday =
            (day === now.getDate() && cellMonth === now.getMonth() && cellYear === now.getFullYear());
        if (isToday) {
            cell.style.border = '1px solid #007BFF';
            cell.style.fontWeight = 'bold';
        }
        cell.addEventListener('click', () => {
            if (selectedDate) {
                selectedDate.classList.remove('selected');
            }
            cell.classList.add('selected');
            selectedDate = cell;
            loadArticlesForDate(cellYear, cellMonth, day);
            loadAdsForDate(cellYear, cellMonth, day);
        });
        return cell;
    }

    renderCalendar(currentYear, currentMonth);
})();
  
function loadArticlesForDate(year, month, day) {
    const newsArticleDiv = document.getElementById('newsarticle');
    const fileName = `articles-${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}.html`;
    fetch(fileName)
        .then(response => {
            if (!response.ok) throw new Error("kein Artikel gefunden");
            return response.text();
        })
        .then(html => {
            newsArticleDiv.innerHTML = html;
        })
        .catch(error => {
            newsArticleDiv.innerHTML = `<section><h2>Keine Artikel vorhanden</h2><p>${error.message}</p></section>`;
        });
}

function loadAdsForDate(year, month, day) {
    const adBlock = document.querySelector('.ads'); // z.B. ad1 oder ad2
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const filename = `advertising-${dateStr}.html`; // Hier der geänderte Dateiname mit "advertising-"

    fetch(filename)
        .then(response => {
            if (!response.ok) throw new Error("Keine Werbung");
            return response.text();
        })
        .then(html => {
            adBlock.innerHTML = html;
        })
        .catch(() => {
            adBlock.innerHTML = `<p>Keine Werbung vorhanden</p>`;
        });
}



window.addEventListener('scroll', () => {
     console.log('Scroll detected');
    const header = document.querySelector('header');
    if (window.scrollY > 5) { // ab 50 Pixel scrollen
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
});

window.addEventListener('load', () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    // Funktion, um den Tag zu finden und auszuwählen
    function selectToday() {
        // Alle Zellen im Kalender durchgehen
        const cells = document.querySelectorAll('#calendar td');
        cells.forEach(cell => {
            // Prüfen, ob die Zelle eine Zahl enthält
            if (cell.textContent == day && cell.parentNode && cell.parentNode.parentNode) {
                // Hier kannst du noch extra Bedingungen setzen, falls das nur für den aktuellen Monat gilt
                // Tag auswählen
                cell.classList.add('selected'); // optional: CSS für markierten Tag
                // Artikel laden
                loadArticlesForDate(year, month, day);
                loadAdsForDate(year, month, day);
            }
        });
    }

    // Dirket nach Rendern aufrufen
    selectToday();
});



