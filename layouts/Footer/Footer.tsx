const Footer = ()=>{
  
  return(
    <div className="footer">
      <div>&copy;{`${new Date().getFullYear()>2022?`2022-${new Date().getFullYear()}`:new Date().getFullYear()}`}</div>
    </div>
  );
};

export default Footer;