const isDev = process.env.NODE_ENV === 'development';

export default async (args) => {
  try {
    const token = localStorage.getItem('token');
    const url = isDev ? `http://localhost:8000/api/loans?q=${args}` : `/api/loans${args}`;

    const request = await (await fetch(url, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })).json();

    if (!request.success) throw request;
    return request.data;
  }
  catch (error0) {
    console.error(error0.message);
    return false;
  }
}
