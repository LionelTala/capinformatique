import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import { jsx } from "react/jsx-runtime";
//#region node_modules/laravel-vite-plugin/inertia-helpers/index.js
async function resolvePageComponent(path, pages) {
	for (const p of Array.isArray(path) ? path : [path]) {
		const page = pages[p];
		if (typeof page === "undefined") continue;
		return typeof page === "function" ? page() : page;
	}
	throw new Error(`Page not found: ${path}`);
}
//#endregion
//#region resources/js/ssr.tsx
var renderPage = (page) => createInertiaApp({
	page,
	render: ReactDOMServer.renderToString,
	resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, /* #__PURE__ */ Object.assign({
		"./Pages/Home.tsx": () => import("./assets/Home-C4jcrplr.js"),
		"./Pages/public/Components/Navigation.tsx": () => import("./assets/Navigation-BNbKp5ep.js"),
		"./Pages/public/Home.tsx": () => import("./assets/Home-la_KkjCS.js"),
		"./Pages/welcome.tsx": () => import("./assets/welcome-DuzSnRog.js")
	})),
	setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
});
createServer(renderPage);
//#endregion
export { renderPage as default };

//# sourceMappingURL=ssr.js.map