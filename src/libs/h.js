/**
 * h 함수는 JSX 요소를 생성하는 함수입니다.
 * @param {string|function} type - 생성할 요소의 타입 (HTML 태그 이름 또는 함수형 컴포넌트)
 * @param {object} props - 요소에 적용할 속성, 이벤트(react의 컴포넌트 간 props와 다름)
 * @param {...any} children - 요소의 자식 요소들
 * @returns {Node} 생성된 DOM 요소
 */
export function h(type, props, ...children) {
  // console.log("h ~ type: ", type, typeof type, props, children);
  // Fragment 처리
  if (type === Fragment) {
    return createJSXElement(type, { children }); // Fragment에 children 전달
  }

  // 함수형 컴포넌트 처리
  if (typeof type === "function") {
    // console.log("h ~ type: 함수형처리 시작", children, type);
    const propsTemp = { ...props, children };
    return type(propsTemp); // 함수형 컴포넌트 호출(type에 createJSXElement 함수가 있어서 이를 호출)
  }

  return createJSXElement(type, { ...props, children }); // 일반 요소 처리
}

/**
 * createJSXElement 함수는 주어진 타입과 속성으로 DOM 요소를 생성합니다.
 * @param {string} type - 생성할 요소의 타입 (HTML 태그 이름)
 * @param {object} props - 요소에 적용할 속성
 * @returns {Node} 생성된 DOM 요소
 */
function createJSXElement(type, props) {
  // console.log("createJSXElement 시작 ", type, props);
  let element;

  if (type === Fragment) {
    element = Fragment(props);
  } else {
    element = document.createElement(type);
  }

  if (props) {
    // console.log("createJSXElement ~ props: ", props);
    Object.keys(props).forEach((key) => {
      if (key === "children") {
        // 자식 요소가 배열인 경우 평탄화
        const children = Array.isArray(props.children)
          ? props.children
          : [props.children];
        children.flat().forEach((child) => {
          if (typeof child === "string" || typeof child === "number") {
            // 자식 요소가 문자열 또는 숫자인 경우 텍스트 노드 추가
            element.appendChild(document.createTextNode(child));
          } else if (child instanceof Node) {
            // 자식 요소가 Node인 경우 추가
            element.appendChild(child);
          }
        });
      } else if (key.startsWith("on")) {
        // 이벤트 리스너 등록
        element.addEventListener(key.toLowerCase().slice(2), props[key]);
      } else {
        // 속성 설정
        element.setAttribute(key, props[key]);
      }
    });
  }

  return element;
}

/**
 * Fragment 컴포넌트는 여러 자식 요소를 그룹화하는 데 사용됩니다.
 * @param {object} props - 자식 요소들
 * @returns {DocumentFragment} 생성된 문서 조각
 */
export const Fragment = (props) => {
  const fragment = document.createDocumentFragment();
  const children = props ? props.children : [];

  if (children) {
    const childArray = Array.isArray(children) ? children : [children];
    childArray.forEach((child) => fragment.appendChild(child));
  }
  return fragment;
};
