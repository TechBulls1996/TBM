interface BreadCrumbProps {
  pages: Array<string>;
}

const BreadCrumb = ({ pages }: BreadCrumbProps) => {
  return (
    <>
      <div className="bread-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-8">
              <ol className="breadcrumb">
                <li>
                  <a href="index.html">Home</a>
                </li>
                {pages.map((page) => (
                  <li className="active">{page}</li>
                ))}
              </ol>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrumb;
