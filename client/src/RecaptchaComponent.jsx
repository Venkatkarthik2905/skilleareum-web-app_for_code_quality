// src/components/RecaptchaComponent.js

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaComponent = () => {
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
  };

  return (
    <div>
      <ReCAPTCHA
        sitekey="6LflCfUpAAAAAFTg5_PEdBGkoRS3JpRtgrxKwBxd"
        onChange={handleCaptchaChange}
      />
      {captchaValue && <p>Captcha completed!</p>}
    </div>
  );
};

export default RecaptchaComponent;
