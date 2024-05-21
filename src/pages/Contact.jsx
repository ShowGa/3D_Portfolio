import React, { Suspense, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Fox from "../models/Fox";
import Loader from "../components/Loader";
import { Canvas } from "@react-three/fiber";
// import Alert from "../components/Alert";
// import hooks
import toast from "react-hot-toast";

const Contact = () => {
  const formRef = useRef(null);
  // loading functionality
  const [isLoading, setIsLoading] = useState(false);
  // animations for Fox
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  // hooks
  // const { alert, showAlert, hideAlert } = useAlert();
  // set the formData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation("hit");

    // check formdata before submit
    if (data.name === "" || data.email === "" || data.message === "") {
      setIsLoading(false);
      setCurrentAnimation("idle");
      toast.error("Please fullfill the required input");
      return;
    }

    // deal with the emails
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          to_name: "ShowGa",
          from_email: formData.email,
          to_email: "peter1997217123@gmail.com",
          message: formData.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_ID
      )
      .then(() => {
        setIsLoading(false);
        // TODO : Show success message
        toast.success("Message sending successfully !");
        // TODO : Hide an alert

        setTimeout(() => {
          setCurrentAnimation("idle");
          setFormData({ name: "", email: "", message: "" });
        }, [3000]);
      })
      .catch((e) => {
        setIsLoading(false);
        setCurrentAnimation("idle");
        console.log(e);
        // TODO : Show error message
        toast.error("Ops ! Error happened when sending message !");
      });
  };
  // handleChange function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // track if clicking the input or not for the fox animations when focus
  const handleFocus = () => {
    setCurrentAnimation("walk");
  };
  const handleBlur = () => {
    setCurrentAnimation("idle");
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container lg:h-[100vh]">
      {/* {alert.show && <Alert {...alert} />}
      <Alert {...alert} /> */}
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get In Touch</h1>
        <form
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input
              type="text"
              name="email"
              className="input"
              placeholder="Your email"
              required
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Message
            <textarea
              rows={4}
              type="text"
              name="message"
              className="textarea"
              placeholder="Say something to ShowGa ..."
              required
              value={formData.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn disabled:opacity-80"
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
          camera={{
            position: [0, 0, 5],
            // The field of view
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight intensity={3.0} position={[0, 0, 1]} />
          <ambientLight intensity={0.25} />

          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[0, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
