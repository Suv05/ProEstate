export const fetchApi = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Unable to connect to the server");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
