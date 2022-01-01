module.exports = (data, page, limit) => {
  const start = (parseInt(page) - 1) * limit;
  const end = parseInt(page) * limit;

  const list = data.slice(start, end);

  const move = { next: null, prev: null };
  const info = {
    start,
    end: start + list.length,
    length: data.length,
  }

  if (end < data.length) move.next = parseInt(page) + 1;
  if (start > 0) move.prev = parseInt(page) - 1;

  return { list, move, info };
}
