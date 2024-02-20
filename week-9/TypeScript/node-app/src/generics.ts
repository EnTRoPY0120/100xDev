function firstElement<T>(arr: T[]): T {
  // return type can also be inferred
  return arr[0];
}

const valueEl = firstElement<string>(["vijay", "hakirat", "vishal"]); // string is optional
valueEl.toUpperCase();
