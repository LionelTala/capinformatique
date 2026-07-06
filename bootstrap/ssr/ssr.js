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
		"./Pages/Admin/Candidatures/Index.tsx": () => import("./assets/Index-D4xxhXWv.js"),
		"./Pages/Admin/Candidatures/Show.tsx": () => import("./assets/Show-CPCggCBH.js"),
		"./Pages/Admin/Certifications/Create.tsx": () => import("./assets/Create-B2Zi69w6.js"),
		"./Pages/Admin/Certifications/Edit.tsx": () => import("./assets/Edit-BS3O9jBG.js"),
		"./Pages/Admin/Certifications/Index.tsx": () => import("./assets/Index-C-_-EH_X.js"),
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-DnAPGT9R.js"),
		"./Pages/Admin/Formations/Create.tsx": () => import("./assets/Create-BO3jnT7D.js"),
		"./Pages/Admin/Formations/Edit.tsx": () => import("./assets/Edit-DnSuZOzh.js"),
		"./Pages/Admin/Formations/Index.tsx": () => import("./assets/Index-Mtrnk5wo.js"),
		"./Pages/Admin/HeroSlides/Create.tsx": () => import("./assets/Create-Oo6GAeuH.js"),
		"./Pages/Admin/HeroSlides/Edit.tsx": () => import("./assets/Edit-BnJzJNAT.js"),
		"./Pages/Admin/HeroSlides/Index.tsx": () => import("./assets/Index-C4W8MYq7.js"),
		"./Pages/Admin/Users/Create.tsx": () => import("./assets/Create-iOUSZIhr.js"),
		"./Pages/Admin/Users/Index.tsx": () => import("./assets/Index-BVL3EIB9.js"),
		"./Pages/Admin/Vagues/Create.tsx": () => import("./assets/Create-4UwfUIro.js"),
		"./Pages/Admin/Vagues/Edit.tsx": () => import("./assets/Edit-5dVojUdL.js"),
		"./Pages/Admin/Vagues/Index.tsx": () => import("./assets/Index-kfbbJtyo.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-CrW-jf2U.js"),
		"./Pages/public/CandidatureSuccess.tsx": () => import("./assets/CandidatureSuccess-CEQT1ak1.js"),
		"./Pages/public/Certification.tsx": () => import("./assets/Certification-BCpELvNo.js"),
		"./Pages/public/Components/Hero/Hero.tsx": () => import("./assets/Hero-CJNAbeY2.js"),
		"./Pages/public/Components/Hero/HeroIndicators.tsx": () => import("./assets/HeroIndicators-CBhQdsPY.js"),
		"./Pages/public/Components/Hero/HeroSlide.tsx": () => import("./assets/HeroSlide-CItYGKXM.js"),
		"./Pages/public/Components/Navigation.tsx": () => import("./assets/Navigation-_dFdXFsy.js"),
		"./Pages/public/Formations.tsx": () => import("./assets/Formations-DbwImjo2.js"),
		"./Pages/public/Home.tsx": () => import("./assets/Home-CwcjfC7S.js"),
		"./Pages/public/Preinscription.tsx": () => import("./assets/Preinscription-B4p7ohBZ.js"),
		"./Pages/welcome.tsx": () => import("./assets/welcome-DuzSnRog.js")
	})),
	setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
});
createServer(renderPage);
//#endregion
export { renderPage as default };

//# sourceMappingURL=ssr.js.map