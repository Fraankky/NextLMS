interface Props{
    label: string,
    href: string
}

export const Menu = (props: Props) => {
    return (
        <div className="px-3 py-1.5 text-[15px] rounded-lg hover:bg-indigo-600 hover:text-white active:bg-indigo-400 gap-2 items-center font-semibold text-slate-700 cursor-pointer transition duration-300">
            {props.label}
        </div>
    )
}