import { t as AdminLayout } from "./AdminLayout-DAc575Mz.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, DocumentIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Admin/Devoirs/Edit.tsx
function Edit({ devoir, formations }) {
	var _devoir$vague_id, _devoir$certification;
	const [vagues, setVagues] = useState([]);
	const [certifications, setCertifications] = useState([]);
	const [files, setFiles] = useState([]);
	const [filePreviews, setFilePreviews] = useState([]);
	const [loadingVagues, setLoadingVagues] = useState(false);
	const [loadingCertifications, setLoadingCertifications] = useState(false);
	const { data, setData, put, processing, errors } = useForm({
		titre: devoir.titre,
		description: devoir.description || "",
		formation_id: devoir.formation_id.toString(),
		type: devoir.type,
		vague_id: ((_devoir$vague_id = devoir.vague_id) === null || _devoir$vague_id === void 0 ? void 0 : _devoir$vague_id.toString()) || "",
		certification_id: ((_devoir$certification = devoir.certification_id) === null || _devoir$certification === void 0 ? void 0 : _devoir$certification.toString()) || "",
		date_limite: devoir.date_limite || "",
		is_active: devoir.is_active,
		order: devoir.order,
		send_notification: false,
		files: []
	});
	useEffect(() => {
		if (data.formation_id && data.type === "vague") {
			setLoadingVagues(true);
			fetch(`/admin/devoirs/vagues/${data.formation_id}`).then((res) => res.json()).then((data) => {
				setVagues(data);
				setLoadingVagues(false);
			}).catch(() => setLoadingVagues(false));
		}
	}, [data.formation_id, data.type]);
	useEffect(() => {
		if (data.formation_id && data.type === "certification") {
			setLoadingCertifications(true);
			fetch(`/admin/devoirs/certifications/${data.formation_id}`).then((res) => res.json()).then((data) => {
				setCertifications(data);
				setLoadingCertifications(false);
			}).catch(() => setLoadingCertifications(false));
		}
	}, [data.formation_id, data.type]);
	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files || []);
		setFiles([...files, ...selectedFiles]);
		setData("files", [...files, ...selectedFiles]);
		const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
		setFilePreviews([...filePreviews, ...newPreviews]);
	};
	const removeFile = (index) => {
		const newFiles = files.filter((_, i) => i !== index);
		const newPreviews = filePreviews.filter((_, i) => i !== index);
		setFiles(newFiles);
		setFilePreviews(newPreviews);
		setData("files", newFiles);
		URL.revokeObjectURL(filePreviews[index]);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		put(`/admin/devoirs/${devoir.id}`, { forceFormData: true });
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Modifier le devoir - Admin" }), /* @__PURE__ */ jsx(AdminLayout, {
		title: "Modifier le devoir",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl",
			children: [/* @__PURE__ */ jsxs(Link, {
				href: "/admin/devoirs",
				className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4",
				children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-4 h-4" }), "Retour à la liste"]
			}), /* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "space-y-5",
					encType: "multipart/form-data",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "titre",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Titre du devoir ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								id: "titre",
								type: "text",
								value: data.titre,
								onChange: (e) => setData("titre", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								required: true
							}),
							errors.titre && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.titre
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "description",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Description"
							}),
							/* @__PURE__ */ jsx("textarea", {
								id: "description",
								value: data.description,
								onChange: (e) => setData("description", e.target.value),
								rows: 3,
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
							}),
							errors.description && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.description
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "formation_id",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Formation ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsxs("select", {
								id: "formation_id",
								value: data.formation_id,
								onChange: (e) => setData("formation_id", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
								required: true,
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "-- Sélectionnez une formation --"
								}), formations.map((f) => /* @__PURE__ */ jsxs("option", {
									value: f.id,
									children: [
										f.name,
										" (",
										f.abbreviation,
										")"
									]
								}, f.id))]
							}),
							errors.formation_id && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.formation_id
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: "Destinataires"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-4",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									type: "radio",
									value: "vague",
									checked: data.type === "vague",
									onChange: (e) => setData("type", e.target.value),
									className: "w-4 h-4 text-cab-blue focus:ring-cab-blue"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm text-gray-700",
									children: "Vague"
								})]
							}), /* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									type: "radio",
									value: "certification",
									checked: data.type === "certification",
									onChange: (e) => setData("type", e.target.value),
									className: "w-4 h-4 text-cab-blue focus:ring-cab-blue"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm text-gray-700",
									children: "Certification"
								})]
							})]
						})] }),
						data.type === "vague" && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "vague_id",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Vague ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsxs("select", {
								id: "vague_id",
								value: data.vague_id,
								onChange: (e) => setData("vague_id", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
								required: data.type === "vague",
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "-- Sélectionnez une vague --"
								}), loadingVagues ? /* @__PURE__ */ jsx("option", {
									value: "",
									disabled: true,
									children: "Chargement..."
								}) : vagues.map((v) => /* @__PURE__ */ jsxs("option", {
									value: v.id,
									children: [
										v.name,
										" (",
										v.date_debut,
										")"
									]
								}, v.id))]
							}),
							errors.vague_id && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.vague_id
							})
						] }),
						data.type === "certification" && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "certification_id",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: ["Certification ", /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsxs("select", {
								id: "certification_id",
								value: data.certification_id,
								onChange: (e) => setData("certification_id", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white",
								required: data.type === "certification",
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "-- Sélectionnez une certification --"
								}), loadingCertifications ? /* @__PURE__ */ jsx("option", {
									value: "",
									disabled: true,
									children: "Chargement..."
								}) : certifications.map((c) => /* @__PURE__ */ jsx("option", {
									value: c.id,
									children: c.titre
								}, c.id))]
							}),
							errors.certification_id && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.certification_id
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "date_limite",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Date limite"
							}),
							/* @__PURE__ */ jsx("input", {
								id: "date_limite",
								type: "datetime-local",
								value: data.date_limite,
								onChange: (e) => setData("date_limite", e.target.value),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
							}),
							errors.date_limite && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-red-600",
								children: errors.date_limite
							})
						] }),
						devoir.contenu && devoir.contenu.length > 0 && /* @__PURE__ */ jsxs("div", {
							className: "bg-gray-50 rounded-xl p-4 border border-gray-200",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-sm font-semibold text-gray-700 mb-3",
								children: "Fichiers existants"
							}), /* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
								children: devoir.contenu.map((file, index) => /* @__PURE__ */ jsxs("div", {
									className: "bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-2",
									children: [
										/* @__PURE__ */ jsx(DocumentIcon, { className: "w-4 h-4 text-blue-500" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-xs text-gray-600 truncate flex-1",
											children: file.name
										}),
										/* @__PURE__ */ jsx("a", {
											href: file.url,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "text-cab-blue hover:text-cab-dark text-xs",
											children: "Voir"
										})
									]
								}, index))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bg-gray-50 rounded-xl p-4 border border-gray-200",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-semibold text-gray-700 mb-3",
									children: "Ajouter des fichiers"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-4",
									children: /* @__PURE__ */ jsxs("label", {
										className: "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors",
										children: [
											/* @__PURE__ */ jsx(PlusIcon, { className: "w-8 h-8 text-gray-400" }),
											/* @__PURE__ */ jsx("span", {
												className: "text-xs text-gray-500 mt-1",
												children: "Ajouter des fichiers"
											}),
											/* @__PURE__ */ jsx("input", {
												type: "file",
												multiple: true,
												onChange: handleFileChange,
												className: "hidden"
											})
										]
									})
								}),
								filePreviews.length > 0 && /* @__PURE__ */ jsx("div", {
									className: "mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3",
									children: files.map((file, index) => /* @__PURE__ */ jsxs("div", {
										className: "relative bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-2",
										children: [
											/* @__PURE__ */ jsx(DocumentIcon, { className: "w-4 h-4 text-blue-500" }),
											/* @__PURE__ */ jsx("span", {
												className: "text-xs text-gray-600 truncate flex-1",
												children: file.name
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => removeFile(index),
												className: "text-red-500 hover:text-red-700",
												children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-4 h-4" })
											})
										]
									}, index))
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									id: "is_active",
									type: "checkbox",
									checked: data.is_active,
									onChange: (e) => setData("is_active", e.target.checked),
									className: "w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
								}), /* @__PURE__ */ jsx("label", {
									htmlFor: "is_active",
									className: "text-sm text-gray-700",
									children: "Devoir actif"
								})]
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "order",
								className: "block text-sm font-medium text-gray-700 mb-1",
								children: "Ordre d'affichage"
							}), /* @__PURE__ */ jsx("input", {
								id: "order",
								type: "number",
								value: data.order,
								onChange: (e) => setData("order", parseInt(e.target.value) || 0),
								className: "w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
								min: "0"
							})] })]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "bg-blue-50 rounded-xl p-4 border border-blue-100",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									id: "send_notification",
									type: "checkbox",
									checked: data.send_notification,
									onChange: (e) => setData("send_notification", e.target.checked),
									className: "w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
								}), /* @__PURE__ */ jsx("label", {
									htmlFor: "send_notification",
									className: "text-sm text-blue-700 font-medium",
									children: "🔔 Renvoyer une notification (si non déjà envoyé)"
								})]
							})
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: processing,
							className: "w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
							children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("svg", {
								className: "animate-spin h-5 w-5 text-white",
								xmlns: "http://www.w3.org/2000/svg",
								fill: "none",
								viewBox: "0 0 24 24",
								children: [/* @__PURE__ */ jsx("circle", {
									className: "opacity-25",
									cx: "12",
									cy: "12",
									r: "10",
									stroke: "currentColor",
									strokeWidth: "4"
								}), /* @__PURE__ */ jsx("path", {
									className: "opacity-75",
									fill: "currentColor",
									d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								})]
							}), "Mise à jour en cours..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" }), "Mettre à jour"] })
						})
					]
				})
			})]
		})
	})] });
}
//#endregion
export { Edit as default };

//# sourceMappingURL=Edit-nTawyCM6.js.map