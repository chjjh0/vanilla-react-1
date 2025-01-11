import { h } from "@/libs/h";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/contact": () => <Contact />,
};

export const getRoute = (path) => {
  return routes[path] || (() => <NotFound />);
};
