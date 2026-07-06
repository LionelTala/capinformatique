import { Link, router, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AcademicCapIcon, ArrowLeftOnRectangleIcon, Bars3Icon, BellIcon, BookOpenIcon, CalendarIcon, CheckIcon, ChevronDownIcon, ClipboardDocumentListIcon, HomeIcon, PhotoIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
//#region resources/js/Components/Notifications/NotificationDropdown.tsx
var NotificationDropdown = ({ notifications, onMarkAsRead, onMarkAllAsRead, onClose }) => {
	const handleClick = (notification) => {
		if (!notification.read_at) {
			router.post(`/admin/notifications/${notification.id}/read`, {}, { preserveScroll: true });
			onMarkAsRead(notification.id);
		}
		onClose();
	};
	const handleMarkAllAsRead = () => {
		router.post("/admin/notifications/read-all", {}, { preserveScroll: true });
		onMarkAllAsRead();
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50 max-h-96 overflow-y-auto",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "text-sm font-semibold text-gray-900",
				children: "Notifications"
			}), /* @__PURE__ */ jsxs("button", {
				onClick: handleMarkAllAsRead,
				className: "text-xs text-cab-blue hover:text-cab-dark flex items-center gap-1",
				children: [/* @__PURE__ */ jsx(CheckIcon, { className: "w-4 h-4" }), "Tout marquer comme lu"]
			})]
		}), notifications.length === 0 ? /* @__PURE__ */ jsx("p", {
			className: "text-sm text-gray-500 text-center py-8",
			children: "Aucune notification"
		}) : /* @__PURE__ */ jsx("div", {
			className: "divide-y divide-gray-100",
			children: notifications.map((notification) => /* @__PURE__ */ jsx(Link, {
				href: notification.link || "#",
				onClick: () => handleClick(notification),
				className: `block px-4 py-3 hover:bg-gray-50 transition-colors ${!notification.read_at ? "bg-blue-50/50" : ""}`,
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-start gap-2",
					children: [!notification.read_at && /* @__PURE__ */ jsx("span", { className: "w-2 h-2 mt-1.5 rounded-full bg-cab-blue flex-shrink-0" }), /* @__PURE__ */ jsxs("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium text-gray-900",
								children: notification.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-500 mt-0.5",
								children: notification.message
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-400 mt-1",
								children: notification.created_at
							})
						]
					})]
				})
			}, notification.id))
		})]
	});
};
//#endregion
//#region resources/js/Components/Notifications/NotificationBell.tsx
var NotificationBell = () => {
	var _props$unreadNotifica;
	const { props } = usePage();
	const [isOpen, setIsOpen] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const dropdownRef = useRef(null);
	const unreadCount = (_props$unreadNotifica = props.unreadNotificationsCount) !== null && _props$unreadNotifica !== void 0 ? _props$unreadNotifica : 0;
	useEffect(() => {
		window.Echo.private("admin-notifications").listen(".notification.new", (data) => {
			setNotifications((prev) => {
				if (prev.some((n) => n.id === data.id)) return prev;
				return [data, ...prev];
			});
			router.reload({ only: ["unreadNotificationsCount"] });
		});
		return () => {
			window.Echo.leave("admin-notifications");
		};
	}, []);
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const fetchNotifications = async () => {
		const data = await (await fetch("/admin/notifications", { headers: { Accept: "application/json" } })).json();
		setNotifications(data.notifications);
	};
	const toggleDropdown = () => {
		if (!isOpen) fetchNotifications();
		setIsOpen(!isOpen);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		ref: dropdownRef,
		children: [/* @__PURE__ */ jsxs("button", {
			onClick: toggleDropdown,
			className: "relative p-2 rounded-lg hover:bg-gray-100 transition-colors",
			children: [/* @__PURE__ */ jsx(BellIcon, { className: "w-6 h-6 text-gray-600" }), unreadCount > 0 && /* @__PURE__ */ jsx("span", {
				className: "absolute -top-1 -right-1 bg-cab-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center",
				children: unreadCount > 9 ? "9+" : unreadCount
			})]
		}), isOpen && /* @__PURE__ */ jsx(NotificationDropdown, {
			notifications,
			onMarkAsRead: (id) => {
				setNotifications((prev) => prev.map((n) => n.id === id ? {
					...n,
					read_at: (/* @__PURE__ */ new Date()).toISOString()
				} : n));
				router.reload({ only: ["unreadNotificationsCount"] });
			},
			onMarkAllAsRead: () => {
				setNotifications((prev) => prev.map((n) => ({
					...n,
					read_at: (/* @__PURE__ */ new Date()).toISOString()
				})));
				router.reload({ only: ["unreadNotificationsCount"] });
			},
			onClose: () => setIsOpen(false)
		})]
	});
};
//#endregion
//#region resources/js/Components/Layouts/AdminLayout.tsx
var AdminLayout = ({ children, title = "Tableau de bord" }) => {
	var _props$unreadNotifica;
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const { props, url } = usePage();
	const user = props.auth.user;
	const unreadCount = (_props$unreadNotifica = props.unreadNotificationsCount) !== null && _props$unreadNotifica !== void 0 ? _props$unreadNotifica : 0;
	const canManageUsers = (user === null || user === void 0 ? void 0 : user.role) === "super_admin" || (user === null || user === void 0 ? void 0 : user.role) === "admin_centre";
	const menuItems = [{
		label: "Tableau de bord",
		href: "/admin/dashboard",
		icon: /* @__PURE__ */ jsx(HomeIcon, { className: "w-5 h-5" })
	}];
	if (canManageUsers) menuItems.push({
		label: "Utilisateurs",
		href: "/admin/users",
		icon: /* @__PURE__ */ jsx(UserGroupIcon, { className: "w-5 h-5" })
	});
	menuItems.push({
		label: "Hero Slides",
		href: "/admin/hero-slides",
		icon: /* @__PURE__ */ jsx(PhotoIcon, { className: "w-5 h-5" })
	}, {
		label: "Formations",
		href: "/admin/formations",
		icon: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5" })
	}, {
		label: "Vagues",
		href: "/admin/vagues",
		icon: /* @__PURE__ */ jsx(CalendarIcon, { className: "w-5 h-5" })
	}, {
		label: "Certifications",
		href: "/admin/certifications",
		icon: /* @__PURE__ */ jsx(AcademicCapIcon, { className: "w-5 h-5" })
	}, {
		label: "Cours",
		href: "/admin/cours",
		icon: /* @__PURE__ */ jsx(BookOpenIcon, { className: "w-5 h-5" })
	}, {
		label: "Candidatures",
		href: "/admin/candidatures",
		icon: /* @__PURE__ */ jsx(ClipboardDocumentListIcon, { className: "w-5 h-5" })
	});
	const getUserInitials = (user) => {
		if (!user) return "?";
		return user.name.charAt(0).toUpperCase();
	};
	const getRoleLabel = (role) => {
		return {
			super_admin: "Super Administrateur",
			admin_centre: "Admin Centre",
			admin: "Administrateur",
			student_online: "Étudiant en ligne",
			student_certif: "Étudiant certification"
		}[role] || role;
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-gray-50",
		children: [
			/* @__PURE__ */ jsx("nav", {
				className: "fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between px-4 py-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setIsSidebarOpen(!isSidebarOpen),
							className: "lg:hidden p-2 rounded-lg hover:bg-gray-100",
							children: isSidebarOpen ? /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6 text-gray-600" }) : /* @__PURE__ */ jsx(Bars3Icon, { className: "w-6 h-6 text-gray-600" })
						}), /* @__PURE__ */ jsxs(Link, {
							href: "/admin/dashboard",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("img", {
								src: "/assets/images/logo.jpeg",
								alt: "CAB",
								className: "h-8 w-8 rounded-full object-cover"
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-lg font-bold text-gray-900 hidden sm:block",
								children: ["CAB ", /* @__PURE__ */ jsx("span", {
									className: "text-cab-red",
									children: "Admin"
								})]
							})]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(NotificationBell, {}), /* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsxs("button", {
								onClick: () => setIsUserMenuOpen(!isUserMenuOpen),
								className: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "w-8 h-8 rounded-full bg-cab-blue text-white flex items-center justify-center text-sm font-semibold",
										children: getUserInitials(user)
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-sm font-medium text-gray-700 hidden sm:block",
										children: (user === null || user === void 0 ? void 0 : user.name) || "Utilisateur"
									}),
									/* @__PURE__ */ jsx(ChevronDownIcon, { className: "w-4 h-4 text-gray-400" })
								]
							}), isUserMenuOpen && user && /* @__PURE__ */ jsxs("div", {
								className: "absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "px-4 py-2 border-b border-gray-100",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-medium text-gray-900",
											children: user.name
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-gray-500",
											children: user.email
										}),
										/* @__PURE__ */ jsx("span", {
											className: "inline-block mt-1 px-2 py-0.5 bg-blue-100 text-cab-blue rounded-full text-xs font-medium",
											children: getRoleLabel(user.role)
										})
									]
								}), /* @__PURE__ */ jsxs(Link, {
									href: "/logout",
									method: "post",
									as: "button",
									className: "flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors",
									children: [/* @__PURE__ */ jsx(ArrowLeftOnRectangleIcon, { className: "w-4 h-4" }), "Déconnexion"]
								})]
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("aside", {
				className: `
                    fixed top-16 left-0 bottom-0 z-30 w-64 bg-white border-r border-gray-200
                    transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `,
				children: /* @__PURE__ */ jsxs("nav", {
					className: "p-4 space-y-1",
					children: [menuItems.map((item) => {
						const isCandidatures = item.href === "/admin/candidatures";
						const isActive = url === item.href || url.startsWith(item.href + "/");
						return /* @__PURE__ */ jsxs(Link, {
							href: item.href,
							className: `
                                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                                    transition-colors duration-200
                                    ${isActive ? "bg-cab-blue text-white" : "text-gray-600 hover:bg-gray-100 hover:text-cab-blue"}
                                `,
							children: [
								item.icon,
								/* @__PURE__ */ jsx("span", {
									className: "flex-1",
									children: item.label
								}),
								isCandidatures && unreadCount > 0 && /* @__PURE__ */ jsx("span", {
									className: `text-xs font-bold rounded-full px-2 py-0.5 ${isActive ? "bg-white text-cab-blue" : "bg-cab-red text-white"}`,
									children: unreadCount > 9 ? "9+" : unreadCount
								})
							]
						}, item.href);
					}), /* @__PURE__ */ jsx("div", {
						className: "pt-4 mt-4 border-t border-gray-200",
						children: /* @__PURE__ */ jsxs(Link, {
							href: "/logout",
							method: "post",
							as: "button",
							className: "flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors",
							children: [/* @__PURE__ */ jsx(ArrowLeftOnRectangleIcon, { className: "w-5 h-5" }), "Déconnexion"]
						})
					})]
				})
			}),
			isSidebarOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-20 bg-black/50 lg:hidden",
				onClick: () => setIsSidebarOpen(false)
			}),
			/* @__PURE__ */ jsx("main", {
				className: "lg:ml-64 pt-16",
				children: /* @__PURE__ */ jsxs("div", {
					className: "p-4 md:p-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-6",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "text-2xl font-bold text-gray-900",
							children: title
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-500",
							children: "Bienvenue sur votre espace d'administration"
						})]
					}), children]
				})
			})
		]
	});
};
//#endregion
export { AdminLayout as t };

//# sourceMappingURL=AdminLayout-oh2Gvric.js.map