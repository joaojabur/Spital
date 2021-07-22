export function removeDuplicates(data) {
  const uniqueValues = Array.from(
    data.reduce((map, obj) => map.set(obj.id, obj), new Map()).values()
  );

  return uniqueValues;
}
