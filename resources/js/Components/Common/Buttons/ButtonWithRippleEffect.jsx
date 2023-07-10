import Ripples from "react-ripples";

export default function ButtonWithRippleEffect({
    children,
    className,
    buttonClassName,
    ...props
}) {
    return (
        <Ripples
            color="#73cbf2"
            {...props}
            className={`select-none ${className}`}
        >
            <button className={"w-full py-2"}>{children}</button>
        </Ripples>
    );
}
