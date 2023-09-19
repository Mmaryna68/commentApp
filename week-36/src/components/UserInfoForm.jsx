import React, { useState } from "react";
import styles from "../style/UserInfoForm.module.css";

function UserInfoForm({ onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [nickname, setNickname] = useState("");
  const [showNickname, setShowNickname] = useState(false);

  const handleSubmit = () => {
    const formattedFirstName = formatName(firstName);
    const formattedLastName = formatName(lastName);
    const formattedMiddleName = formatName(middleName);

    const user = {
      fullName: `${formattedFirstName} ${formattedLastName} ${formattedMiddleName}`,
      nickname: showNickname ? formatName(nickname) : "Noname",
    };
    onSubmit(user);
  };

  const formatName = (name) => {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputField}>
        <input
          type="text"
          placeholder="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className={styles.inputField}>
        <input
          type="text"
          placeholder="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className={styles.inputField}>
        <input
          type="text"
          placeholder="Отчество"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
      </div>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={showNickname}
          onChange={() => setShowNickname(!showNickname)}
        />
        <label className={styles.checkboxLabel}>Показывать никнейм</label>
      </div>
      {showNickname && (
        <div className={styles.nicknameInput}>
          <input
            type="text"
            placeholder="Никнейм"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
      )}
      <div>
        <button onClick={handleSubmit}>Сохранить</button>
      </div>
    </div>
  );
}

export default UserInfoForm;
