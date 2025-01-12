import { h } from "@/libs/h";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";
import Counter from "@/pages/Counter";
import { render } from "@/libs/render";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/contact": () => <Contact />,
  "/counter": () => <Counter />,
};

// Link 컴포넌트 추가
export const Link = ({ href, children }) => {
  console.log("Link ~ children: ", href, typeof href);
  const handleClick = (event) => {
    event.preventDefault(); // 기본 링크 동작 방지
    window.history.pushState({}, "", href); // URL 변경
    // const route = getRoute(href); // 새로운 경로에 대한 컴포넌트 가져오기
    // console.log("handleClick ~ route: ", route(), typeof route);

    render(href, document.getElementById("app")); // 새로운 컴포넌트 렌더링
  };

  return h("a", { href, onClick: handleClick }, children);
};

export const getRoute = (path) => {
  return routes[path] || (() => <NotFound />);
};
