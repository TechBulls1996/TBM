import BreadCrumb from "../components/common/Breadcrumb";
import BlogCard from "../components/BlogCard";
import BgHeader from "../components/BgHeader";

const Blogs = () => {
  return (
    <>
      <BgHeader />
      <BreadCrumb pages={["Blogs"]} />
      <div className="container">
        <div className="col-sm-12">
          <div className="row">
            <BlogCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
