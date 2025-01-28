function prepareHtmlEvent(heading, event) {
    return `
        <p>${ heading }</p>
        <ul>
            <li><strong>Name:</strong> ${ event.name ?? 'N/A' }</li>
            <li><strong>Description:</strong> ${ event.description ?? 'N/A' }</li>
            <li><strong>Location:</strong> ${ event.location ?? 'N/A' }</li>
            <li><strong>Start Date:</strong> ${ event.date_start ?? 'N/A' }</li>
            <li><strong>End Date:</strong> ${ event.date_end ?? 'N/A' }</li>
            <li><strong>Capacity:</strong> ${ event.capacity ?? 'N/A' }</li>
            <li><strong>Reminder:</strong> ${ event.reminder ?? 'N/A' }</li>
            <li><strong>Max Additional Guests:</strong> ${ event.max_additional_guests ?? 'N/A' }</li>
        </ul>
    `;
}

module.exports = { prepareHtmlEvent };