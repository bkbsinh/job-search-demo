import { useEffect } from "react";

export function useObserver(containerRef) {
    const options = {
        threshhold: "0.2"
    }

    const callback = (entries) => {
        entries.forEach(element => {
            if(element.isIntersecting) {
                element.target.classList.add('opacity-100', 'translate-y-0');
                element.target.classList.remove('opacity-0', 'translate-y-12');
            }
        });
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callback, options);
        if(containerRef.current) observer.observe(containerRef.current)

        return () => {
            if(containerRef.current) observer.unobserve(containerRef.current)
        }
    })
}