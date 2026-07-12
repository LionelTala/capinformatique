import { t as AdminLayout } from "./AdminLayout-DAc575Mz.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, DocumentIcon, EyeIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Cours/Show.tsx
function Show({ cours, viewedStudents, notViewedStudents }) {
	var _cours$formation, _cours$vague, _cours$certification;
	const percentage = cours.total_students > 0 ? Math.round(cours.viewed_count / cours.total_students * 100) : 0;
	const handleResendNotification = () => {
		if (confirm(`Renvoyer les notifications pour le cours "${cours.titre}" ?`)) router.post(`/admin/cours/${cours.id}/resend-notifications`);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${cours.titre} - Détails du cours` }), /* @__PURE__ */ jsx(AdminLayout, {
		title: `Détails du cours`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: "/admin/cours",
					className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
							className: "text-2xl font-bold text-gray-900",
							children: cours.titre
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-sm text-gray-500 mt-1",
							children: [
								(_cours$formation = cours.formation) === null || _cours$formation === void 0 ? void 0 : _cours$formation.name,
								" •",
								cours.type === "vague" ? ` Vague ${(_cours$vague = cours.vague) === null || _cours$vague === void 0 ? void 0 : _cours$vague.name}` : ` Certification ${(_cours$certification = cours.certification) === null || _cours$certification === void 0 ? void 0 : _cours$certification.titre}`
							]
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [!cours.has_notification_sent && /* @__PURE__ */ jsx("button", {
								onClick: handleResendNotification,
								className: "px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors",
								children: "📤 Envoyer notification"
							}), /* @__PURE__ */ jsx(Link, {
								href: `/admin/cours/${cours.id}/edit`,
								className: "px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
								children: "Modifier"
							})]
						})]
					})
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
					children: [
						/* @__PURE__ */ jsxs("h2", {
							className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-5 h-5 text-red-500" }), cours.video_title || "Vidéo"]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "relative aspect-video rounded-xl overflow-hidden bg-gray-900",
							children: cours.video_embed_url ? /* @__PURE__ */ jsx("iframe", {
								src: cours.video_embed_url,
								className: "w-full h-full",
								allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
								allowFullScreen: true
							}) : /* @__PURE__ */ jsx("div", {
								className: "w-full h-full flex items-center justify-center",
								children: /* @__PURE__ */ jsxs("a", {
									href: cours.video_url,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "text-white hover:text-blue-400 transition-colors",
									children: ["▶️ Voir la vidéo sur ", cours.video_url.includes("youtube") ? "YouTube" : "Vimeo"]
								})
							})
						}),
						/* @__PURE__ */ jsx("a", {
							href: cours.video_url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-block mt-3 text-sm text-cab-blue hover:underline",
							children: "Ouvrir dans un nouvel onglet"
						})
					]
				}),
				cours.contenu && cours.contenu.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
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
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [
						/* @__PURE__ */ jsxs("h2", {
							className: "text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5 text-cab-blue" }), "Statistiques de visionnage"]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-3 gap-4 mb-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-4 text-center",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-2xl font-bold text-cab-blue",
										children: cours.viewed_count
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-gray-500",
										children: "Vues"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-4 text-center",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-2xl font-bold text-cab-blue",
										children: cours.total_students
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-gray-500",
										children: "Étudiants"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-4 text-center",
									children: [/* @__PURE__ */ jsxs("p", {
										className: "text-2xl font-bold text-cab-blue",
										children: [percentage, "%"]
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-gray-500",
										children: "Taux de visionnage"
									})]
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "w-full h-2 bg-gray-200 rounded-full overflow-hidden",
							children: /* @__PURE__ */ jsx("div", {
								className: "h-full bg-cab-blue rounded-full transition-all duration-500",
								style: { width: `${Math.min(percentage, 100)}%` }
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid md:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
							children: [
								/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-5 h-5 text-green-500" }),
								"Ont vu (",
								viewedStudents.length,
								")"
							]
						}), viewedStudents.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-500",
							children: "Aucun étudiant n'a encore vu ce cours"
						}) : /* @__PURE__ */ jsx("ul", {
							className: "space-y-2",
							children: viewedStudents.map((student) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-medium text-gray-900",
									children: student.name
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs text-gray-400",
									children: student.viewed_at
								})]
							}, student.id))
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
							children: [
								/* @__PURE__ */ jsx(ClockIcon, { className: "w-5 h-5 text-yellow-500" }),
								"N'ont pas vu (",
								notViewedStudents.length,
								")"
							]
						}), notViewedStudents.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-500",
							children: "Tous les étudiants ont vu ce cours"
						}) : /* @__PURE__ */ jsx("ul", {
							className: "space-y-2",
							children: notViewedStudents.map((student) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-medium text-gray-900",
									children: student.name
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs text-gray-400",
									children: student.matricule
								})]
							}, student.id))
						})]
					})]
				})
			]
		})
	})] });
}
//#endregion
export { Show as default };

//# sourceMappingURL=Show-0xVY_kNr.js.map