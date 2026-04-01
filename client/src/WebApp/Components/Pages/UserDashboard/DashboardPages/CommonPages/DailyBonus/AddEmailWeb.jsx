import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const AddEmailWeb = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const { t } = useTranslation("dashboard");
  const [email, setemail] = useState("");
  // const { playSound } = useSettings();

  const handleChange = (e) => {
    setemail(e.target.value);
  };

  const handleSubmit = () => {
    // playSound();
    if (email) {
      onSubmit({ email });
    }
  };

  const isButtonDisabled = !email;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="User Input Modal"
      overlayClassName="fixed inset-0 backdrop-blur-sm flex items-center justify-center"
      className="rounded-xl bg-gradient-to-r from-[#070E3A]/0 via-[#070E3A] to-[#070E3A]/0 bg-[#070E3A]  text-white w-full max-w-md relative z-50" // Ensure z-index is high
    >
      <div
        className="w-full h-full rounded-xl"
        style={{
          background:
            "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
        }}
      >
        <div className="rounded-xl w-full h-full bg-[#334694]/50 border-[2px] border-[#1AE348]/40 p-2 flex flex-col justify-between p-7 ">
          <button
            onClick={() => {
              // playSound();
              onClose();
            }}
            className="absolute top-3 right-3 text-white "
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>
          <h2 className="text-xl font-semibold mb-5">{t("dailyBonus.addEmail.title")}</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                {t("dailyBonus.addEmail.emailLabel")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder={t("dailyBonus.addEmail.emailPlaceholder")}
                className="mt-2.5 p-2 w-full border-b border-white/30  bg-transparent text-white placeholder-gray-400 focus:outline-none "
              />
            </div>
            <button
              type="button"
              onClick={isLoading ? () => { } : handleSubmit}
              className={`w-full py-2 px-4 rounded-md ${isButtonDisabled
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#17C969] to-[#005DBB] hover:from-[#005DBB] hover:to-[#17C969] text-sm font-bold sm:px-7 px-3 py-2 sm:py-1.5 rounded-full"
                }`}
              disabled={isButtonDisabled}
            >
              {isLoading ? t("dailyBonus.addEmail.submitting") : t("dailyBonus.addEmail.submit")}
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddEmailWeb;
