export function generateId(): string {
  let len: number = 6;
  let id: string = '';
  const str: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789';

  for (let i = 0; i <= len; i++) {
    id += str[Math.floor(Math.random() * str.length)];
  }
  return id;
}
