import Ripples from "react-ripples";

export default function ButtonWithRippleEffect({
    children,
    className,
    ...props
}) {
    return (
        <Ripples
            color="#73cbf2"
            {...props}
            className={`select-none ${className}`}
        >
            <button>{children}</button>
        </Ripples>
    );
}
