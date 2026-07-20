import { t as StudentLayout } from "./StudentLayout-CQ_qSwDX.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon, CheckCircleIcon, DocumentIcon, ExclamationTriangleIcon, LockClosedIcon, LockOpenIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
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
	if (cours.est_verrouille) {
		var _cours$tranche_requis, _cours$tranche_requis2, _cours$tranche_requis3;
		return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${cours.titre} - Verrouillé` }), /* @__PURE__ */ jsx(StudentLayout, {
			title: cours.titre,
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-4xl",
				children: [/* @__PURE__ */ jsxs(Link, {
					href: "/student/cours",
					className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à mes cours"]
				}), /* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-8 shadow-sm border-2 border-red-200/50 bg-red-50/30 text-center",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center gap-4",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-20 h-20 bg-red-100 rounded-full flex items-center justify-center",
								children: /* @__PURE__ */ jsx(LockClosedIcon, { className: "w-10 h-10 text-red-500" })
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-2xl font-bold text-gray-900",
								children: cours.titre
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-5 h-5 text-yellow-500" }), /* @__PURE__ */ jsxs("span", {
									className: "text-lg font-medium text-yellow-700",
									children: [
										"🔒 Tranche ",
										(_cours$tranche_requis = cours.tranche_requise) === null || _cours$tranche_requis === void 0 ? void 0 : _cours$tranche_requis.numero,
										" requise"
									]
								})]
							}),
							((_cours$tranche_requis2 = cours.tranche_requise) === null || _cours$tranche_requis2 === void 0 ? void 0 : _cours$tranche_requis2.montant) && /* @__PURE__ */ jsxs("p", {
								className: "text-gray-600",
								children: [
									"Payez la tranche ",
									cours.tranche_requise.numero,
									" de",
									" ",
									/* @__PURE__ */ jsxs("span", {
										className: "font-semibold",
										children: [cours.tranche_requise.montant.toLocaleString(), " FCFA"]
									}),
									" ",
									"pour accéder à ce cours."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-500 max-w-md",
								children: "Une fois la tranche payée et validée, vous aurez automatiquement accès à ce contenu."
							}),
							(cours === null || cours === void 0 || (_cours$tranche_requis3 = cours.tranche_requise) === null || _cours$tranche_requis3 === void 0 ? void 0 : _cours$tranche_requis3.lien) ? /* @__PURE__ */ jsxs("a", {
								href: cours.tranche_requise.lien,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center gap-2 px-6 py-3 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
								children: [/* @__PURE__ */ jsx(LockOpenIcon, { className: "w-5 h-5" }), "Débloquer"]
							}) : /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-sm font-medium shrink-0 mt-1 cursor-not-allowed",
								children: [/* @__PURE__ */ jsx(LockOpenIcon, { className: "w-4 h-4" }), "Lien indisponible"]
							})
						]
					})
				})]
			})
		})] });
	}
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
				cours.video_url && cours.video_embed_url && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "p-4 border-b border-gray-100 bg-gray-50",
						children: /* @__PURE__ */ jsxs("h2", {
							className: "text-sm font-semibold text-gray-700 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-5 h-5 text-red-500" }), cours.video_title || "Vidéo du cours"]
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "p-4",
						children: /* @__PURE__ */ jsx("div", {
							className: "relative aspect-video rounded-xl overflow-hidden bg-black",
							children: /* @__PURE__ */ jsx("iframe", {
								src: cours.video_embed_url,
								className: "w-full h-full",
								allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
								allowFullScreen: true,
								title: cours.video_title || cours.titre
							})
						})
					})]
				}),
				cours.video_url && !cours.video_embed_url && /* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 text-yellow-600 bg-yellow-50 rounded-xl p-4 border border-yellow-200",
						children: [/* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("p", {
							className: "text-sm",
							children: "Le lien vidéo n'est pas valide."
						})]
					})
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

//# sourceMappingURL=Show-aAHQg_Lu.js.map