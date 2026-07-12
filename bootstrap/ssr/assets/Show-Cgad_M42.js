import { t as AdminLayout } from "./AdminLayout-DAc575Mz.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeftIcon, CalendarIcon, ChartBarIcon, CheckCircleIcon, ClockIcon, DocumentIcon, UserGroupIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Evaluations/Show.tsx
function Show({ evaluation, soumissions, nonSoumis }) {
	var _evaluation$formation, _evaluation$vague, _evaluation$certifica;
	const [showCorrectionModal, setShowCorrectionModal] = useState(null);
	const [note, setNote] = useState("");
	const [commentaire, setCommentaire] = useState("");
	const [loading, setLoading] = useState(false);
	const handleCorriger = (soumissionId) => {
		setLoading(true);
		router.post(`/admin/soumissions-evaluations/${soumissionId}/corriger`, {
			note: parseFloat(note),
			commentaire
		}, {
			preserveScroll: true,
			onSuccess: () => {
				setLoading(false);
				setShowCorrectionModal(null);
				setNote("");
				setCommentaire("");
				router.reload();
			},
			onError: () => {
				setLoading(false);
			}
		});
	};
	const getStatutBadge = (statut, label) => {
		const colors = {
			en_attente: "bg-yellow-100 text-yellow-800",
			soumis: "bg-blue-100 text-blue-800",
			corrige: "bg-green-100 text-green-800"
		};
		const icons = {
			en_attente: /* @__PURE__ */ jsx(ClockIcon, { className: "w-4 h-4" }),
			soumis: /* @__PURE__ */ jsx(ClockIcon, { className: "w-4 h-4" }),
			corrige: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-4 h-4" })
		};
		return /* @__PURE__ */ jsxs("span", {
			className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[statut] || "bg-gray-100 text-gray-800"}`,
			children: [icons[statut], label]
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${evaluation.titre} - Détails de l'évaluation` }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: `Détails de l'évaluation`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "max-w-5xl",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: "/admin/evaluations",
					className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("h1", {
								className: "text-2xl font-bold text-gray-900",
								children: evaluation.titre
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-gray-500 mt-1",
								children: [
									(_evaluation$formation = evaluation.formation) === null || _evaluation$formation === void 0 ? void 0 : _evaluation$formation.name,
									" •",
									evaluation.type === "vague" ? ` Vague ${(_evaluation$vague = evaluation.vague) === null || _evaluation$vague === void 0 ? void 0 : _evaluation$vague.name}` : ` Certification ${(_evaluation$certifica = evaluation.certification) === null || _evaluation$certifica === void 0 ? void 0 : _evaluation$certifica.titre}`
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4 mt-2 text-sm",
								children: [
									evaluation.date && /* @__PURE__ */ jsxs("span", {
										className: `flex items-center gap-1 ${evaluation.est_depasse ? "text-red-500" : "text-gray-500"}`,
										children: [
											/* @__PURE__ */ jsx(CalendarIcon, { className: "w-4 h-4" }),
											"Date : ",
											evaluation.date,
											evaluation.est_depasse && " (Dépassée)"
										]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1 text-gray-500",
										children: [
											/* @__PURE__ */ jsx(UserGroupIcon, { className: "w-4 h-4" }),
											evaluation.total_etudiants,
											" étudiants"
										]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1 text-gray-500",
										children: [
											/* @__PURE__ */ jsx(ChartBarIcon, { className: "w-4 h-4" }),
											"Coeff. ",
											evaluation.coefficient
										]
									})
								]
							})
						] }), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [!evaluation.has_notification_sent && /* @__PURE__ */ jsx("button", {
								onClick: () => {
									if (confirm(`Renvoyer les notifications pour l'évaluation "${evaluation.titre}" ?`)) router.post(`/admin/evaluations/${evaluation.id}/resend-notifications`);
								},
								className: "px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors",
								children: "📤 Envoyer notification"
							}), /* @__PURE__ */ jsx(Link, {
								href: `/admin/evaluations/${evaluation.id}/edit`,
								className: "px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
								children: "Modifier"
							})]
						})]
					})
				}),
				evaluation.description && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold text-gray-700 mb-2",
						children: "📝 Description"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-gray-600 leading-relaxed",
						children: evaluation.description
					})]
				}),
				evaluation.contenu && evaluation.contenu.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-blue-500" }), "Fichiers joints"]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
						children: evaluation.contenu.map((file, index) => /* @__PURE__ */ jsxs("a", {
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
					className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-2xl font-bold text-cab-blue",
								children: evaluation.soumissions_count
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-500",
								children: "Soumissions"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-2xl font-bold text-orange-500",
								children: evaluation.soumis_count
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-500",
								children: "En attente de correction"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-2xl font-bold text-green-500",
								children: evaluation.corrige_count
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-500",
								children: "Corrigés"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "text-2xl font-bold text-purple-500",
								children: [evaluation.taux_soumission, "%"]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-500",
								children: "Taux de soumission"
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5 text-cab-blue" }), "Soumissions"]
					}), soumissions.length === 0 ? /* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500",
						children: "Aucune soumission pour le moment"
					}) : /* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ jsx("thead", {
								className: "bg-gray-50",
								children: /* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-2 text-left text-xs font-medium text-gray-500",
										children: "Étudiant"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-2 text-left text-xs font-medium text-gray-500",
										children: "Fichier"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-2 text-left text-xs font-medium text-gray-500",
										children: "Statut"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-2 text-left text-xs font-medium text-gray-500",
										children: "Date"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-2 text-left text-xs font-medium text-gray-500",
										children: "Note"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-2 text-right text-xs font-medium text-gray-500",
										children: "Action"
									})
								] })
							}), /* @__PURE__ */ jsx("tbody", { children: soumissions.map((s) => /* @__PURE__ */ jsxs("tr", {
								className: "border-t border-gray-100",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-2 font-medium text-gray-900",
										children: s.student_name
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-2",
										children: s.fichier && /* @__PURE__ */ jsxs("a", {
											href: s.fichier.url,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "text-cab-blue hover:underline text-xs",
											children: ["📎 ", s.fichier.name]
										})
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "px-4 py-2",
										children: [getStatutBadge(s.statut, s.statut_label), s.est_en_retard && /* @__PURE__ */ jsx("span", {
											className: "ml-1 text-xs text-red-500",
											children: "(En retard)"
										})]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-2 text-gray-500 text-xs",
										children: s.submitted_at || "-"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-2 font-semibold",
										children: s.note !== null ? `${s.note}/20` : "-"
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "px-4 py-2 text-right",
										children: [s.statut === "soumis" && /* @__PURE__ */ jsx("button", {
											onClick: () => {
												var _s$note;
												setShowCorrectionModal(s.id);
												setNote(((_s$note = s.note) === null || _s$note === void 0 ? void 0 : _s$note.toString()) || "");
												setCommentaire(s.commentaire || "");
											},
											className: "px-3 py-1 bg-cab-blue text-white rounded-lg text-xs font-medium hover:bg-cab-dark transition-colors",
											children: "Corriger"
										}), s.statut === "corrige" && /* @__PURE__ */ jsx("span", {
											className: "text-xs text-green-600",
											children: "✅ Corrigé"
										})]
									})
								]
							}, s.id)) })]
						})
					})]
				}),
				nonSoumis.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx(ClockIcon, { className: "w-5 h-5 text-yellow-500" }),
							"Non soumis (",
							nonSoumis.length,
							")"
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "flex flex-wrap gap-2",
						children: nonSoumis.map((student) => /* @__PURE__ */ jsx("span", {
							className: "px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600",
							children: student.name
						}, student.id))
					})]
				})
			]
		}), showCorrectionModal !== null && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "text-lg font-bold text-gray-900 mb-4",
						children: "Corriger l'évaluation"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-600 mb-4",
						children: "Entrez la note et éventuellement un commentaire pour cette évaluation."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: ["Note /20 ", /* @__PURE__ */ jsx("span", {
								className: "text-red-500",
								children: "*"
							})]
						}), /* @__PURE__ */ jsx("input", {
							type: "number",
							value: note,
							onChange: (e) => setNote(e.target.value),
							min: "0",
							max: "20",
							step: "0.5",
							className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
							placeholder: "Ex: 15.5"
						})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "Commentaire (optionnel)"
						}), /* @__PURE__ */ jsx("textarea", {
							value: commentaire,
							onChange: (e) => setCommentaire(e.target.value),
							rows: 3,
							className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none",
							placeholder: "Votre commentaire..."
						})] })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex gap-3 mt-6",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => handleCorriger(showCorrectionModal),
							disabled: loading || !note,
							className: "flex-1 px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
							children: loading ? "⏳" : "✅ Valider la correction"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setShowCorrectionModal(null),
							className: "px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors",
							children: "Annuler"
						})]
					})
				]
			})
		})]
	})] });
}
//#endregion
export { Show as default };

//# sourceMappingURL=Show-Cgad_M42.js.map