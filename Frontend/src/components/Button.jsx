import ArrowIcon from "./ArrowIcon.jsx";

const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark focus-visible:outline-brand",
  dark: "bg-ink text-white hover:bg-slate-700 focus-visible:outline-ink",
  subtle: "bg-brand/10 text-brand-dark hover:bg-brand/15 focus-visible:outline-brand",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  arrow = false,
  type = "button",
  className = "",
}) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-3 rounded-lg px-5 text-sm font-bold transition hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowIcon />}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} type={type}>
      {content}
    </button>
  );
}
