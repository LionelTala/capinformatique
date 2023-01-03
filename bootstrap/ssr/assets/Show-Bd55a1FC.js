import { t as StudentLayout } from "./StudentLayout-EefxiFTk.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon, CheckCircleIcon, DocumentIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Student/Cours/Show.tsx
function Show({ cours }) {
	var _cours$formation;
	const [loading, setLoading] = useState(false);
	const handleMarkAsViewed = () => {
		setLoading(true);
		router.post(`/student/cours/${cours.id}/view`, {}, {
			preserveScroll: true,
			onSuccess: () => {
				setLoading(false);
				router.reload();
			},
			onError: () => {
				setLoading(false);
			}
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${cours.titre} - Détails du cours` }), /* @__PURE__ */ jsx(StudentLayout, {
		title: cours.titre,
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: "/student/cours",
					className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à mes cours"]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
							className: "text-2xl font-bold text-gray-900",
							children: cours.titre
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-500 mt-1",
							children: (_cours$formation = cours.formation) === null || _cours$formation === void 0 ? void 0 : _cours$formation.name
						})] }), cours.viewed ? /* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium",
							children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-5 h-5" }), "Vu"]
						}) : /* @__PURE__ */ jsxs("button", {
							onClick: handleMarkAsViewed,
							disabled: loading,
							className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
							children: [loading ? "⏳" : "👁️", "Marquer comme vu"]
						})]
					}), cours.viewed_at && /* @__PURE__ */ jsxs("p", {
						className: "text-xs text-gray-400 mt-2",
						children: ["Vu le ", cours.viewed_at]
					})]
				}),
				cours.description && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold text-gray-700 mb-2",
						children: "📝 Description"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-gray-600 leading-relaxed",
						children: cours.description
					})]
				}),
				cours.video_url && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-5 h-5 text-red-500" }), cours.video_title || "Vidéo"]
					}), /* @__PURE__ */ jsx("div", {
						className: "relative aspect-video rounded-xl overflow-hidden bg-gray-900",
						children: cours.video_embed_url ? /* @__PURE__ */ jsx("iframe", {
							src: cours.video_embed_url,
							className: "w-full h-full",
							allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
							allowFullScreen: true
						}) : /* @__PURE__ */ jsx("div", {
							className: "w-full h-full flex items-center justify-center",
							children: /* @__PURE__ */ jsx("a", {
								href: cours.video_url,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-white hover:text-blue-400 transition-colors",
								children: "▶️ Voir la vidéo"
							})
						})
					})]
				}),
				cours.contenu && cours.contenu.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500" }), "Fichiers joints"]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
						children: cours.contenu.map((file, index) => /* @__PURE__ */ jsxs("a", {
							href: file.url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors",
							children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ jsx("span", {
								className: "text-sm text-gray-600 truncate",
								children: file.name
							})]
						}, index))
					})]
				})
			]
		})
	})] });
}
//#endregion
export { Show as default };

//# sourceMappingURL=Show-Bd55a1FC.js.map