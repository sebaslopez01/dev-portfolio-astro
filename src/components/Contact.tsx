import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";

import SectionWrapper from "./hoc/SectionWrapper";
import EarthCanvas from "./canvas/EarthCanvas";
import { slideIn } from "../utils/motion";
import type { ContactData } from "../interfaces";

function Contact() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactData>();

  const onSubmit: SubmitHandler<ContactData> = async (data) => {
    try {
      const emailResponse = await emailjs.send(
        import.meta.env.PUBLIC_EMAIL_SERVICE,
        import.meta.env.PUBLIC_EMAIL_TEMPLATE,
        {
          from_name: data.name,
          to_name: "Sebastián",
          from_email: data.email,
          to_email: "sebaslopez.2002@gmail.com",
          message: data.message,
        },
        import.meta.env.PUBLIC_EMAIL_PUBLIC_KEY
      );

      if (emailResponse.status === 200) {
        reset();
        alert("Thank you I will get back to you as soon as possible.");
      } else {
        console.log(emailResponse.text);

        alert("Something went wrong. Please try again!");
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className="sectionSubText">Get in touch</p>
        <h3 className="sectionHeadText">Contact Me</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Name</span>
            <input
              type="text"
              {...register("name", { required: true, maxLength: 100 })}
              placeholder="What's your name?"
              maxLength={100}
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Email</span>
            <input
              type="email"
              {...register("email", { required: true, maxLength: 150 })}
              placeholder="What's your email?"
              maxLength={150}
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Message</span>
            <textarea
              rows={7}
              {...register("message", { required: true, maxLength: 350 })}
              placeholder="What do you want to say?"
              maxLength={350}
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <button
            type="submit"
            className="bg-tertiary hover:bg-white-100 hover:text-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
}

export default SectionWrapper(Contact, "contact");
