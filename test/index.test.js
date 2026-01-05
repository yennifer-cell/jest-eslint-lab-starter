const { capitalizeWords, filterActiveUsers, logAction } = require('../index')

test('capitalizeWords handles normal input', () => {
  expect(capitalizeWords('hello world')).toBe('Hello World');
});

test('capitalizeWords handles empty string', () => {
  expect(capitalizeWords('')).toBe('');
});

test('capitalizeWords handles special characters', () => {
  expect(capitalizeWords('hello-world')).toBe('Hello-World');
});

test('capitalizeWords handles single word', () => {
  expect(capitalizeWords('hello')).toBe('Hello');
});

test('filterActiveUsers filters active users correctly', () => {
  const users = [
    { name: 'Alice', isActive: true },
    { name: 'Bob', isActive: false },
    { name: 'Charlie', isActive: true }
  ];
  expect(filterActiveUsers(users)).toEqual([
    { name: 'Alice', isActive: true },
    { name: 'Charlie', isActive: true }
  ]);
});

test('filterActiveUsers handles all inactive users', () => {
  const users = [
    { name: 'Bob', isActive: false },
    { name: 'Dave', isActive: false }
  ];
  expect(filterActiveUsers(users)).toEqual([]);
});

test('filterActiveUsers handles empty array', () => {
  expect(filterActiveUsers([])).toEqual([]);
});

test('logAction generates correct log string', () => {
  const result = logAction('login', 'Alice');
  expect(result).toContain('User Alice performed login at');
  expect(result).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
});

test('logAction handles missing action', () => {
  const result = logAction('', 'Alice');
  expect(result).toContain('User Alice performed  at');
});

test('logAction handles missing username', () => {
  const result = logAction('login', '');
  expect(result).toContain('User  performed login at');
});

test('logAction handles both empty strings', () => {
  const result = logAction('', '');
  expect(result).toContain('User  performed  at');
});

