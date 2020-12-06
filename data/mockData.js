export default [
  [
    [
      {
        id: '234-789',
        title: 'foo',
        description: 'lorem ipsum',
        completed: false,
        priority: 1, // Could be 1, 2, 3 (high, medium, low)
        dateCreated: new Date('01-03-2019'),
        dateCompleted: new Date('01-03-2020'),
      },
      {
        id: '321-654',
        title: 'bar',
        description: 'blah blah',
        completed: true,
        priority: 3,
        dateCreated: new Date('01-03-2019'),
      },
    ],
    [
      {
        id: '123-456',
        title: 'baz',
        description: 'some task for the second day',
        completed: false,
        priority: 2,
        dateCreated: new Date('01-05-2019'),
      },
    ],
    [],
    [],
    [
      {
        id: '133-456',
        title: 'buy wine',
        description: 'because its fridaaay',
        completed: false,
        priority: 2,
        dateCreated: new Date('01-05-2019'),
      },
    ],
    [],
    [],
  ],
  [
    [],
    [],
    [
      {
        id: '345-987',
        title: 'high priority task',
        description: 'another task',
        completed: false,
        priority: 2,
        dateCreated: new Date('05-03-2017'),
      },
      {
        id: '345-987',
        title: 'low priority task',
        description: 'another task',
        completed: false,
        priority: 0,
        dateCreated: new Date('05-03-2017'),
      },
    ],
    [
      {
        id: '345-567',
        title: 'archived task',
        description: 'archive - last week, fourth day',
        completed: false,
        priority: 1,
        dateCreated: new Date('05-03-2019'),
      },
    ],
    [],
    [],
    [],
  ],
];

export const current = [
  [
    {
      id: '234-789',
      title: 'foo',
      description: 'lorem ipsum',
      completed: false,
      priority: 1, // Could be 1, 2, 3 (high, medium, low)
      dateCreated: new Date('01-03-2019'),
      dateCompleted: new Date('01-03-2020'),
    },
    {
      id: '321-654',
      title: 'bar',
      description: 'blah blah',
      completed: true,
      priority: 3,
      dateCreated: new Date('01-03-2019'),
    },
  ],
  [
    {
      id: '123-456',
      title: 'baz',
      description: 'some task for the second day',
      completed: false,
      priority: 2,
      dateCreated: new Date('01-05-2019'),
    },
  ],
  [],
  [],
  [
    {
      id: '133-456',
      title: 'buy wine',
      description: 'because its fridaaay',
      completed: false,
      priority: 2,
      dateCreated: new Date('01-05-2019'),
    },
  ],
  [],
  [],
];

/**
 * Organised into priorities as follows:
 * [[ low ], [ medium ], [ high ]]
 */
export const archive = [
  [
    {
      id: '345-987',
      title: 'low priority task',
      description: 'another task',
      completed: false,
      priority: 0,
      dateCreated: new Date('05-03-2017'),
    },
    {
      id: '345-111',
      title: 'another low',
      description: 'another task',
      completed: false,
      priority: 0,
      dateCreated: new Date('05-03-2017'),
    },
  ],
  [
    {
      id: '345-567',
      title: 'archived task',
      description: 'archive - last week, fourth day',
      completed: false,
      priority: 1,
      dateCreated: new Date('05-03-2019'),
    },
  ],
  [
    {
      id: '345-222',
      title: 'high priority task',
      description: 'another task',
      completed: false,
      priority: 2,
      dateCreated: new Date('05-03-2017'),
    },
  ],
];