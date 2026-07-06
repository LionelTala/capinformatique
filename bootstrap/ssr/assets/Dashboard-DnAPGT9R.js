import { t as AdminLayout } from "./AdminLayout-oh2Gvric.js";
import { Head } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Dashboard.tsx
function Dashboard({ stats, user }) {
	const statsCards = [
		{
			label: "Total utilisateurs",
			value: stats.total_users,
			icon: "👥",
			color: "bg-blue-500"
		},
		{
			label: "Administrateurs",
			value: stats.total_admins,
			icon: "🛡️",
			color: "bg-purple-500"
		},
		{
			label: "Étudiants",
			value: stats.total_students,
			icon: "🎓",
			color: "bg-green-500"
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Tableau de bord - Admin" }), /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Tableau de bord",
		children: [/* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6",
			children: statsCards.map((stat) => /* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500",
						children: stat.label
					}), /* @__PURE__ */ jsx("p", {
						className: "text-2xl font-bold text-gray-900 mt-1",
						children: stat.value
					})] }), /* @__PURE__ */ jsx("div", {
						className: `${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`,
						children: stat.icon
					})]
				})
			}, stat.label))
		}), /* @__PURE__ */ jsxs("div", {
			className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-lg font-semibold text-gray-900 mb-4",
				children: "Informations de connexion"
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-2 text-sm",
				children: [
					/* @__PURE__ */ jsxs("p", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-gray-500",
							children: "Nom :"
						}),
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "font-medium text-gray-900",
							children: user.name
						})
					] }),
					/* @__PURE__ */ jsxs("p", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-gray-500",
							children: "Email :"
						}),
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "font-medium text-gray-900",
							children: user.email
						})
					] }),
					/* @__PURE__ */ jsxs("p", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-gray-500",
							children: "Rôle :"
						}),
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "px-2 py-0.5 bg-blue-100 text-cab-blue rounded-full text-xs font-medium",
							children: user.role
						})
					] })
				]
			})]
		})]
	})] });
}
//#endregion
export { Dashboard as default };

//# sourceMappingURL=Dashboard-DnAPGT9R.js.map