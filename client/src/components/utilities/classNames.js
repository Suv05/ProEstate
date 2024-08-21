/**
 * A utility function to conditionally join class names together.
 *
 * @param {...(string|object)} classes - Class names or objects with class names and boolean values.
 * @returns {string} - A string of class names joined together.
 */
export function classNames(...classes) {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === "string") {
        return cls;
      }
      if (typeof cls === "object") {
        return Object.entries(cls)
          .filter(([key, value]) => value)
          .map(([key]) => key)
          .join(" ");
      }
      return "";
    })
    .join(" ");
}
