const prisma = require('./prisma');

async function main() {
  console.log('Start seeding...');

  const events = [
    {
      name: 'Tech Conference 2024',
      description: 'A conference about the latest in tech innovations.',
      date_start: new Date('2024-05-15T09:00:00Z'),
      date_end: new Date('2024-05-15T17:00:00Z'),
      location: 'San Francisco, CA',
      capacity: 500,
      reminder: 30,
      max_additional_guests: 5,
    },
    {
      name: 'Art Expo',
      description: 'An exhibition of modern and contemporary art.',
      date_start: new Date('2024-06-20T10:00:00Z'),
      date_end: new Date('2024-06-20T18:00:00Z'),
      location: 'New York, NY',
      capacity: 300,
      reminder: 15,
      max_additional_guests: 2,
    },
    {
      name: 'Music Festival',
      description: 'A weekend of live music performances.',
      date_start: new Date('2024-07-10T16:00:00Z'),
      date_end: new Date('2024-07-12T23:00:00Z'),
      location: 'Austin, TX',
      capacity: 1000,
      reminder: 60,
      max_additional_guests: 10,
    },
    {
      name: 'Startup Pitch Day',
      description: 'Pitch your startup ideas to top investors.',
      date_start: new Date('2024-03-01T10:00:00Z'),
      date_end: new Date('2024-03-01T14:00:00Z'),
      location: 'Palo Alto, CA',
      capacity: 100,
      reminder: 20,
      max_additional_guests: 0,
    },
    {
      name: 'Health & Wellness Workshop',
      description: 'Learn about maintaining a healthy lifestyle.',
      date_start: new Date('2024-04-25T09:00:00Z'),
      date_end: new Date('2024-04-25T12:00:00Z'),
      location: 'Miami, FL',
      capacity: 150,
      reminder: 10,
      max_additional_guests: 3,
    },
  ];

  for (const event of events) {
    await prisma.event.create({
      data: event,
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });