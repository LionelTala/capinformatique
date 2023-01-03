import { t as StudentLayout } from "./StudentLayout-EefxiFTk.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { BookOpenIcon, CheckCircleIcon, ClockIcon, DocumentIcon, EyeIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Student/Cours/Index.tsx
function Index({ cours, stats }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Mes cours - Étudiant" }), /* @__PURE__ */ jsxs(StudentLayout, {
		title: "Mes cours",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-3 gap-4 mb-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-cab-blue",
						children: stats.total
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500",
						children: "Total cours"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-green-600",
						children: stats.viewed
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500",
						children: "Vus"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-yellow-600",
						children: stats.not_viewed
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500",
						children: "Non vus"
					})]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "space-y-4",
			children: cours.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100",
				children: [/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }), /* @__PURE__ */ jsx("p", {
					className: "text-gray-500 text-sm",
					children: "Aucun cours disponible pour le moment"
				})]
			}) : cours.map((c) => {
				var _c$formation;
				return /* @__PURE__ */ jsx(Link, {
					href: `/student/cours/${c.id}`,
					className: "block bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-lg font-semibold text-gray-900",
										children: c.titre
									}), c.viewed ? /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs",
										children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-3 h-3" }), "Vu"]
									}) : /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs",
										children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-3 h-3" }), "Non vu"]
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-500 mt-1",
									children: (_c$formation = c.formation) === null || _c$formation === void 0 ? void 0 : _c$formation.name
								}),
								c.description && /* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-600 mt-2 line-clamp-2",
									children: c.description
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4 mt-3",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-xs text-gray-400",
											children: c.created_at
										}),
										c.has_video && /* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1 text-xs text-red-500",
											children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-4 h-4" }), "Vidéo"]
										}),
										c.has_files && /* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1 text-xs text-blue-500",
											children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-4 h-4" }), "Fichiers"]
										}),
										c.viewed_at && /* @__PURE__ */ jsxs("span", {
											className: "text-xs text-gray-400",
											children: ["Vu le ", c.viewed_at]
										})
									]
								})
							]
						}), /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5 text-gray-400 shrink-0 mt-1" })]
					})
				}, c.id);
			})
		})]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-Bd06939P.js.map