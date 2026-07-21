import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { t as Pagination } from "./Pagination-VbtBEDFD.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { BookOpenIcon, DocumentTextIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon, TrashIcon, UserGroupIcon, UserIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Cours/Index.tsx
function Index({ cours }) {
	const [showDeleteModal, setShowDeleteModal] = useState(null);
	const handleToggleActive = (c) => {
		if (confirm(`Confirmer la ${c.is_active ? "désactivation" : "activation"} du cours "${c.titre}" ?`)) router.post(`/admin/cours/${c.id}/toggle-active`);
	};
	const handleDelete = (c) => {
		if (confirm(`Confirmer la suppression du cours "${c.titre}" ? Cette action est irréversible.`)) router.delete(`/admin/cours/${c.id}`);
	};
	const handleResendNotification = (c) => {
		if (confirm(`Renvoyer les notifications pour le cours "${c.titre}" ?`)) router.post(`/admin/cours/${c.id}/resend-notifications`);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion des cours - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion des cours",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-sm text-gray-500",
					children: [cours.total, " cours au total"]
				}), /* @__PURE__ */ jsxs(Link, {
					href: "/admin/cours/create",
					className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
					children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Nouveau cours"]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
				children: cours.data.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "text-center py-12",
					children: [
						/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
						/* @__PURE__ */ jsx("p", {
							className: "text-gray-500 text-sm",
							children: "Aucun cours trouvé"
						}),
						/* @__PURE__ */ jsx(Link, {
							href: "/admin/cours/create",
							className: "inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium",
							children: "Créer votre premier cours →"
						})
					]
				}) : /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-gray-50 border-b border-gray-100",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Cours"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Formation"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Envoi"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Tranche requise"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Vues"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Contenu"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Notif."
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Statut"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-gray-100",
							children: cours.data.map((c) => {
								var _c$formation;
								return /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-gray-50 transition-colors",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5 text-cab-blue" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
													className: "font-medium text-gray-900 line-clamp-1",
													children: c.titre
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-gray-500 line-clamp-1",
													children: c.description || "Aucune description"
												})] })]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-gray-600 text-xs",
											children: ((_c$formation = c.formation) === null || _c$formation === void 0 ? void 0 : _c$formation.name) || "-"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("span", {
												className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.mode_envoi === "individuel" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`,
												children: [c.mode_envoi === "individuel" ? /* @__PURE__ */ jsx(UserIcon, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(UserGroupIcon, { className: "w-3 h-3" }), c.mode_envoi === "individuel" ? "Individuel" : "Groupe"]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: c.tranche_requise ? /* @__PURE__ */ jsxs("span", {
												className: "px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium",
												children: ["T", c.tranche_requise.numero]
											}) : /* @__PURE__ */ jsx("span", {
												className: "text-xs text-gray-400",
												children: "Tous"
											})
										}),
										/* @__PURE__ */ jsxs("td", {
											className: "px-4 py-3 text-gray-600 text-sm",
											children: [
												c.viewed_count,
												" / ",
												c.total_students
											]
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-1",
												children: [
													c.has_video && /* @__PURE__ */ jsx(VideoCameraIcon, {
														className: "w-4 h-4 text-red-500",
														title: "Vidéo"
													}),
													c.has_files && /* @__PURE__ */ jsx(DocumentTextIcon, {
														className: "w-4 h-4 text-blue-500",
														title: "Fichiers"
													}),
													!c.has_video && !c.has_files && /* @__PURE__ */ jsx("span", {
														className: "text-xs text-gray-400",
														children: "-"
													})
												]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: c.notification_sent ? /* @__PURE__ */ jsx("span", {
												className: "text-xs text-green-600",
												children: "✅ Envoyée"
											}) : /* @__PURE__ */ jsx("button", {
												onClick: () => handleResendNotification(c),
												className: "text-xs text-yellow-600 hover:text-yellow-800",
												children: "📤 Envoyer"
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsx("span", {
												className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`,
												children: c.is_active ? "Actif" : "Inactif"
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-right",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-end gap-2",
												children: [
													/* @__PURE__ */ jsx("button", {
														onClick: () => handleToggleActive(c),
														className: `p-1.5 rounded-lg transition-colors ${c.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
														title: c.is_active ? "Désactiver" : "Activer",
														children: c.is_active ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ jsx(Link, {
														href: `/admin/cours/${c.id}`,
														className: "p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors",
														title: "Voir",
														children: /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ jsx(Link, {
														href: `/admin/cours/${c.id}/edit`,
														className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
														title: "Modifier",
														children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ jsx("button", {
														onClick: () => handleDelete(c),
														className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
														title: "Supprimer",
														children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
													})
												]
											})
										})
									]
								}, c.id);
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx(Pagination, {
				links: cours.links,
				from: cours.from,
				to: cours.to,
				total: cours.total
			})
		]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-NHPsuzgr.js.map