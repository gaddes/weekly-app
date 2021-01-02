import flatten from 'lodash/flatten';

/**
 * Order tasks by priority high > medium > low
 *
 * @param {Array} tasks - unordered tasks
 * @returns {Array} - tasks ordered by priority
 */
export default function prioritise (tasks) {
  // Because default task.priority goes from 0 (low) to 2 (high),
  //  we must reverse the order i.e. we want 0 (high) to 2 (low).
  const priorityOrder = [2, 1, 0];

  // [high, medium, low]
  const prioritisedTasks = [[], [], []];

  tasks.forEach(task => {
    const idx = priorityOrder[task.priority];
    prioritisedTasks[idx].push(task);
  });

  // Flatten into single array before returning
  return flatten(prioritisedTasks);
}