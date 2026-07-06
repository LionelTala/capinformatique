import { useEffect, useState } from "react";
//#region resources/js/hooks/useScroll.ts
var useScroll = (threshold = 50) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [scrollY, setScrollY] = useState(0);
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setScrollY(currentScrollY);
			setIsScrolled(currentScrollY > threshold);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, [threshold]);
	return {
		isScrolled,
		scrollY
	};
};
//#endregion
export { useScroll as t };

//# sourceMappingURL=useScroll-CJAFr_ZD.js.map