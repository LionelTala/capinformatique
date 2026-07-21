import { t as AdminLayout } from "./AdminLayout-CE8xoF2m.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AcademicCapIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Formations/Index.tsx
function Index({ formations }) {
	var _formations$length;
	const [showDeleteModal, setShowDeleteModal] = useState(null);
	console.log("Formations data:", formations);
	const handleToggleActive = (formation) => {
		if (confirm(`Confirmer la ${formation.is_active ? "désactivation" : "activation"} de ${formation.name} ?`)) router.post(`/admin/formations/${formation.id}/toggle-active`);
	};
	const handleDelete = (formation) => {
		if (confirm(`Confirmer la suppression de ${formation.name} ? Cette action est irréversible.`)) router.delete(`/admin/formations/${formation.id}`);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gestion des formations - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Gestion des formations",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
			children: [/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-gray-500",
				children: [
					(_formations$length = formations === null || formations === void 0 ? void 0 : formations.length) !== null && _formations$length !== void 0 ? _formations$length : 0,
					" formation",
					(formations === null || formations === void 0 ? void 0 : formations.length) !== 1 ? "s" : "",
					" au total"
				]
			}), /* @__PURE__ */ jsxs(Link, {
				href: "/admin/formations/create",
				className: "inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
				children: [/* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }), "Nouvelle formation"]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
			children: !formations || formations.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "text-center py-12",
				children: [
					/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-sm",
						children: "Aucune formation trouvée"
					}),
					/* @__PURE__ */ jsx(Link, {
						href: "/admin/formations/create",
						className: "inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium",
						children: "Créer votre première formation →"
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
								children: "Formation"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Abréviation"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Durée"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Frais"
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
						children: formations.map((formation) => /* @__PURE__ */ jsxs("tr", {
							className: "hover:bg-gray-50 transition-colors",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("img", {
											src: formation.image_url || "/assets/images/placeholder.jpg",
											alt: formation.name || "Formation",
											className: "w-12 h-12 rounded-lg object-cover border border-gray-200",
											onError: (e) => {
												e.target.src = "/assets/images/placeholder.jpg";
											}
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "font-medium text-gray-900",
											children: formation.name || "Sans nom"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: formation.diplome || "Non défini"
										})] })]
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ jsx("span", {
										className: "px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-mono",
										children: formation.abbreviation || "-"
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3 text-gray-600 text-sm",
									children: formation.duration || "-"
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3 font-semibold text-gray-900",
									children: formation.frais_formatted || "0 FCFA"
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ jsx("span", {
										className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${formation.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`,
										children: formation.is_active ? "Actif" : "Inactif"
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-4 py-3 text-right",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-end gap-2",
										children: [
											formation.lien_externe && formation.lien_label && /* @__PURE__ */ jsx("a", {
												href: formation.lien_externe,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "p-1.5 rounded-lg text-cab-blue hover:bg-blue-50 transition-colors",
												title: formation.lien_label,
												children: /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
											}),
											/* @__PURE__ */ jsx("button", {
												onClick: () => handleToggleActive(formation),
												className: `p-1.5 rounded-lg transition-colors ${formation.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
												title: formation.is_active ? "Désactiver" : "Activer",
												children: formation.is_active ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
											}),
											/* @__PURE__ */ jsx(Link, {
												href: `/admin/formations/${formation.id}/edit`,
												className: "p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors",
												title: "Modifier",
												children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
											}),
											/* @__PURE__ */ jsx("button", {
												onClick: () => handleDelete(formation),
												className: "p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
												title: "Supprimer",
												children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
											})
										]
									})
								})
							]
						}, formation.id))
					})]
				})
			}, formations.map((f) => f.id).join("-"))
		})]
	})] });
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-DKCHRgi0.js.map