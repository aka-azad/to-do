export function getItem(key: string): [] {
  return JSON.parse(localStorage.getItem(key)!);
}

export function setItem(key: string, payload: any): void {
  localStorage.setItem(key, JSON.stringify(payload));
}
// utility function that simplifies creation of new html node
type ElementType =
  | "div"
  | "li"
  | "img"
  | "i"
  | "button"
  | "input"
  | "label"
  | "p";

export function create({
  tag,
  appendTo,
  children = [],
  attributes = {},
  events = {},
}: {
  tag?: ElementType;
  appendTo?: Node;
  children?: Node[];
  attributes?: { [key: string]: string };
  events?: { [key: string]: any };
}) {
  const element = document.createElement(tag!);

  Object.entries(attributes).forEach(([key, value]) => {
    //@ts-ignore
    element[key] = value;
  });

  Object.entries(events).forEach(([key, value]) => {
    element.addEventListener(key, value);
  });

  if (appendTo) {
    appendTo.appendChild(element);
  }

  children.forEach((child) => element.appendChild(child));

  return element;
}

export function elIcon(value: string): Node {
  const icon = document.createElement("i");
  icon.setAttribute("data-feather", value);
  return icon;
}
