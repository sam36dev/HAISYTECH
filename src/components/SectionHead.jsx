export default function SectionHead({ index, label, title, children }) {
  return (
    <div className="section-head" data-reveal>
      <p className="section-label mono">
        <span className="section-index">{index}</span> // {label}
        <span className="section-rule" aria-hidden="true" />
      </p>
      <h2 className="section-title">{title}</h2>
      {children && <p className="section-sub">{children}</p>}
    </div>
  );
}
