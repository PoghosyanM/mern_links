import React from "react";

const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>
        Your link:{" "}
        <a href={link.to} target="_blanc" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Whence:{" "}
        <a href={link.from} target="_blanc" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Count of clicks on the link: <b>{link.clicks}</b>
      </p>
      <p>
        Creating date: <b>{new Date(link.date).toLocaleDateString()}</b>
      </p>
    </>
  );
};

export default LinkCard;
