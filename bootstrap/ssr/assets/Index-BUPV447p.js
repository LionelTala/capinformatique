import { t as StudentLayout } from "./StudentLayout-EefxiFTk.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { CalendarIcon, ChartBarIcon, CheckCircleIcon, ClockIcon, DocumentIcon, XCircleIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Student/Evaluations/Index.tsx
function Index({ evaluations, stats }) {
	const getStatutBadge = (evaluation) => {
		if (evaluation.soumis) {
			if (evaluation.soumission_statut === "corrige") return /* @__PURE__ */ jsxs("span", {
				className: "px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1",
				children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-3 h-3" }), "Corrigé"]
			});
			return /* @__PURE__ */ jsxs("span", {
				className: "px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1",
				children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-3 h-3" }), "Soumis"]
			});
		}
		if (evaluation.est_depasse) return /* @__PURE__ */ jsxs("span", {
			className: "px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(XCircleIcon, { className: "w-3 h-3" }), "Dépassé"]
		});
		return /* @__PURE__ */ jsxs("span", {
			className: "px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(ClockIcon, { className: "w-3 h-3" }), "En attente"]
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Mes évaluations - Étudiant" }), /* @__PURE__ */ jsxs(StudentLayout, {
		title: "Mes évaluations",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-cab-blue",
						children: stats.total
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500",
						children: "Total"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-yellow-500",
						children: stats.en_attente
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500",
						children: "En attente"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-blue-500",
						children: stats.soumis
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500",
						children: "Soumis"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-green-500",
						children: stats.corriges
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500",
						children: "Corrigés"
					})]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "space-y-4",
			children: evaluations.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100",
				children: [/* @__PURE__ */ jsx(ChartBarIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }), /* @__PURE__ */ jsx("p", {
					className: "text-gray-500 text-sm",
					children: "Aucune évaluation pour le moment"
				})]
			}) : evaluations.map((e) => {
				var _e$formation;
				return /* @__PURE__ */ jsx(Link, {
					href: `/student/evaluations/${e.id}`,
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
										children: e.titre
									}), getStatutBadge(e)]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-500 mt-1",
									children: (_e$formation = e.formation) === null || _e$formation === void 0 ? void 0 : _e$formation.name
								}),
								e.description && /* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-600 mt-2 line-clamp-2",
									children: e.description
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4 mt-3",
									children: [
										e.date && /* @__PURE__ */ jsxs("span", {
											className: `text-xs flex items-center gap-1 ${e.est_depasse ? "text-red-500" : "text-gray-400"}`,
											children: [/* @__PURE__ */ jsx(CalendarIcon, { className: "w-3 h-3" }), e.est_depasse ? "Dépassé" : `${e.jours_restants}j restants`]
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "text-xs text-gray-400 flex items-center gap-1",
											children: ["Coeff. ", e.coefficient]
										}),
										e.has_files && /* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1 text-xs text-blue-500",
											children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-3 h-3" }), "Fichiers"]
										}),
										e.soumis && e.note !== null && /* @__PURE__ */ jsxs("span", {
											className: "text-xs font-semibold text-green-600",
											children: [
												"Note : ",
												e.note,
												"/20"
											]
										})
									]
								})
							]
						}), /* @__PURE__ */ jsx(ChartBarIcon, { className: "w-5 h-5 text-gray-400 shrink-0 mt-1" })]
					})
				}, e.id);
			})
		})]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-BUPV447p.js.map