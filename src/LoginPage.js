import React, { useState } from "react";

const LoginPage = ({ onLogin, language, setLanguage }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const texts = {
    en: {
      login: "Login with Phone",
      phone: "Enter Phone Number",
      send: "Send OTP",
      enterOtp: "Enter OTP",
      verify: "Verify OTP",
      details: "Enter Details",
      name: "Enter Name",
      location: "Enter Location",
      finish: "Finish Login",
      selectLang: "Select Language",
    },
    hi: {
      login: "फ़ोन से लॉगिन करें",
      phone: "फ़ोन नंबर दर्ज करें",
      send: "OTP भेजें",
      enterOtp: "OTP दर्ज करें",
      verify: "OTP सत्यापित करें",
      details: "जानकारी दर्ज करें",
      name: "नाम दर्ज करें",
      location: "स्थान दर्ज करें",
      finish: "लॉगिन पूर्ण करें",
      selectLang: "भाषा चुनें",
    },
    bho: {
      login: "फोन से लॉगिन करीं",
      phone: "फोन नंबर डालू",
      send: "OTP भेजीं",
      enterOtp: "OTP डालू",
      verify: "OTP जांचीं",
      details: "जानकारी डालू",
      name: "नाम डालू",
      location: "ठिकाना डालू",
      finish: "लॉगिन पूरा करीं",
      selectLang: "भासा चुनू",
    },
    ml: {
      login: "ഫോൺ ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക",
      phone: "ഫോൺ നമ്പർ നൽകുക",
      send: "OTP അയയ്ക്കുക",
      enterOtp: "OTP നൽകുക",
      verify: "OTP സ്ഥിരീകരിക്കുക",
      details: "വിവരങ്ങൾ നൽകുക",
      name: "പേര് നൽകുക",
      location: "സ്ഥലം നൽകുക",
      finish: "ലോഗിൻ പൂർത്തിയാക്കുക",
      selectLang: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    },
  };

  const sendOtp = () => setStep(2);
  const verifyOtp = () => setStep(3);
  const finishLogin = () => {
    const userData = { phone, name, location, history: [], language };
    onLogin(userData);
  };

  return (
    <div className="login-page">
      <div>
        <label>{texts[language].selectLang}: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bho">Bhojpuri</option>
          <option value="ml">Malayalam</option>
        </select>
      </div>

      {step === 1 && (
        <>
          <h2>{texts[language].login}</h2>
          <input
            type="text"
            placeholder={texts[language].phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOtp}>{texts[language].send}</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>{texts[language].enterOtp}</h2>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>{texts[language].verify}</button>
        </>
      )}

      {step === 3 && (
        <>
          <h2>{texts[language].details}</h2>
          <input
            type="text"
            placeholder={texts[language].name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder={texts[language].location}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={finishLogin}>{texts[language].finish}</button>
        </>
      )}
    </div>
  );
};

export default LoginPage;
