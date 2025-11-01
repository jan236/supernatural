// ===================================
// GLOBALE VARIABLEN
// ===================================
const calendar = document.getElementById('calendar');
const now = new Date();
let selectedDate = null;
let currentYear = now.getFullYear();
let currentMonth = now.getMonth();


// ===================================
// KALENDER FUNKTIONEN
// ===================================
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
        cell.classList.add('today');
    }

    // Prüfen ob Artikel existiert
    const fileName = `Articles/articles-${cellYear}-${String(cellMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}.html`;
    fetch(fileName, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                cell.style.fontWeight = 'bold';
                cell.style.color = '#000000';
                cell.style.cursor = 'pointer';
            }
        })
        .catch(() => {
            // Keine Datei vorhanden, nichts tun
        });

    cell.addEventListener('click', () => {
        if (selectedDate) {
            selectedDate.classList.remove('selected');
        }
        cell.classList.add('selected');
        selectedDate = cell;
        loadArticlesForDate(cellYear, cellMonth, day);
    });
    return cell;
}


// ===================================
// ARTIKEL LADEN
// ===================================
function loadArticlesForDate(year, month, day) {
    const newsArticleDiv = document.getElementById('newsarticle');
    const fileName = `Articles/articles-${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}.html`;

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


// ===================================
// WERBUNG LADEN
// ===================================
function loadAds() {
    const ad1 = document.getElementById('ad1');
    const ad2 = document.getElementById('ad2');
    const ad3 = document.getElementById('ad3');
    const ad4 = document.getElementById('ad4');
    const ad5 = document.getElementById('ad5');
    const ad6 = document.getElementById('ad6');
    const ad7 = document.getElementById('ad7');
    const ad8 = document.getElementById('ad8');
    const ad9 = document.getElementById('ad9');
    const ad10 = document.getElementById('ad10');

    fetch('advertising.html')
        .then(response => {
            if (!response.ok) throw new Error("Keine Werbung");
            return response.text();
        })
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            const ad1Content = tempDiv.querySelector('#ad1-content');
            const ad2Content = tempDiv.querySelector('#ad2-content');
            const ad3Content = tempDiv.querySelector('#ad3-content');
            const ad4Content = tempDiv.querySelector('#ad4-content');
            const ad5Content = tempDiv.querySelector('#ad5-content');
            const ad6Content = tempDiv.querySelector('#ad6-content');
            const ad7Content = tempDiv.querySelector('#ad7-content');
            const ad8Content = tempDiv.querySelector('#ad8-content');
            const ad9Content = tempDiv.querySelector('#ad9-content');
            const ad10Content = tempDiv.querySelector('#ad10-content');

            ad1.innerHTML = ad1Content ? ad1Content.innerHTML : '<p>Keine Werbung</p>';
            ad2.innerHTML = ad2Content ? ad2Content.innerHTML : '<p>Keine Werbung</p>';
            ad3.innerHTML = ad3Content ? ad3Content.innerHTML : '<p>Keine Werbung</p>';
            ad4.innerHTML = ad4Content ? ad4Content.innerHTML : '<p>Keine Werbung</p>';
            ad5.innerHTML = ad5Content ? ad5Content.innerHTML : '<p>Keine Werbung</p>';
            ad6.innerHTML = ad6Content ? ad6Content.innerHTML : '<p>Keine Werbung</p>';
            ad7.innerHTML = ad7Content ? ad7Content.innerHTML : '<p>Keine Werbung</p>';
            ad8.innerHTML = ad8Content ? ad8Content.innerHTML : '<p>Keine Werbung</p>';
            ad9.innerHTML = ad9Content ? ad9Content.innerHTML : '<p>Keine Werbung</p>';
            ad10.innerHTML = ad10Content ? ad10Content.innerHTML : '<p>Keine Werbung</p>';
        })
        .catch(() => {
            ad1.innerHTML = '<p>Keine Werbung</p>';
            ad2.innerHTML = '<p>Keine Werbung</p>';
            ad3.innerHTML = '<p>Keine Werbung</p>';
            ad4.innerHTML = '<p>Keine Werbung</p>';
            ad5.innerHTML = '<p>Keine Werbung</p>';
            ad6.innerHTML = '<p>Keine Werbung</p>';
            ad7.innerHTML = '<p>Keine Werbung</p>';
            ad8.innerHTML = '<p>Keine Werbung</p>';
            ad9.innerHTML = '<p>Keine Werbung</p>';
            ad10.innerHTML = '<p>Keine Werbung</p>';
        });
}


// ===================================
// HEADER SCROLL EFFEKT
// ===================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 5) {
        header.classList.add('shrink');
        header.classList.add('transparent');
    } else {
        header.classList.remove('shrink');
        header.classList.remove('transparent');
    }
});


// ===================================
// DATUMSEINGABE SPRINGEN
// ===================================
function jumpToDate() {
    const dateInput = document.getElementById('date-input');
    const selectedDateValue = dateInput.value;

    if (!selectedDateValue) {
        alert('Bitte wählen Sie ein Datum aus.');
        return;
    }

    const [year, month, day] = selectedDateValue.split('-').map(Number);

    // Kalender zu diesem Monat/Jahr rendern
    currentYear = year;
    currentMonth = month - 1; // Monate sind 0-basiert
    renderCalendar(currentYear, currentMonth);

    // Nach dem Rendern die Zelle auswählen
    setTimeout(() => {
        const cells = document.querySelectorAll('#calendar td');
        cells.forEach(cell => {
            if (cell.textContent == day && !cell.classList.contains('empty')) {
                // Vorherige Selection entfernen
                if (selectedDate) {
                    selectedDate.classList.remove('selected');
                }

                // Neue Zelle auswählen
                cell.classList.add('selected');
                selectedDate = cell;

                // Artikel laden
                loadArticlesForDate(year, month - 1, day);

                // Zur Zelle scrollen (optional)
                cell.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }, 100);
}


// ===================================
// INITIALISIERUNG BEIM LADEN
// ===================================
window.addEventListener('load', () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    // Kalender rendern
    renderCalendar(currentYear, currentMonth);

    // Heutigen Tag auswählen
    setTimeout(() => {
        const cells = document.querySelectorAll('#calendar td');
        cells.forEach(cell => {
            if (cell.textContent == day && cell.parentNode && cell.parentNode.parentNode) {
                cell.classList.add('selected');
                selectedDate = cell;
                loadArticlesForDate(year, month, day);
                loadAds();
            }
        });
    }, 100);

    // Datumseingabe initialisieren
    const dateInput = document.getElementById('date-input');
    const gotoDateBtn = document.getElementById('goto-date-btn');

    if (dateInput && gotoDateBtn) {
        // Heute als Standard setzen
        dateInput.valueAsDate = today;

        // Button-Click Handler
        gotoDateBtn.addEventListener('click', () => {
            jumpToDate();
        });

        // Enter-Taste im Input
        dateInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                jumpToDate();
            }
        });

        // Mobile: Input öffnet direkt den Date-Picker
        dateInput.addEventListener('focus', () => {
            if (window.innerWidth <= 600) {
                try {
                    dateInput.showPicker();
                } catch (e) {
                    // showPicker() wird nicht von allen Browsern unterstützt
                    console.log('showPicker not supported');
                }
            }
        });
    }
});