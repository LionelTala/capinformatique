import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, DocumentIcon, EyeIcon, ShieldCheckIcon, UserGroupIcon, UserIcon, UsersIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Cours/Show.tsx
function Show({ cours, viewedStudents, notViewedStudents }) {
	var _cours$formation, _cours$vague, _cours$certification;
	const percentage = cours.total_students > 0 ? Math.round(cours.viewed_count / cours.total_students * 100) : 0;
	const handleResendNotification = () => {
		if (confirm(`Renvoyer les notifications pour le cours "${cours.titre}" ?`)) router.post(`/admin/cours/${cours.id}/resend-notifications`);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${cours.titre} - Détails du cours` }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Détails du cours",
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
						className: "flex flex-col md:flex-row md:items-start md:justify-between gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ jsx("h1", {
									className: "text-2xl font-bold text-gray-900",
									children: cours.titre
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-2 mt-2",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-sm text-gray-600",
											children: (_cours$formation = cours.formation) === null || _cours$formation === void 0 ? void 0 : _cours$formation.name
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-gray-300",
											children: "•"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-sm text-gray-600",
											children: cours.type === "vague" ? `Vague ${((_cours$vague = cours.vague) === null || _cours$vague === void 0 ? void 0 : _cours$vague.name) || "-"}` : `Certification ${((_cours$certification = cours.certification) === null || _cours$certification === void 0 ? void 0 : _cours$certification.titre) || "-"}`
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-3 mt-3",
									children: [
										/* @__PURE__ */ jsxs("span", {
											className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cours.mode_envoi === "individuel" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`,
											children: [cours.mode_envoi === "individuel" ? /* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(UserGroupIcon, { className: "w-4 h-4" }), cours.mode_envoi === "individuel" ? "Envoi individuel" : "Envoi groupe"]
										}),
										cours.mode_envoi === "individuel" && cours.student && /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200",
											children: [
												/* @__PURE__ */ jsx(UsersIcon, { className: "w-4 h-4" }),
												cours.student.name,
												" (",
												cours.student.matricule,
												")"
											]
										}),
										cours.tranche_requise ? /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium border border-yellow-200",
											children: [
												/* @__PURE__ */ jsx(ShieldCheckIcon, { className: "w-4 h-4" }),
												"Tranche ",
												cours.tranche_requise.numero,
												" requise",
												/* @__PURE__ */ jsxs("span", {
													className: "ml-1 text-[10px] opacity-75",
													children: [
														"(",
														cours.tranche_requise.montant.toLocaleString(),
														" FCFA)"
													]
												})
											]
										}) : /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium border border-green-200",
											children: [/* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4" }), "Accessible à tous"]
										})
									]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2 flex-shrink-0",
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
						className: "text-gray-600 leading-relaxed whitespace-pre-line",
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
							allowFullScreen: true,
							title: cours.video_title || cours.titre
						}) : /* @__PURE__ */ jsx("div", {
							className: "w-full h-full flex items-center justify-center",
							children: /* @__PURE__ */ jsxs("a", {
								href: cours.video_url,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-white hover:text-blue-400 transition-colors flex items-center gap-2",
								children: ["▶️ Voir la vidéo sur ", cours.video_url.includes("youtube") ? "YouTube" : "Vimeo"]
							})
						})
					})]
				}),
				cours.contenu && cours.contenu.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500" }),
							"Fichiers joints (",
							cours.contenu.length,
							")"
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
						children: cours.contenu.map((file, index) => /* @__PURE__ */ jsxs("a", {
							href: file.url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group",
							children: [
								/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500 flex-shrink-0" }),
								/* @__PURE__ */ jsx("span", {
									className: "text-sm text-gray-600 truncate flex-1",
									children: file.name
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity",
									children: "📎"
								})
							]
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
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4 text-xs text-gray-400 border-t border-gray-100 pt-3",
							children: [cours.mode_envoi === "individuel" ? /* @__PURE__ */ jsx("span", { children: "👤 Envoi individuel à un seul étudiant" }) : /* @__PURE__ */ jsxs("span", { children: [
								"👥 Envoi groupé à ",
								cours.total_students,
								" étudiant",
								cours.total_students > 1 ? "s" : ""
							] }), cours.tranche_requise && /* @__PURE__ */ jsxs("span", {
								className: "ml-3",
								children: [
									"• 🔒 Tranche ",
									cours.tranche_requise.numero,
									" requise"
								]
							})]
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
							className: "space-y-2 max-h-96 overflow-y-auto pr-2",
							children: viewedStudents.map((student) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-center justify-between text-sm p-2 bg-green-50 rounded-lg",
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
							className: "space-y-2 max-h-96 overflow-y-auto pr-2",
							children: notViewedStudents.map((student) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-center justify-between text-sm p-2 bg-yellow-50 rounded-lg",
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

//# sourceMappingURL=Show-BQp4aXU_.js.map