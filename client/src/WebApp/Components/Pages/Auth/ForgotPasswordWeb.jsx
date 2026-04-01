import React, { useState, useEffect } from 'react';
import Header from "../Layout/Header";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { SERVER_URL } from '../../../../config';
import { useTranslation } from 'react-i18next';

const ForgotPasswordWeb = () => {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  const handleSendResetLink = async () => {
    if (!email) {
      setError(t('toasters.emailRequired'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('validation.invalidEmail'));
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${SERVER_URL}/api/sendResetPasswordLink`, { email });
      if (res.status === 200) {
        setSubmitted(true);
        setError('');
        toast.success(t('toasters.resetLinkSent'));
        setCountdown(60);
      }
    } catch (error) {
      toast.error(t('toasters.somethingWrong'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="w-full bg-black min-h-screen overflow-hidden relative">
      <Header />
      <div className="flex flex-col lg:flex-row justify-center items-center pt-10 gap-2 mt-3 lg:mt-0">
        <p className="lg:w-[20%] text-center rounded-full border border-white px-3 py-2 font-poppins bg-gradient-to-r from-[#0285FF] to-[#1EEF32] bg-clip-text text-transparent inline text-sm">
          {t('welcomeTitle')}
        </p>
        <div className="translate-y-5">
          <img
            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
            className="h-32 mx-auto"
            alt="Robot"
          />
        </div>
        <p className="lg:w-[20%] text-center rounded-full border border-white px-3 py-2 mt-5 lg:mt-0 font-poppins bg-gradient-to-r from-[#0285FF] to-[#1EEF32] bg-clip-text text-transparent inline text-sm">
          {t('forgotPasswordPage.title')}
        </p>
      </div>

      <div className="w-[90%] mx-auto mt-16">
        <div className="z-10 w-full mx-auto max-w-md flex flex-col gap-4">
          <p className="z-10 text-white font-poppins">{t('forgotPasswordPage.title')}</p>
          <div className="z-10 border-[0.2px] border-white py-2 px-4 rounded-lg text-white flex gap-3 items-center bg-gradient-to-r from-[#282828] via-[#191919] to-[#070707]">
            <img src="/assets/WebApp/message.svg" />
            <input
              placeholder={t('forgotPasswordPage.emailPlaceholder')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded outline-none bg-transparent py-1.5 px-3 text-white placeholder:text-white/60"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button
            type='button'
            disabled={loading || countdown > 0}
            onClick={handleSendResetLink}
            className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] font-bold mt-5 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? t('forgotPasswordPage.sending') : countdown > 0 ? t('forgotPasswordPage.resendIn', { count: countdown }) : t('forgotPasswordPage.sendButton')}
          </button>

          {submitted && (
            <p className="text-green-500 text-sm">
              {t('forgotPasswordPage.successMessage')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordWeb;
