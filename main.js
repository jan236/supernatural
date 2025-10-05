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

        // Header mit Monat und Jahr
         const title = document.createElement('div');
        title.className = "calendar-title";
        title.textContent = monthNames[month] + ' ' + year;
        calendar.appendChild(title);
        

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

        // Erster Tag des Monats (Wochentag)
        const firstDay = new Date(year, month, 1);
        let startDay = firstDay.getDay(); // Sonntag = 0 ... Samstag = 6
        startDay = (startDay === 0) ? 7 : startDay; // auf Montag=1 umstellen

        // Tage im Monat ermitteln
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let row = document.createElement('tr');
        let dayCount = 1;

        // Leere Zellen für Tage vor dem 1. des Monats
        for (let i = 1; i < startDay; i++) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }

        // Fülle den Kalender mit Tagen
        for (let i = startDay; i <= 7; i++) {
            const cell = createDayCell(dayCount);
            row.appendChild(cell);
            dayCount++;
        }
        tbody.appendChild(row);

        // Weitere Wochen
        while (dayCount <= daysInMonth) {
            row = document.createElement('tr');
            for (let i = 1; i <= 7; i++) {
                if (dayCount > daysInMonth) {
                    const emptyCell = document.createElement('td');
                    row.appendChild(emptyCell);
                } else {
                    const cell = createDayCell(dayCount);
                    row.appendChild(cell);
                    dayCount++;
                }
            }
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        calendar.appendChild(table);
    }

    function createDayCell(day) {
        const cell = document.createElement('td');
        cell.textContent = day;
        const isToday = (day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear());
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
            loadArticlesForDate(currentYear, currentMonth, day);
            // Hier kannst du eine Aktion auslösen, z.B. Tag merken oder anzeigen
            console.log(`Ausgewählter Tag: ${day}.${currentMonth + 1}.${currentYear}`);
        });
        return cell;
    }

    renderCalendar(currentYear, currentMonth);
})();

function loadArticlesForDate(year, month, day) {
    const newsArticleDiv = document.getElementById('newsarticle');
    // z.B. Dateiformat: articles-2025-10-05.html
    const fileName = `articles-${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}.html`;
    fetch(fileName)
        .then(response => {
            if (!response.ok) throw new Error("Datei nicht gefunden");
            return response.text();
        })
        .then(html => {
            newsArticleDiv.innerHTML = html;
        })
        .catch(error => {
            newsArticleDiv.innerHTML = `<section><h2>Keine Meldungen für dieses Datum</h2><p>${error.message}</p></section>`;
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


