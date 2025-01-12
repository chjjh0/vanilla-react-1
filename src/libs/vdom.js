// src/libs/vdom.js

// Virtual DOM 요소 생성 함수
export function createVirtualElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

// 텍스트 요소 생성 함수
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

// Virtual DOM을 실제 DOM으로 변환하여 렌더링
export function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  // 속성 적용
  Object.keys(element.props)
    .filter((key) => key !== "children")
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  // 자식 요소 렌더링
  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

// Virtual DOM 트리 비교 및 변경사항 업데이트
export function diff(oldNode, newNode) {
  // 기본 비교: 타입이 다르면 새 노드로 교체
  if (oldNode.type !== newNode.type) {
    return { type: "REPLACE", newNode };
  }

  // 텍스트 노드 비교
  if (oldNode.type === "TEXT_ELEMENT") {
    if (oldNode.props.nodeValue !== newNode.props.nodeValue) {
      return { type: "TEXT", value: newNode.props.nodeValue };
    }
  }

  // 속성 비교
  const propsDiff = {};
  const allProps = { ...oldNode.props, ...newNode.props };
  Object.keys(allProps).forEach((key) => {
    if (oldNode.props[key] !== newNode.props[key]) {
      propsDiff[key] = newNode.props[key];
    }
  });

  // 자식 비교 (재귀)
  const childDiffs = [];
  const maxLength = Math.max(
    oldNode.props.children.length,
    newNode.props.children.length
  );
  for (let i = 0; i < maxLength; i++) {
    childDiffs.push(diff(oldNode.props.children[i], newNode.props.children[i]));
  }

  return { type: "UPDATE", props: propsDiff, children: childDiffs };
}
