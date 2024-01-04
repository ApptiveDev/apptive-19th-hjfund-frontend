export function classes(...args) {
  return args.join(" ");
}

export function conditionalClass(condition, className) {
  return condition ? className : "";
}