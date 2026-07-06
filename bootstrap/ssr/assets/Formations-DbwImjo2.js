import { t as PublicLayout } from "./PublicLayout-ngcSENZC.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AcademicCapIcon, ArrowRightIcon, ClockIcon, CurrencyDollarIcon, UserPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
//#region resources/js/data/formationsPresentiel.ts
var formationsPresentiel = [
	{
		id: 1,
		title: "Secrétariat Bureautique",
		abbreviation: "SEC",
		description: "Accueil, classement, correspondance et communication digitale pour devenir l'assistant(e) indispensable de toute entreprise.",
		duration: "8 mois + 2 mois de stage",
		diplome: "Certificat de Professionnalisation",
		price: "150 000 FCFA",
		image: "/assets/images/bureau.webp",
		icon: "📋",
		couleur: "blue",
		tags: ["Cours du jour", "Cours du soir"],
		debouches: [
			"Secrétaire publique",
			"Assistant(e) de direction",
			"Standardiste",
			"Gestionnaire de business center",
			"Secrétaire de PME/PMI",
			"Réceptionniste caissière",
			"Auto-emploi"
		],
		programme: [
			"Classement des dossiers",
			"Gestion de la correspondance",
			"Gestion du secrétariat et accueil",
			"Économie et organisation des entreprises",
			"Expression écrite et orale",
			"Communication digitale",
			"Formation bilingue (Anglais/Français)"
		]
	},
	{
		id: 2,
		title: "Secrétariat Comptable",
		abbreviation: "SEC-CPT",
		description: "Comptabilité générale, fiscalité et états financiers SYSCOHADA pour piloter la gestion administrative d'une entreprise.",
		duration: "8 mois + 2 mois de stage",
		diplome: "Certificat de Professionnalisation",
		price: "250 000 FCFA",
		image: "/assets/images/comptable.webp",
		icon: "💰",
		couleur: "red",
		tags: ["Cours du jour", "Cours du soir"],
		debouches: [
			"Aide-comptable",
			"Assistant(e) de direction",
			"Comptable",
			"Secrétaire comptable",
			"Secrétaire financière",
			"Auto-emploi"
		],
		programme: [
			"Comptabilité générale",
			"Comptabilité analytique",
			"Économie générale et EOE",
			"Mathématiques financières",
			"Comptabilité sur machine",
			"Pratique du secrétariat",
			"Fiscalité des entreprises",
			"ERP",
			"États financiers du SYSCOHADA"
		]
	},
	{
		id: 3,
		title: "Logistique et Transit",
		abbreviation: "LOG",
		description: "Opérations douanières, transport international et gestion des stocks pour rejoindre les métiers du port et de la logistique.",
		duration: "8 mois + 2 mois de stage",
		diplome: "Certificat de Professionnalisation",
		price: "250 000 FCFA",
		image: "/assets/images/transit.webp",
		icon: "🚚",
		couleur: "blue",
		tags: ["Cours du jour", "Cours du soir"],
		debouches: [
			"Consignataire",
			"Acconier",
			"Transitaire",
			"Logisticien",
			"Courtier maritime",
			"Gestionnaire des terminaux",
			"Gestionnaire de parc automobile"
		],
		programme: [
			"Gestion des stocks sur SAGE",
			"Logistique industrielle et commerciale",
			"Technique des opérations de transport douanières",
			"Droit et contentieux du transport",
			"Commerce international",
			"Pratique logistique sur Excel"
		]
	},
	{
		id: 4,
		title: "Infographie 2D & Multimédia",
		abbreviation: "INF",
		description: "Illustrator, Photoshop, InDesign et After Effects pour créer des visuels et gérer une communication digitale professionnelle.",
		duration: "8 mois + 2 mois de stage",
		diplome: "Certificat de Professionnalisation",
		price: "300 000 FCFA",
		image: "/assets/images/ifographie.webp",
		icon: "🎨",
		couleur: "red",
		tags: ["Cours du jour", "Cours du soir"],
		debouches: [
			"Graphiste digital",
			"Gestionnaire de médias sociaux",
			"Web designer",
			"Éditeur de pages digitales",
			"Webmarketeur",
			"Assistant marketing",
			"Chargé de communication digitale",
			"Auto-emploi"
		],
		programme: [
			"Initiation au graphisme",
			"Adobe Illustrator (création, colorimétrie, design)",
			"Adobe Photoshop (image numérique, habillage, effets)",
			"Adobe InDesign (mise en page, colorimétrie)",
			"Animation basique FX (After Effects)",
			"Habillage graphique, effets spéciaux, initiation 3D",
			"Internet appliqué au graphisme",
			"Techniques multimédia"
		]
	},
	{
		id: 5,
		title: "Réseaux & Maintenance Informatique",
		abbreviation: "RES",
		description: "Assemblage, dépannage et administration réseau pour devenir le technicien informatique que chaque entreprise recherche.",
		duration: "8 mois + 2 mois de stage",
		diplome: "Certificat de Professionnalisation",
		price: "300 000 FCFA",
		image: "/assets/images/reseau.webp",
		icon: "🖥️",
		couleur: "blue",
		tags: ["Cours du jour", "Cours du soir"],
		debouches: [
			"Responsable informatique",
			"Technicien en maintenance",
			"Responsable S.A.V",
			"Sous-traitant pour entreprises",
			"Vendeur de matériel informatique",
			"Auto-emploi"
		],
		programme: [
			"Assemblage des ordinateurs",
			"Architecture des ordinateurs",
			"Réseaux et administration systèmes",
			"Diagnostic des périphériques et accessoires",
			"Consignes de sécurité",
			"Diagnostic et dépannage logiciel et matériel",
			"Systèmes d'exploitation"
		]
	},
	{
		id: 6,
		title: "Vidéosurveillance",
		abbreviation: "VID",
		description: "Installation, configuration et maintenance de systèmes de vidéosurveillance IP et analogique, du câblage à l'accès à distance.",
		duration: "8 mois + 2 mois de stage",
		diplome: "Certificat de Professionnalisation",
		price: "300 000 FCFA",
		image: "/assets/images/camera.webp",
		icon: "📹",
		couleur: "red",
		tags: ["Cours du jour", "Cours du soir"],
		debouches: [
			"Technicien en vidéosurveillance",
			"Installateur de systèmes de sécurité",
			"Responsable sécurité électronique",
			"Intégrateur de solutions de sécurité",
			"Auto-entrepreneur en sécurité",
			"Vendeur de matériel de sécurité",
			"Consultant en vidéosurveillance"
		],
		programme: [
			"Principes de base de la vidéosurveillance",
			"Types de caméras (analogiques, IP, PTZ, etc.)",
			"Installation des caméras et câblage",
			"Configuration des DVR / NVR",
			"Configuration des caméras IP",
			"Accès à distance (mobile & PC)",
			"Paramétrage des enregistrements",
			"Maintenance et dépannage",
			"Sécurité des systèmes",
			"Études de cas pratiques"
		]
	}
];
//#endregion
//#region resources/js/Pages/public/Formations.tsx
function Formations({ formationsEnLigne }) {
	const [activeTab, setActiveTab] = useState("presentiel");
	const [selectedFormation, setSelectedFormation] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const openModal = (formation) => {
		const scrollY = window.scrollY;
		const formationData = {
			...formation,
			debouches: formation.debouches || [],
			programme: formation.programme || []
		};
		setSelectedFormation(formationData);
		setModalOpen(true);
		document.body.style.overflow = "hidden";
		document.body.style.position = "fixed";
		document.body.style.top = `-${scrollY}px`;
		document.body.style.width = "100%";
	};
	const closeModal = () => {
		const scrollY = parseInt(document.body.style.top || "0") * -1;
		setModalOpen(false);
		setSelectedFormation(null);
		document.body.style.overflow = "";
		document.body.style.position = "";
		document.body.style.top = "";
		document.body.style.width = "";
		if (scrollY > 0) window.scrollTo(0, scrollY);
	};
	const formationNames = formationsEnLigne.map((f) => f.name).join(", ");
	const presentielNames = formationsPresentiel.map((f) => f.title).join(", ");
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		"name": "Formations professionnelles CAB Informatique",
		"description": "Découvrez toutes nos formations professionnelles en présentiel à Douala, Yaoundé, Bafoussam et en ligne. Infographie, réseaux, maintenance, vidéosurveillance, secrétariat, logistique.",
		"url": "https://cab-informatique.com/formations",
		"about": {
			"@type": "Thing",
			"name": "Formation professionnelle Cameroun"
		},
		"hasPart": [...formationsPresentiel.map((f) => ({
			"@type": "Course",
			"name": f.title,
			"description": f.description,
			"provider": {
				"@type": "EducationalOrganization",
				"name": "CAB Informatique"
			},
			"offers": {
				"@type": "Offer",
				"price": f.price.replace(/\s/g, ""),
				"priceCurrency": "XAF"
			}
		})), ...formationsEnLigne.map((f) => ({
			"@type": "Course",
			"name": f.name,
			"description": f.description,
			"provider": {
				"@type": "EducationalOrganization",
				"name": "CAB Informatique"
			},
			"offers": {
				"@type": "Offer",
				"price": f.frais.toString(),
				"priceCurrency": "XAF"
			}
		}))]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, { children: [
		/* @__PURE__ */ jsx("title", { children: "Formations professionnelles à Douala, Yaoundé, Bafoussam | CAB Informatique" }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: "Découvrez nos formations professionnelles en présentiel et en ligne à Douala, Yaoundé et Bafoussam. Infographie, réseaux, maintenance, vidéosurveillance, secrétariat, logistique. DQP reconnu."
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "keywords",
			content: `formation professionnelle Cameroun, formation Douala, formation Yaoundé, formation Bafoussam, ${formationNames}, ${presentielNames}, CAB Informatique, DQP`
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "robots",
			content: "index, follow, max-snippet:-1, max-image-preview:large"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:type",
			content: "website"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: "Formations professionnelles à Douala, Yaoundé, Bafoussam | CAB Informatique"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:description",
			content: "Découvrez nos formations professionnelles en présentiel et en ligne à Douala, Yaoundé et Bafoussam. Infographie, réseaux, maintenance, vidéosurveillance, secrétariat, logistique. DQP reconnu."
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image",
			content: "/assets/images/og-cab-informatique.jpg"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image:width",
			content: "1200"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image:height",
			content: "630"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:site_name",
			content: "CAB Informatique"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:locale",
			content: "fr_CM"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:url",
			content: "https://cab-informatique.com/formations"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:card",
			content: "summary_large_image"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:site",
			content: "@cabinfo"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:creator",
			content: "@cabinfo"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:title",
			content: "Formations professionnelles à Douala, Yaoundé, Bafoussam | CAB Informatique"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:description",
			content: "Découvrez nos formations professionnelles en présentiel et en ligne à Douala, Yaoundé et Bafoussam."
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:image",
			content: "/assets/images/og-cab-informatique.jpg"
		}),
		/* @__PURE__ */ jsx("script", {
			type: "application/ld+json",
			children: JSON.stringify(jsonLd)
		})
	] }), /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "relative pt-32 pb-16",
			style: { background: "linear-gradient(to right, #0a1f4d, #1a56db)" },
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ jsxs("h1", {
							className: "text-4xl md:text-5xl font-extrabold text-white",
							children: ["Nos ", /* @__PURE__ */ jsx("span", {
								className: "text-[#d21f2f]",
								children: "Formations"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-xl max-w-2xl mx-auto",
							style: { color: "rgba(255,255,255,0.8)" },
							children: "Découvrez nos formations professionnelles en présentiel ou en ligne"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 inline-flex rounded-xl p-1",
							style: {
								backgroundColor: "rgba(255,255,255,0.1)",
								backdropFilter: "blur(4px)"
							},
							children: [/* @__PURE__ */ jsx("button", {
								onClick: () => setActiveTab("presentiel"),
								className: "px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
								style: activeTab === "presentiel" ? {
									backgroundColor: "#ffffff",
									color: "#1a56db",
									boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
								} : { color: "rgba(255,255,255,0.7)" },
								children: "📍 Présentiel"
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => setActiveTab("enligne"),
								className: "px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
								style: activeTab === "enligne" ? {
									backgroundColor: "#ffffff",
									color: "#1a56db",
									boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
								} : { color: "rgba(255,255,255,0.7)" },
								children: "💻 En ligne"
							})]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16 bg-gray-50",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
				children: activeTab === "presentiel" ? /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
					children: formationsPresentiel.map((formation) => /* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative h-48 overflow-hidden",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: formation.image,
									alt: formation.title,
									className: "w-full h-full object-cover"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-cab-blue",
									children: formation.price
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "absolute bottom-3 left-3 bg-cab-blue/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1",
									children: [/* @__PURE__ */ jsx("span", { children: formation.icon }), formation.abbreviation]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-6",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "text-lg font-bold text-gray-900 mb-1",
									children: formation.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-500 mb-3",
									children: formation.duration
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-600 line-clamp-2 mb-4",
									children: formation.description
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex flex-wrap gap-1.5 mb-4",
									children: formation.tags.map((tag) => /* @__PURE__ */ jsx("span", {
										className: "px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs",
										children: tag
									}, tag))
								}),
								/* @__PURE__ */ jsxs("button", {
									onClick: () => openModal({
										...formation,
										type: "presentiel"
									}),
									className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-all group",
									children: ["Voir les détails", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })]
								})
							]
						})]
					}, formation.id))
				}) : formationsEnLigne && formationsEnLigne.length > 0 ? /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
					children: formationsEnLigne.map((formation) => /* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative h-48 overflow-hidden",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: formation.image_url || "/assets/images/placeholder.jpg",
									alt: formation.name || "Formation",
									className: "w-full h-full object-cover",
									onError: (e) => {
										e.target.src = "/assets/images/placeholder.jpg";
									}
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-cab-blue",
									children: formation.frais_formatted || "0 FCFA"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute bottom-3 left-3 bg-cab-blue/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white",
									children: formation.abbreviation || "N/A"
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-6",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "text-lg font-bold text-gray-900 mb-1",
									children: formation.name || "Formation sans nom"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-500 mb-3",
									children: formation.duration || "Durée non définie"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-600 line-clamp-2 mb-4",
									children: formation.description || "Description non disponible"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap gap-1.5 mb-4",
									children: [/* @__PURE__ */ jsx("span", {
										className: "px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs",
										children: formation.diplome || "Non défini"
									}), /* @__PURE__ */ jsx("span", {
										className: "px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs",
										children: "En ligne"
									})]
								}),
								/* @__PURE__ */ jsxs("button", {
									onClick: () => openModal({
										...formation,
										type: "enligne"
									}),
									className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-all group",
									children: ["Voir les détails", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })]
								})
							]
						})]
					}, formation.id))
				}) : /* @__PURE__ */ jsxs("div", {
					className: "text-center py-16",
					children: [
						/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }),
						/* @__PURE__ */ jsx("p", {
							className: "text-gray-500 text-lg",
							children: "Aucune formation en ligne disponible pour le moment"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-gray-400 text-sm mt-2",
							children: "Revenez plus tard pour découvrir nos nouvelles formations"
						})
					]
				})
			})
		}),
		modalOpen && selectedFormation && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
			onClick: closeModal,
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-12 h-12 rounded-xl bg-cab-blue/10 text-cab-blue flex items-center justify-center text-2xl",
							children: selectedFormation.icon || "📚"
						}), /* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold text-gray-900 notranslate",
							children: selectedFormation.title || selectedFormation.name
						})]
					}), /* @__PURE__ */ jsx("button", {
						onClick: closeModal,
						className: "p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600",
						children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6" })
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-6 space-y-6",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "rounded-xl overflow-hidden",
							children: /* @__PURE__ */ jsx("img", {
								src: selectedFormation.image || selectedFormation.image_url || "/assets/images/placeholder.jpg",
								alt: selectedFormation.title || selectedFormation.name || "Formation",
								className: "w-full h-64 object-cover",
								onError: (e) => {
									e.target.src = "/assets/images/placeholder.jpg";
								}
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 md:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-3 text-center notranslate",
									children: [
										/* @__PURE__ */ jsx(ClockIcon, { className: "w-5 h-5 text-cab-blue mx-auto mb-1" }),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Durée"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold text-gray-900",
											children: selectedFormation.duration || "Non définie"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-3 text-center notranslate",
									children: [
										/* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5 text-cab-blue mx-auto mb-1" }),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Diplôme"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold text-gray-900",
											children: selectedFormation.diplome || "Non défini"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-gray-50 rounded-xl p-3 text-center notranslate",
									children: [
										/* @__PURE__ */ jsx(CurrencyDollarIcon, { className: "w-5 h-5 text-cab-blue mx-auto mb-1" }),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: "Frais"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold text-gray-900",
											children: selectedFormation.price || selectedFormation.frais_formatted || "0 FCFA"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "notranslate",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-gray-900 mb-2",
								children: "📌 Description"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-600 leading-relaxed",
								children: selectedFormation.description || "Description non disponible"
							})]
						}),
						selectedFormation.programme && /* @__PURE__ */ jsxs("div", {
							className: "notranslate",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-gray-900 mb-2",
								children: "📋 Programme"
							}), Array.isArray(selectedFormation.programme) ? /* @__PURE__ */ jsx("ul", {
								className: "grid grid-cols-1 gap-1.5",
								children: selectedFormation.programme.map((item, index) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-2 text-sm text-gray-600",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-cab-blue mt-0.5",
										children: "▸"
									}), item]
								}, index))
							}) : /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-600 leading-relaxed whitespace-pre-line",
								children: selectedFormation.programme
							})]
						}),
						selectedFormation.debouches && /* @__PURE__ */ jsxs("div", {
							className: "notranslate",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-gray-900 mb-2",
								children: "🎯 Débouchés"
							}), Array.isArray(selectedFormation.debouches) ? /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: selectedFormation.debouches.map((item, index) => /* @__PURE__ */ jsx("span", {
									className: "px-3 py-1.5 bg-blue-50 text-cab-blue rounded-full text-sm font-medium",
									children: item
								}, index))
							}) : /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-600 leading-relaxed whitespace-pre-line",
								children: selectedFormation.debouches
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100",
							children: [
								selectedFormation.lien_externe && selectedFormation.lien_label && /* @__PURE__ */ jsx("a", {
									href: selectedFormation.lien_externe,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex-1 text-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors notranslate",
									children: selectedFormation.lien_label
								}),
								/* @__PURE__ */ jsxs(Link, {
									href: `/preinscription?formation=${selectedFormation.id}&type=formation`,
									className: "flex-1 text-center px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 notranslate flex items-center justify-center gap-2",
									style: {
										background: "linear-gradient(to right, #1a56db, rgba(26,86,219,0.8))",
										boxShadow: "0 10px 15px -3px rgba(26,86,219,0.25)"
									},
									children: [/* @__PURE__ */ jsx(UserPlusIcon, { className: "w-5 h-5" }), "📝 Me pré-inscrire"]
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: closeModal,
									className: "px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors notranslate",
									children: "Fermer"
								})
							]
						})
					]
				})]
			})
		}, `modal-${selectedFormation.id || selectedFormation.title || Date.now()}`)
	] })] });
}
//#endregion
export { Formations as default };

//# sourceMappingURL=Formations-DbwImjo2.js.map