import React, { useEffect, useState } from "react";
import axios from "axios";

const Header: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState<string>("");

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get("https://api.example.com/logo");
        setLogoUrl(response.data.logoUrl);
      } catch (error) {
        console.error("Error fetching the logo:", error);
      }
    };

    fetchLogo();
  }, []);

  return (
    <header style={styles.header}>
      {logoUrl ? (
        <img src={logoUrl} alt="Logo" style={styles.logo} />
      ) : (
        <p>Loading...</p>
      )}
      <h1>Scramble Leaderboard</h1>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f8f9fa",
  },
  logo: {
    height: "50px",
    marginRight: "10px",
  },
};

export default Header;
