import { useState, useEffect, useRef } from "react";
import { Share2, User, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import AOS from "aos";
import "aos/dist/aos.css";
import Comentaire from "../components/Comentaire";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2"; // Import SweetAlert2

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement | null>(null); // Reference to the form
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = "service_tef9c9n";
    const templateID = "template_472lg1d";
    const publicKey = "KRxeP6ClkaEaivx2D";

    if (!formRef.current) {
      console.error("Form reference is null");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await emailjs.sendForm(serviceID, templateID, formRef.current, publicKey);
      console.log("Email sent successfully:", response);
      // Show SweetAlert success notification
      Swal.fire({
        title: "Succès!",
        text: "Votre message a été envoyé avec succès.",
        icon: "success",
        confirmButtonText: "OK",
      });

  // ✅ Réinitialiser le formulaire après succès
  setFormData({ email: "", message: "" });
  formRef.current?.reset();

    } catch (error) {
      console.error("Error sending email:", error);
      // Show SweetAlert error notification
      Swal.fire({
        title: "Oops!",
        text: "Quelque chose a mal tourné. Veuillez réessayer plus tard.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contactez-moi
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          ✨Vous avez une question ? Envoyez-moi un message, et je vous répondrai bientôt.✨
        </p>
      </div>

      <div
        className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0"
        id="Contact"
      >
        <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-300 hover:shadow-[#6366f1]/10"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Entrons en contact
                </h2>
                <p className="text-gray-400">
                  Vous avez quelque chose à discuter ? Envoyez-moi un message et parlons-en.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-[#6366f1] opacity-50" />
            </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div data-aos="fade-up" data-aos-delay="100" className="relative group">
        <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
        <input
          type="email"
          name="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
          required
        />
      </div>
      
      <div data-aos="fade-up" data-aos-delay="300" className="relative group">
        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
        <textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 h-[9.9rem] disabled:opacity-50"
          required
        />
      </div>

      <button
        data-aos="fade-up"
        data-aos-delay="400"
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <Send className="w-5 h-5" />
        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-3 py-3 md:p-10 md:py-8 shadow-2xl transform transition-all duration-300 hover:shadow-[#6366f1]/10">
            {/* Espace pour des informations supplémentaires ou un design futur */}
            <Comentaire />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
