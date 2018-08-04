export default function extend<T, U>(resolve , reject ) {
  return (err: U, data: T): Promise<U | T> => {
    if (err) {
      return reject(err);
    }
    return resolve(data);
  };
}
