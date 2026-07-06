import { t as useScroll } from "./useScroll-CJAFr_ZD.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
//#region resources/js/pages/public/Components/Navigation.tsx
var Navigation = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { isScrolled } = useScroll(50);
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
		document.body.style.overflow = isMobileMenuOpen ? "" : "hidden";
	};
	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
		document.body.style.overflow = "";
	};
	const scrollTo = (sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) element.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
		closeMobileMenu();
	};
	const navLinks = [
		{
			label: "Formations",
			href: "/formations",
			type: "link"
		},
		{
			label: "Pourquoi CAB",
			href: "#avantages",
			type: "anchor"
		},
		{
			label: "Campus",
			href: "#campus",
			type: "anchor"
		},
		{
			label: "Contact",
			href: "#contact",
			type: "anchor"
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("a", {
			href: "#contenu-principal",
			className: "sr-only focus:not-sr-only focus:fixed focus:top-16 focus:left-4 focus:z-[9999] focus:bg-white focus:p-4 focus:rounded-xl focus:shadow-lg focus:text-cab-blue",
			children: "Aller au contenu principal"
		}),
		/* @__PURE__ */ jsx("nav", {
			className: `
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-4"}
        `,
			role: "navigation",
			"aria-label": "Navigation principale",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between",
				children: [
					/* @__PURE__ */ jsx(Link, {
						href: "/",
						className: "flex items-center shrink-0",
						"aria-label": "CAB Informatique - Accueil",
						children: /* @__PURE__ */ jsx("img", {
							src: "/assets/images/logo.jpeg",
							alt: "CAB Informatique",
							className: "h-12 w-auto object-contain",
							loading: "lazy"
						})
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "hidden md:flex items-center gap-8 list-none",
						role: "menubar",
						children: navLinks.map((link) => /* @__PURE__ */ jsx("li", {
							role: "none",
							children: link.type === "link" ? /* @__PURE__ */ jsx(Link, {
								href: link.href,
								className: `
                      text-sm font-medium transition-colors relative
                      after:content-[''] after:absolute after:bottom-[-4px] after:left-0
                      after:w-0 after:h-0.5 after:bg-cab-blue after:transition-all after:duration-300
                      hover:after:w-full
                      ${isScrolled ? "text-gray-600 hover:text-cab-blue" : "text-white/90 hover:text-white"}
                    `,
								role: "menuitem",
								children: link.label
							}) : /* @__PURE__ */ jsx("button", {
								onClick: () => scrollTo(link.href.replace("#", "")),
								className: `
                      text-sm font-medium transition-colors relative
                      after:content-[''] after:absolute after:bottom-[-4px] after:left-0
                      after:w-0 after:h-0.5 after:bg-cab-blue after:transition-all after:duration-300
                      hover:after:w-full
                      ${isScrolled ? "text-gray-600 hover:text-cab-blue" : "text-white/90 hover:text-white"}
                    `,
								role: "menuitem",
								children: link.label
							})
						}, link.label))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ jsx("button", {
								className: `
                hidden md:inline-flex items-center gap-2 px-5 py-2.5
                rounded-full text-sm font-semibold
                border-2 transition-all cursor-pointer
                ${isScrolled ? "border-gray-200 text-gray-600 hover:border-cab-blue hover:text-cab-blue hover:bg-blue-50" : "border-white/30 text-white hover:border-white hover:bg-white/10"}
              `,
								"aria-label": "Se connecter",
								children: "🔑 Connexion"
							}),
							/* @__PURE__ */ jsx(Link, {
								href: "/certification",
								className: "inline-flex items-center gap-2 px-5 py-2.5 bg-cab-blue text-white rounded-full text-sm font-semibold hover:bg-cab-dark hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer no-underline",
								children: "📝 Certification"
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: toggleMobileMenu,
								className: "md:hidden p-1 bg-none border-none cursor-pointer",
								"aria-label": isMobileMenuOpen ? "Fermer le menu mobile" : "Ouvrir le menu mobile",
								"aria-expanded": isMobileMenuOpen,
								children: isMobileMenuOpen ? /* @__PURE__ */ jsx(XMarkIcon, { className: `w-7 h-7 ${isScrolled ? "text-gray-900" : "text-white"}` }) : /* @__PURE__ */ jsx(Bars3Icon, { className: `w-7 h-7 ${isScrolled ? "text-gray-900" : "text-white"}` })
							})
						]
					})
				]
			})
		}),
		isMobileMenuOpen && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden",
			onClick: closeMobileMenu,
			"aria-hidden": "true"
		}), /* @__PURE__ */ jsxs("div", {
			className: "fixed top-0 right-0 z-40 w-full max-w-sm h-full bg-white shadow-2xl md:hidden animate-slide-in-right",
			role: "menu",
			"aria-label": "Menu mobile",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between p-4 border-b border-gray-100",
				children: [/* @__PURE__ */ jsx("img", {
					src: "/assets/images/logo.jpeg",
					alt: "CAB Informatique",
					className: "h-10 w-auto object-contain",
					loading: "lazy"
				}), /* @__PURE__ */ jsx("button", {
					onClick: closeMobileMenu,
					className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
					"aria-label": "Fermer le menu",
					children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6 text-gray-900" })
				})]
			}), /* @__PURE__ */ jsxs("ul", {
				className: "flex flex-col p-4 space-y-2 list-none",
				children: [
					navLinks.map((link) => /* @__PURE__ */ jsx("li", {
						role: "none",
						children: link.type === "link" ? /* @__PURE__ */ jsx(Link, {
							href: link.href,
							onClick: closeMobileMenu,
							className: "block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-cab-blue transition-colors",
							role: "menuitem",
							children: link.label
						}) : /* @__PURE__ */ jsx("button", {
							onClick: () => scrollTo(link.href.replace("#", "")),
							className: "block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-cab-blue transition-colors",
							role: "menuitem",
							children: link.label
						})
					}, link.label)),
					/* @__PURE__ */ jsx("li", {
						role: "none",
						children: /* @__PURE__ */ jsx("button", {
							onClick: () => {
								closeMobileMenu();
							},
							className: "w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-cab-blue transition-colors",
							role: "menuitem",
							children: "🔑 Connexion"
						})
					}),
					/* @__PURE__ */ jsx("li", {
						role: "none",
						children: /* @__PURE__ */ jsx(Link, {
							href: "/certification",
							onClick: closeMobileMenu,
							className: "block w-full text-center px-4 py-3 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors",
							role: "menuitem",
							children: "📝 Certification"
						})
					})
				]
			})]
		})] })
	] });
};
//#endregion
//#region resources/js/Components/PublicLayout.tsx
var PublicLayout = ({ children }) => {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Navigation, {}), /* @__PURE__ */ jsx("main", {
		id: "contenu-principal",
		className: "pt-16",
		children
	})] });
};
//#endregion
//#region resources/js/Pages/Home.tsx
function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, { children: [/* @__PURE__ */ jsx("title", { children: "CAB Informatique - Centre de Formation Professionnelle" }), /* @__PURE__ */ jsx("meta", {
		name: "description",
		content: "CAB Informatique forme aux métiers de l'informatique depuis 22 ans."
	})] }), /* @__PURE__ */ jsx(PublicLayout, { children: /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-gray-50",
		children: [
			/* @__PURE__ */ jsx("section", {
				className: "pt-20 pb-16 bg-cab-blue",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsx("h1", {
						className: "text-4xl font-bold text-white",
						children: "Bienvenue à CAB Informatique"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-white/80 mt-4",
						children: "Notre désir, Votre Professionnalisme"
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "avantages",
				className: "py-16",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-3xl font-bold",
						children: "Pourquoi CAB"
					})
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "campus",
				className: "py-16 bg-white",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-3xl font-bold",
						children: "Nos Campus"
					})
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "contact",
				className: "py-16 bg-gray-50",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-3xl font-bold",
						children: "Contact"
					})
				})
			})
		]
	}) })] });
}
//#endregion
export { Home as default };

//# sourceMappingURL=Home-C4jcrplr.js.map