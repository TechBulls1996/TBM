const BgHeader = () => {
    const background: any = {
        backgroundImage: "url('images/gradient.svg')",
      };

    return (
        <header className="masthead py-5" style={background}>
        <div className="container d-flex h-80 align-items-center">
          <div className="mx-auto text-center">
          
            <div className="row">
              <div className="col-sm-12 pt-5">
                <h1 className="mx-auto my-0 text-uppercase">True Digital Braodcasting</h1>
                
              </div>
            </div>
          </div>
        </div>
      </header>
    )
}

export default BgHeader;