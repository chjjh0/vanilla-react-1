import { h } from "@/libs/h";
import Header from "@/components/header";
import { getRoute } from "@/router/router";

export const render = (path, container) => {
  const routeHandler = getRoute(path);
  const htmlContent = routeHandler();
  console.log("render ~ container: ", path, container);
  container.innerHTML = "";
  container.appendChild(<Header />); // 컨테이너의 맨 앞에 헤더 추가
  container.appendChild(htmlContent);
};
