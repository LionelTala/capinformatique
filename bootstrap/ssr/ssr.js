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
		"./Pages/Admin/Activites/Create.tsx": () => import("./assets/Create-CKGWzYZX.js"),
		"./Pages/Admin/Activites/Edit.tsx": () => import("./assets/Edit-CXwI3g9m.js"),
		"./Pages/Admin/Activites/Index.tsx": () => import("./assets/Index-BLkyFCZC.js"),
		"./Pages/Admin/Bibliotheque/Create.tsx": () => import("./assets/Create-Dj5qAfsx.js"),
		"./Pages/Admin/Bibliotheque/Edit.tsx": () => import("./assets/Edit-C5J7k8Rb.js"),
		"./Pages/Admin/Bibliotheque/Index.tsx": () => import("./assets/Index-CWHb8i0b.js"),
		"./Pages/Admin/Candidatures/Index.tsx": () => import("./assets/Index-ttFd9xyj.js"),
		"./Pages/Admin/Candidatures/Show.tsx": () => import("./assets/Show-DUhu1sqS.js"),
		"./Pages/Admin/Certifications/Create.tsx": () => import("./assets/Create-DMrLtgIA.js"),
		"./Pages/Admin/Certifications/Edit.tsx": () => import("./assets/Edit-C8OWAOFv.js"),
		"./Pages/Admin/Certifications/Index.tsx": () => import("./assets/Index-B9f9dwgH.js"),
		"./Pages/Admin/Cours/Create.tsx": () => import("./assets/Create-BQ8YHmLa.js"),
		"./Pages/Admin/Cours/Edit.tsx": () => import("./assets/Edit-CeAruotO.js"),
		"./Pages/Admin/Cours/Index.tsx": () => import("./assets/Index-BhhpJfMh.js"),
		"./Pages/Admin/Cours/Show.tsx": () => import("./assets/Show-CAgp9Kli.js"),
		"./Pages/Admin/Dashboard.tsx": () => import("./assets/Dashboard-C6ZJuNRq.js"),
		"./Pages/Admin/Devoirs/Create.tsx": () => import("./assets/Create-BhL0U0hI.js"),
		"./Pages/Admin/Devoirs/Edit.tsx": () => import("./assets/Edit-eeqNUv9f.js"),
		"./Pages/Admin/Devoirs/Index.tsx": () => import("./assets/Index-Cb_wAzB4.js"),
		"./Pages/Admin/Devoirs/Show.tsx": () => import("./assets/Show-DcCM2BYu.js"),
		"./Pages/Admin/Evaluations/Create.tsx": () => import("./assets/Create-yNiUu_8d.js"),
		"./Pages/Admin/Evaluations/Edit.tsx": () => import("./assets/Edit-6_STe1QN.js"),
		"./Pages/Admin/Evaluations/Index.tsx": () => import("./assets/Index-JBt8ib0f.js"),
		"./Pages/Admin/Evaluations/Show.tsx": () => import("./assets/Show-3i3GdSTp.js"),
		"./Pages/Admin/Formations/Create.tsx": () => import("./assets/Create-Cu80I5wr.js"),
		"./Pages/Admin/Formations/Edit.tsx": () => import("./assets/Edit-Dbl7KbAa.js"),
		"./Pages/Admin/Formations/Index.tsx": () => import("./assets/Index-DIKmMVfV.js"),
		"./Pages/Admin/Galerie/Create.tsx": () => import("./assets/Create-C7lxpR12.js"),
		"./Pages/Admin/Galerie/Edit.tsx": () => import("./assets/Edit-CY_4sHIU.js"),
		"./Pages/Admin/Galerie/Index.tsx": () => import("./assets/Index-C9Pvx2II.js"),
		"./Pages/Admin/HeroSlides/Create.tsx": () => import("./assets/Create-BlY_Ks8U.js"),
		"./Pages/Admin/HeroSlides/Edit.tsx": () => import("./assets/Edit-BjKUpJ8O.js"),
		"./Pages/Admin/HeroSlides/Index.tsx": () => import("./assets/Index-B7AAorYQ.js"),
		"./Pages/Admin/Paiements/Create.tsx": () => import("./assets/Create-CkwiOn4F.js"),
		"./Pages/Admin/Paiements/Edit.tsx": () => import("./assets/Edit-ByRlPbh8.js"),
		"./Pages/Admin/Paiements/Index.tsx": () => import("./assets/Index-BXeLKeP4.js"),
		"./Pages/Admin/PreInscriptions/Index.tsx": () => import("./assets/Index-DscQUyNc2.js"),
		"./Pages/Admin/Students/Edit.tsx": () => import("./assets/Edit-CYC89fFt.js"),
		"./Pages/Admin/Students/Index.tsx": () => import("./assets/Index-D6Zkuty-.js"),
		"./Pages/Admin/Students/Show.tsx": () => import("./assets/Show-C7YtEnNi.js"),
		"./Pages/Admin/Tranches/Create.tsx": () => import("./assets/Create-c7kQln9L.js"),
		"./Pages/Admin/Tranches/Edit.tsx": () => import("./assets/Edit-Np9MPEdO.js"),
		"./Pages/Admin/Tranches/Index.tsx": () => import("./assets/Index-D1UrW_hF.js"),
		"./Pages/Admin/Users/Create.tsx": () => import("./assets/Create-BHNErOrI.js"),
		"./Pages/Admin/Users/Edit.tsx": () => import("./assets/Edit-BWhIvpz9.js"),
		"./Pages/Admin/Users/Index.tsx": () => import("./assets/Index-B3RuSk6O.js"),
		"./Pages/Admin/Vagues/Create.tsx": () => import("./assets/Create-csW2y2XH2.js"),
		"./Pages/Admin/Vagues/Edit.tsx": () => import("./assets/Edit-Dlv3PSwj2.js"),
		"./Pages/Admin/Vagues/Index.tsx": () => import("./assets/Index-krlOL-AE2.js"),
		"./Pages/Admin/VisitStats.tsx": () => import("./assets/VisitStats-CWbRxMRu.js"),
		"./Pages/Auth/Login.tsx": () => import("./assets/Login-DUSsveQh.js"),
		"./Pages/Profile/Index.tsx": () => import("./assets/Index-BS58vE0E2.js"),
		"./Pages/Student/Cours/Index.tsx": () => import("./assets/Index-pXwNiq6o.js"),
		"./Pages/Student/Cours/Notifications.tsx": () => import("./assets/Notifications-Mxi6VuKD.js"),
		"./Pages/Student/Cours/Show.tsx": () => import("./assets/Show-aAHQg_Lu.js"),
		"./Pages/Student/Dashboard.tsx": () => import("./assets/Dashboard-DVv_WJ5J.js"),
		"./Pages/Student/Devoirs/Index.tsx": () => import("./assets/Index-D5qaMIwR.js"),
		"./Pages/Student/Devoirs/Show.tsx": () => import("./assets/Show-CxQ7pzat.js"),
		"./Pages/Student/Evaluations/Index.tsx": () => import("./assets/Index-DW7tmzj2.js"),
		"./Pages/Student/Evaluations/Show.tsx": () => import("./assets/Show-BhiWOfyg.js"),
		"./Pages/public/Bibliotheque/Index.tsx": () => import("./assets/Index-CwTjxRU7.js"),
		"./Pages/public/Bibliotheque/Show.tsx": () => import("./assets/Show-NDOBrQxz.js"),
		"./Pages/public/Bibliotheque.tsx": () => import("./assets/Bibliotheque-D5lRvZnR.js"),
		"./Pages/public/CandidatureSuccess.tsx": () => import("./assets/CandidatureSuccess-DJ5GTeCf.js"),
		"./Pages/public/Certification.tsx": () => import("./assets/Certification-BZOQt7_t.js"),
		"./Pages/public/Components/Hero/Hero.tsx": () => import("./assets/Hero-CJNAbeY2.js"),
		"./Pages/public/Components/Hero/HeroIndicators.tsx": () => import("./assets/HeroIndicators-CBhQdsPY.js"),
		"./Pages/public/Components/Hero/HeroSlide.tsx": () => import("./assets/HeroSlide-CItYGKXM.js"),
		"./Pages/public/Components/Navigation.tsx": () => import("./assets/Navigation-DReaNRgM.js"),
		"./Pages/public/Formations.tsx": () => import("./assets/Formations-yrTjNdbT.js"),
		"./Pages/public/Galerie.tsx": () => import("./assets/Galerie-Cp7NBt3k.js"),
		"./Pages/public/Home.tsx": () => import("./assets/Home-DpORuT9J.js"),
		"./Pages/public/Preinscription.tsx": () => import("./assets/Preinscription-CgCgmjZ0.js"),
		"./Pages/welcome.tsx": () => import("./assets/welcome-DuzSnRog.js")
	})),
	setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
});
createServer(renderPage);
//#endregion
export { renderPage as default };

//# sourceMappingURL=ssr.js.map