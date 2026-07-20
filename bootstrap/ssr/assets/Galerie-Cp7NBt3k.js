import { t as PublicLayout } from "./PublicLayout-DC7qBDGF.js";
import { Head } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ArrowDownTrayIcon, ChevronLeftIcon, ChevronRightIcon, DocumentTextIcon, PhotoIcon, VideoCameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/public/Galerie.tsx
function Galerie({ medias }) {
	const [selectedMedia, setSelectedMedia] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	useEffect(() => {
		if (selectedMedia) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [selectedMedia]);
	const openLightbox = (media, index) => {
		setSelectedMedia(media);
		setSelectedIndex(index);
	};
	const closeLightbox = () => {
		setSelectedMedia(null);
		setSelectedIndex(-1);
	};
	const navigateLightbox = (direction) => {
		if (selectedIndex === -1 || medias.length === 0) return;
		const newIndex = direction === "prev" ? (selectedIndex - 1 + medias.length) % medias.length : (selectedIndex + 1) % medias.length;
		setSelectedMedia(medias[newIndex]);
		setSelectedIndex(newIndex);
	};
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (!selectedMedia) return;
			if (e.key === "Escape") closeLightbox();
			if (e.key === "ArrowLeft") navigateLightbox("prev");
			if (e.key === "ArrowRight") navigateLightbox("next");
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		selectedMedia,
		selectedIndex,
		medias
	]);
	const getTypeIcon = (media) => {
		if (media.is_image) return /* @__PURE__ */ jsx(PhotoIcon, { className: "w-6 h-6 text-blue-500" });
		if (media.is_video) return /* @__PURE__ */ jsx(VideoCameraIcon, { className: "w-6 h-6 text-red-500" });
		return /* @__PURE__ */ jsx(DocumentTextIcon, { className: "w-6 h-6 text-gray-500" });
	};
	const getTypeEmoji = (media) => {
		if (media.is_image) return "📷";
		if (media.is_video) return "🎬";
		return "📄";
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Galerie - CAB Informatique" }), /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "relative pt-32 pb-16",
			style: { backgroundColor: "#0A1F4D" },
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [/* @__PURE__ */ jsxs("h1", {
						className: "text-4xl md:text-5xl font-extrabold text-white",
						children: ["Notre ", /* @__PURE__ */ jsx("span", {
							className: "text-cab-red",
							children: "Galerie"
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-4 text-xl text-white/80 max-w-2xl mx-auto",
						children: "Découvrez nos moments forts en images et vidéos"
					})]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16 bg-gray-50",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
				children: medias.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "text-center py-16",
					children: [/* @__PURE__ */ jsx(PhotoIcon, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }), /* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-lg",
						children: "Aucun média disponible pour le moment"
					})]
				}) : /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
					children: medias.map((media, index) => /* @__PURE__ */ jsxs("div", {
						onClick: () => openLightbox(media, index),
						className: "group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100",
						children: [
							media.is_image ? /* @__PURE__ */ jsx("img", {
								src: media.url,
								alt: media.titre,
								className: "w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500",
								loading: "lazy"
							}) : media.is_video ? /* @__PURE__ */ jsx("video", {
								src: media.url,
								className: "w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500",
								muted: true
							}) : /* @__PURE__ */ jsx("div", {
								className: "w-full h-56 bg-gray-100 flex items-center justify-center",
								children: getTypeIcon(media)
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "text-white font-semibold text-sm line-clamp-1",
										children: media.titre
									}),
									media.description && /* @__PURE__ */ jsx("p", {
										className: "text-white/80 text-xs line-clamp-1",
										children: media.description
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-white/60 text-xs mt-1",
										children: media.type_label
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg",
								children: /* @__PURE__ */ jsxs("span", {
									className: "text-white text-xs flex items-center gap-1",
									children: [getTypeEmoji(media), media.type_label]
								})
							})
						]
					}, media.id))
				})
			})
		}),
		selectedMedia && /* @__PURE__ */ jsxs("div", {
			className: "fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center",
			onClick: closeLightbox,
			children: [
				/* @__PURE__ */ jsx("button", {
					onClick: closeLightbox,
					className: "absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 z-10",
					"aria-label": "Fermer",
					children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-8 h-8" })
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: (e) => {
						e.stopPropagation();
						navigateLightbox("prev");
					},
					className: "absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10",
					"aria-label": "Précédent",
					children: /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "w-8 h-8" })
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: (e) => {
						e.stopPropagation();
						navigateLightbox("next");
					},
					className: "absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10",
					"aria-label": "Suivant",
					children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: "w-8 h-8" })
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "max-w-5xl max-h-[90vh] p-4",
					onClick: (e) => e.stopPropagation(),
					children: [selectedMedia.is_image ? /* @__PURE__ */ jsx("img", {
						src: selectedMedia.url,
						alt: selectedMedia.titre,
						className: "max-w-full max-h-[80vh] object-contain rounded-xl",
						loading: "lazy"
					}) : selectedMedia.is_video ? /* @__PURE__ */ jsx("video", {
						src: selectedMedia.url,
						controls: true,
						className: "max-w-full max-h-[80vh] rounded-xl",
						autoPlay: true,
						muted: true
					}) : /* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-12 text-center max-w-md",
						children: [
							/* @__PURE__ */ jsx(DocumentTextIcon, { className: "w-24 h-24 text-gray-400 mx-auto mb-4" }),
							/* @__PURE__ */ jsx("h3", {
								className: "text-xl font-bold text-gray-900",
								children: selectedMedia.titre
							}),
							selectedMedia.description && /* @__PURE__ */ jsx("p", {
								className: "text-gray-600 mt-2",
								children: selectedMedia.description
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-400 mt-2",
								children: selectedMedia.type_label
							}),
							/* @__PURE__ */ jsxs("a", {
								href: selectedMedia.url,
								download: true,
								className: "inline-flex items-center gap-2 mt-4 px-4 py-2 bg-cab-blue text-white rounded-xl hover:bg-cab-dark transition-colors",
								children: [/* @__PURE__ */ jsx(ArrowDownTrayIcon, { className: "w-5 h-5" }), "Télécharger"]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "text-center text-white/50 text-sm mt-4",
						children: [
							selectedMedia.titre,
							" • ",
							selectedMedia.type_label,
							" • ",
							selectedMedia.taille_formatted
						]
					})]
				})
			]
		})
	] })] });
}
//#endregion
export { Galerie as default };

//# sourceMappingURL=Galerie-Cp7NBt3k.js.map