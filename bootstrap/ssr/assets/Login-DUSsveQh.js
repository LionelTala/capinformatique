import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";
//#region resources/js/Pages/Auth/Login.tsx
function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const { data, setData, post, processing, errors } = useForm({
		email: "",
		password: "",
		remember: false
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		post("/login");
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Connexion - CAB Informatique" }), /* @__PURE__ */ jsx("div", {
		className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md w-full space-y-8",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ jsx(Link, {
							href: "/",
							className: "inline-block",
							children: /* @__PURE__ */ jsx("img", {
								src: "/assets/images/logo.jpeg",
								alt: "CAB Informatique",
								className: "h-16 w-auto mx-auto"
							})
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-6 text-3xl font-extrabold text-gray-900",
							children: "Connexion"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 text-sm text-gray-600",
							children: "Connectez-vous à votre espace CAB Informatique"
						})
					]
				}),
				/* @__PURE__ */ jsxs("form", {
					className: "mt-8 space-y-6",
					onSubmit: handleSubmit,
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "email",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Email"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("div", {
										className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
										children: /* @__PURE__ */ jsx(EnvelopeIcon, { className: "h-5 w-5 text-gray-400" })
									}), /* @__PURE__ */ jsx("input", {
										id: "email",
										type: "email",
										value: data.email,
										onChange: (e) => setData("email", e.target.value),
										className: "appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
										placeholder: "exemple@email.com",
										required: true
									})]
								}),
								errors.email && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.email
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "password",
									className: "block text-sm font-medium text-gray-700 mb-1",
									children: "Mot de passe"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
											children: /* @__PURE__ */ jsx(LockClosedIcon, { className: "h-5 w-5 text-gray-400" })
										}),
										/* @__PURE__ */ jsx("input", {
											id: "password",
											type: showPassword ? "text" : "password",
											value: data.password,
											onChange: (e) => setData("password", e.target.value),
											className: "appearance-none block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors",
											placeholder: "••••••••",
											required: true
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setShowPassword(!showPassword),
											className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
											children: showPassword ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "h-5 w-5" })
										})
									]
								}),
								errors.password && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-red-600",
									children: errors.password
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center",
									children: [/* @__PURE__ */ jsx("input", {
										id: "remember",
										type: "checkbox",
										checked: data.remember,
										onChange: (e) => setData("remember", e.target.checked),
										className: "h-4 w-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
									}), /* @__PURE__ */ jsx("label", {
										htmlFor: "remember",
										className: "ml-2 block text-sm text-gray-700",
										children: "Se souvenir de moi"
									})]
								}), /* @__PURE__ */ jsx(Link, {
									href: "#",
									className: "text-sm font-medium text-cab-blue hover:text-cab-dark",
									children: "Mot de passe oublié ?"
								})]
							})
						]
					}), /* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: processing,
						className: "group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-cab-blue hover:bg-cab-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cab-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed",
						children: processing ? /* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsxs("svg", {
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
							}), "Connexion en cours..."]
						}) : "Se connecter"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "text-center",
					children: /* @__PURE__ */ jsx(Link, {
						href: "/",
						className: "text-sm text-gray-500 hover:text-cab-blue transition-colors",
						children: "← Retour à l'accueil"
					})
				})
			]
		})
	})] });
}
//#endregion
export { Login as default };

//# sourceMappingURL=Login-DUSsveQh.js.map