import { getRoute } from "@/router/router";

export const render = (path, container) => {
  const routeHandler = getRoute(path);
  const htmlContent = routeHandler();
  container.replaceChildren(htmlContent);
};
