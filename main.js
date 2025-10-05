(function () {
    const calendar = document.getElementById('calendar');

    const now = new Date();
    let selectedDate = null;
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();

    function renderCalendar(year, month) {
        calendar.innerHTML = '';


        // Header mit Monat und Jahr
         const title = document.createElement('div');
        title.className = "calendar-title";
        title.textContent = monthNames[month] + ' ' + year;
        calendar.appendChild(title);
        const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
            "Juli", "August", "September", "Oktober", "November", "Dezember"];
        header.textContent = monthNames[month] + ' ' + year;
        calendar.appendChild(header);

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
            // Hier kannst du eine Aktion auslösen, z.B. Tag merken oder anzeigen
            console.log(`Ausgewählter Tag: ${day}.${currentMonth + 1}.${currentYear}`);
        });
        return cell;
    }

    renderCalendar(currentYear, currentMonth);
})();
