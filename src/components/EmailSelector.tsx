import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  IconButton,
  Collapse,
  InputAdornment,
} from "@mui/material";
import { ExpandLess, ExpandMore, Delete, Search } from "@mui/icons-material";

interface Recipient {
  email: string;
  company: string;
}

const initialRecipients: Recipient[] = [
  { email: "mehmet@posteffect.ai", company: "posteffect.ai" },
  { email: "mert@posteffect.ai", company: "posteffect.ai" },
  { email: "natali@posteffect.ai", company: "posteffect.ai" },
  { email: "hilal@posteffect.ai", company: "posteffect.ai" },
  { email: "muhammed@gmail.com", company: "gmail.com" },
  { email: "ugur@gmail.com", company: "gmail.com" },
  { email: "furkan@gmail.com", company: "gmail.com" },
  { email: "batin@gmail.com", company: "gmail.com" },
];

const EmailSelector: React.FC = () => {
  const [availableRecipients, setAvailableRecipients] =
    useState(initialRecipients);
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [expandedSelectedGroups, setExpandedSelectedGroups] = useState<{
    [key: string]: boolean;
  }>({
    "Company Recipients": true,
    "Email Recipients": true,
  });

  const handleSelectRecipient = (recipient: Recipient) => {
    if (!selectedRecipients.find((r) => r.email === recipient.email)) {
      setSelectedRecipients([...selectedRecipients, recipient]);
    }
  };

  const handleRemoveRecipient = (email: string) => {
    setSelectedRecipients(selectedRecipients.filter((r) => r.email !== email));
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleToggleSelectedGroup = (group: string) => {
    setExpandedSelectedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const posteffectRecipients = availableRecipients.filter(
    (r) => r.company === "posteffect.ai"
  );
  const otherRecipients = availableRecipients.filter(
    (r) => r.company !== "posteffect.ai"
  );

  const selectedCompanyRecipients = selectedRecipients.filter(
    (r) => r.company !== "gmail.com"
  );
  const selectedEmailRecipients = selectedRecipients.filter(
    (r) => r.company === "gmail.com"
  );

  return (
    <div
      style={{
        display: "flex",
        height: "95vh",
        width: "120vh",
        gap: "20px", // Aradaki boşluk
        padding: "20px", // Sayfa kenar boşluğu
      }}
    >
      {/* Kart 1 */}
      <div
        style={{
          flex: 1, // Genişlik olarak sayfanın yarısını kapla
          border: "1px solid rgba(66, 68, 90, 0.3)",
          padding: "15px",
          borderRadius: 6,
          boxShadow: "0px 8px 12px 0px rgba(66, 68, 90, 0.4)",
          overflowY: "auto", // İçerik taşarsa kaydır
        }}
      >
        <h3
          style={{
            color: "#71B3E7",
            textAlign: "left",
            padding: 0,
            marginTop: 3,
            marginBottom: 10,
          }}
        >
          Available Recipients
        </h3>
        <Autocomplete
          options={availableRecipients}
          getOptionLabel={(option) => option.email}
          onChange={(event, value) => value && handleSelectRecipient(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              sx={{ m: 1, width: "99%", borderRadius: "50px" }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                    <span style={{ marginLeft: "5px" }}>Search</span>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleToggleExpand}
          >
            <span style={{ marginRight: "10px" }}>{expanded ? <ExpandLess /> : <ExpandMore />}</span>
            <span>posteffect.ai</span>
          </div>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div style={{ padding: "10px 0,", marginLeft:"45px"}}>
              {posteffectRecipients.map((recipient) => (
                <div
                  key={recipient.email}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{recipient.email}</span>
                  <IconButton onClick={() => handleSelectRecipient(recipient)}>
                    <ExpandMore />
                  </IconButton>
                </div>
              ))}
            </div>
          </Collapse>
        </div>

        <div>
          {otherRecipients.map((recipient) => (
            <div
              key={recipient.email}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{recipient.email}</span>
              <IconButton onClick={() => handleSelectRecipient(recipient)}>
                <ExpandMore />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
      {/* Kart 2 */}
      <div
        style={{
          flex: 1, // Genişlik olarak sayfanın yarısını kapla
          border: "1px solid rgba(66, 68, 90, 0.3)",
          padding: "15px",
          borderRadius: 6,
          boxShadow: "0px 8px 12px 0px rgba(66, 68, 90, 0.4)",
          overflowY: "auto", // İçerik taşarsa kaydır
        }}
      >
        <h3
          style={{
            color: "#71B3E7",
            textAlign: "left",
            padding: 0,
            marginTop: 3,
            marginBottom: 10,
          }}
        >
          Selected Recipients
        </h3>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => handleToggleSelectedGroup("Company Recipients")}
          >
            <span style={{ marginRight: "10px" }}>
              {expandedSelectedGroups["Company Recipients"] ? ">" : "v"}
            </span>
            <span>Company Recipients</span>
          </div>
          <Collapse
            in={expandedSelectedGroups["Company Recipients"]}
            timeout="auto"
            unmountOnExit
          >
            <div style={{ padding: "10px 0" }}>
              {selectedCompanyRecipients.map((recipient) => (
                <div
                  key={recipient.email}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{recipient.email}</span>
                  <IconButton
                    onClick={() => handleRemoveRecipient(recipient.email)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => handleToggleSelectedGroup("Email Recipients")}
          >
            <span style={{ marginRight: "10px" }}>
              {expandedSelectedGroups["Email Recipients"] ? ">" : "v"}
            </span>
            <span>Email Recipients</span>
          </div>
          <Collapse
            in={expandedSelectedGroups["Email Recipients"]}
            timeout="auto"
            unmountOnExit
          >
            <div style={{ padding: "10px 0" }}>
              {selectedEmailRecipients.map((recipient) => (
                <div
                  key={recipient.email}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{recipient.email}</span>
                  <IconButton
                    onClick={() => handleRemoveRecipient(recipient.email)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default EmailSelector;
