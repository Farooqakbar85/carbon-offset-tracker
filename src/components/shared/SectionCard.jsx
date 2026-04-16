export default function SectionCard({ title, children, bodyClassName = "" }) {
  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg shadow-sm">
      {title ? (
        <div className="p-5 pb-3">
          <h3 className="text-base font-semibold text-greenInk">{title}</h3>
        </div>
      ) : null}

      <div className={title ? `p-5 pt-0 ${bodyClassName}` : `p-5 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}