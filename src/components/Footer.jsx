import React from "react";
import "./Footer.css";
import FooterListData from "../data/FooterListData";
const Footer = () => {
  return (
    <React.Fragment>
      <footer>
        <div className="footer-one ">
          Get the best Pizza made to taste better and linger the memories in
          your mouth. create a menu and serve yourself the best pizza in your
          area.
        </div>
        <div className="data-container ">
          {FooterListData.map((fItem, index) => {
            return (
              <React.Fragment key={index}>
                <div className={`${fItem.divCName} `}>
                  <ul>
                    <li>{fItem.title}</li>
                    <li className="l1">{fItem.l1} </li>
                    <li>{fItem.l2}</li>
                    <li>{fItem.l3}</li>
                    <li>{fItem.l4}</li>
                    <li>{fItem.l5}</li>
                  </ul>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
