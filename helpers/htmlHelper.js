function prepareHtmlEvent(heading, event) {
    if (!event) {
        console.error('No event provided to prepareHtmlEvent');
        return '';
    }

    const fields = [
        { label: 'Name', value: event.name },
        { label: 'Description', value: event.description },
        { label: 'Location', value: event.location },
        { label: 'Start Date', value: event.date_start },
        { label: 'End Date', value: event.date_end },
        { label: 'Capacity', value: event.capacity },
        { label: 'Reminder', value: event.reminder },
        { label: 'Max Additional Guests', value: event.max_additional_guests }
    ];

    const listItems = fields.map(
        field => `<li><strong>${field.label}:</strong> ${field.value ?? 'N/A'}</li>`
    ).join('');

    return `
        <p>${heading ?? 'INFORMATION:'}</p>
        <ul>
            ${listItems}
        </ul>
    `;
}

module.exports = { prepareHtmlEvent };