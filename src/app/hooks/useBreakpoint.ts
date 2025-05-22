import { useEffect, useState } from 'react';

export default function useBreakpoint(breakpoint: number): boolean {
	const [isMobile, setMobile] = useState(false);

	useEffect(() => {
		const onResize = () => {
			const screenSizeIsMobile = document.body.getBoundingClientRect().width <= breakpoint;
			setMobile(screenSizeIsMobile);
		};
		
		onResize()
		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, [breakpoint]);

	return isMobile;
}
