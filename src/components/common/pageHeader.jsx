function PageHeader({ title, description }) {
  return (
    <div className="row mb-4 text-center">
      <div className="row">
        <h1>{title}</h1>
        {description && <div className="col">{description}</div>}
      </div>
    </div>
  );
}

export default PageHeader;
