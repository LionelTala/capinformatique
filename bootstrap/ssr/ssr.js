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
		"./Pages/Admin/Activites/Create.tsx": () => import("./assets/Create-cjxzOhBv.js"),
		"./Pages/Admin/Activites/Edit.tsx": () => import("./assets/Edit-RnrKIPo8.js"),
		"./Pages/Admin/Activites/Index.tsx": () => import("./assets/Index-DeJdvfO8.js"),
		"./Pages/Admin/Candidatures/Index.tsx": () => import("./assets/Index-D1IjPZ6w.js"),
		"./Pages/Admin/Candidatures/Show.tsx": () => import("./assets/Show-Xu3P8HaK.js"),
		"./Pages/Admin/Certifications/Create.tsx": () => import("./assets/Create-CN2IhjOq.js"),
		"./Pages/Admin/Certifications/Edit.tsx": () => import("./assets/Edit-CYIfEx5r.js"),
		"./Pages/Admin/Certifications/Index.tsx": () => import("./assets/Index-BzzYbLSk.js"),
		"./Pages/Admin/Cours/Create.tsx": () => import("./assets/Create-CYc-Gu5t.js"),
		"./Pages/Admin/Cours/Edit.tsx": () => import("./assets/Edit-OCswx-Iv.js"),
		"./Pages/Admin/Cours/Index.tsx": () => import("./assets/Index-C--bo9QN.js"),
		"./Pages/Admin/Cours/Show.tsx": () => import("./assets/Show-0xVY_kNr.js"),
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-xboiszgT.js"),
		"./Pages/Admin/Devoirs/Create.tsx": () => import("./assets/Create-C7vc41s8.js"),
		"./Pages/Admin/Devoirs/Edit.tsx": () => import("./assets/Edit-nTawyCM6.js"),
		"./Pages/Admin/Devoirs/Index.tsx": () => import("./assets/Index-XFIG7Wwh.js"),
		"./Pages/Admin/Devoirs/Show.tsx": () => import("./assets/Show-CSjrP9vS.js"),
		"./Pages/Admin/Evaluations/Create.tsx": () => import("./assets/Create-CXlUev9d.js"),
		"./Pages/Admin/Evaluations/Edit.tsx": () => import("./assets/Edit-B_heb_8Z.js"),
		"./Pages/Admin/Evaluations/Index.tsx": () => import("./assets/Index-Dn3mpoV-.js"),
		"./Pages/Admin/Evaluations/Show.tsx": () => import("./assets/Show-Cgad_M42.js"),
		"./Pages/Admin/Formations/Create.tsx": () => import("./assets/Create-BPf4x3WF.js"),
		"./Pages/Admin/Formations/Edit.tsx": () => import("./assets/Edit-q-XenrD_.js"),
		"./Pages/Admin/Formations/Index.tsx": () => import("./assets/Index-B5_n4oyR.js"),
		"./Pages/Admin/Galerie/Create.tsx": () => import("./assets/Create-B2LsaxCf.js"),
		"./Pages/Admin/Galerie/Edit.tsx": () => import("./assets/Edit-gjYsKel2.js"),
		"./Pages/Admin/Galerie/Index.tsx": () => import("./assets/Index-BurobO5_.js"),
		"./Pages/Admin/HeroSlides/Create.tsx": () => import("./assets/Create-CjkbaEBd.js"),
		"./Pages/Admin/HeroSlides/Edit.tsx": () => import("./assets/Edit-CwlIXyrh.js"),
		"./Pages/Admin/HeroSlides/Index.tsx": () => import("./assets/Index-gNiLHR-P.js"),
		"./Pages/Admin/Students/Edit.tsx": () => import("./assets/Edit-CzNAS36W.js"),
		"./Pages/Admin/Students/Index.tsx": () => import("./assets/Index-Rd68LizI.js"),
		"./Pages/Admin/Students/Show.tsx": () => import("./assets/Show-BI5qXBgq.js"),
		"./Pages/Admin/Users/Create.tsx": () => import("./assets/Create-3iaFwGYm.js"),
		"./Pages/Admin/Users/Edit.tsx": () => import("./assets/Edit-IzoLw5q2.js"),
		"./Pages/Admin/Users/Index.tsx": () => import("./assets/Index-Bdi7OHYb.js"),
		"./Pages/Admin/Vagues/Create.tsx": () => import("./assets/Create-BPmlNN87.js"),
		"./Pages/Admin/Vagues/Edit.tsx": () => import("./assets/Edit-O2FP5kH8.js"),
		"./Pages/Admin/Vagues/Index.tsx": () => import("./assets/Index-CT7dTVy-.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-DUSsveQh.js"),
		"./Pages/Profile/Index.tsx": () => import("./assets/Index-BdWIt5CA2.js"),
		"./Pages/Student/Cours/Index.tsx": () => import("./assets/Index-DgwG1brk.js"),
		"./Pages/Student/Cours/Notifications.tsx": () => import("./assets/Notifications-CaSaodXK.js"),
		"./Pages/Student/Cours/Show.tsx": () => import("./assets/Show-Cprcly7r.js"),
		"./Pages/Student/Dashboard.tsx": () => import("./assets/Dashboard-BxMDN6l9.js"),
		"./Pages/Student/Devoirs/Index.tsx": () => import("./assets/Index-BRKbOta2.js"),
		"./Pages/Student/Devoirs/Show.tsx": () => import("./assets/Show-WjZs_6mI.js"),
		"./Pages/Student/Evaluations/Index.tsx": () => import("./assets/Index-BKm-siv9.js"),
		"./Pages/Student/Evaluations/Show.tsx": () => import("./assets/Show-ozZ5W-Ph.js"),
		"./Pages/public/CandidatureSuccess.tsx": () => import("./assets/CandidatureSuccess-Bu_qNhUn.js"),
		"./Pages/public/Certification.tsx": () => import("./assets/Certification-CjOO4-Hv.js"),
		"./Pages/public/Components/Hero/Hero.tsx": () => import("./assets/Hero-CJNAbeY2.js"),
		"./Pages/public/Components/Hero/HeroIndicators.tsx": () => import("./assets/HeroIndicators-CBhQdsPY.js"),
		"./Pages/public/Components/Hero/HeroSlide.tsx": () => import("./assets/HeroSlide-CItYGKXM.js"),
		"./Pages/public/Components/Navigation.tsx": () => import("./assets/Navigation-DReaNRgM.js"),
		"./Pages/public/Formations.tsx": () => import("./assets/Formations-C_iBaLjt.js"),
		"./Pages/public/Galerie.tsx": () => import("./assets/Galerie-BDLCD9ja.js"),
		"./Pages/public/Home.tsx": () => import("./assets/Home-B9DLt-eQ.js"),
		"./Pages/public/Preinscription.tsx": () => import("./assets/Preinscription-BDVnlSG_.js"),
		"./Pages/welcome.tsx": () => import("./assets/welcome-DuzSnRog.js")
	})),
	setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
});
createServer(renderPage);
//#endregion
export { renderPage as default };

//# sourceMappingURL=ssr.js.map