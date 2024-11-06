let events = []; 
let sortOrder = 'asc';

async function loadEvents() {
    try {
        const response = await fetch('events.json');
        if (!response.ok) throw new Error("Не вдалось завантажити дані.");
        events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error(error.message);
        document.getElementById('events-table').querySelector('tbody').innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
    }
}

function displayEvents(eventList) {
    const tbody = document.getElementById('events-table').querySelector('tbody');
    tbody.innerHTML = '';
    const now = new Date();

    eventList.forEach(event => {
        const eventDate = new Date(event.date);
        const row = document.createElement('tr');
        row.classList.add(event.type);

        if (eventDate < now) row.classList.add('past-event');

        row.innerHTML = `
            <td>${event.date}</td>
            <td>${event.title}</td>
            <td>${event.time}</td>
            <td>${event.location.city}</td>
            <td>${event.type}</td>
        `;
        row.addEventListener('click', () => openModal(event));
        tbody.appendChild(row);
    });
}

document.getElementById('search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(query) || event.location.city.toLowerCase().includes(query)
    );
    displayEvents(filteredEvents);
});
function sortEvents(by) {
    events.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    displayEvents(events);
}

function openModal(event) {
    const modalInfo = document.getElementById('modal-info');
    modalInfo.innerHTML = `
        <h2>${event.title}</h2>
        <p><strong>Дата:</strong> ${event.date}</p>
        <p><strong>Час:</strong> ${event.time}</p>
        <p><strong>Місце:</strong> ${event.location.venue}, ${event.location.city}</p>
        <p><strong>Тип:</strong> ${event.type}</p>
    `;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal')) {
        closeModal();
    }
});

loadEvents();
