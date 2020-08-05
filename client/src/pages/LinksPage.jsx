import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";

const LinksPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [links, setLinks] = useState(null);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request(`/api/link`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (err) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }
  return <LinksList links={links} />;
};

export default LinksPage;
