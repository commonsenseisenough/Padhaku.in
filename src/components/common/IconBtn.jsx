export default function IconBtn({
  text,
  onClick,
  children,
  disabled = false,
  outline = false,
  customClasses = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group flex items-center gap-x-2 rounded-md px-5 py-2
                  font-semibold transition-all duration-200
                  ${outline
                    ? "border border-yellow-400 bg-transparent text-yellow-400 hover:bg-yellow-400 hover:text-black"
                    : "bg-yellow-400 text-black hover:bg-yellow-300"}
                  ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                  ${customClasses}`}
    >
      {children ? (
        <>
          <span
            className={
              outline
                ? "text-yellow-400 group-hover:text-black"
                : "text-black"
            }
          >
            {text}
          </span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
