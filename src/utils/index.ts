export function arrayMove<T>(array: T[], from: number, to: number): T[] {
  // Move an array item to a different position. Returns a new array with the item moved to the new position.
  const newArray = array.slice();
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0] as T
  );

  return newArray;
}

export function truncateText(text: string, length: number): string {
  // Truncate text to a certain length. Returns the truncated text.
  if (text.length <= length) {
    return text;
  }

  return `${text.substring(0, length)}...`;
}

export function toTitleCase(text: string): string {
  // Convert text to title case. Returns the converted text.
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
}
