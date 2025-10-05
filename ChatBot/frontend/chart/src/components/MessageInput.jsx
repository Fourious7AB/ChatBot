import { useRef, useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { gsap } from "gsap";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  const imagePreviewRef = useRef(null);
  const formRef = useRef(null);
  const imageIconRef = useRef(null);
  const sendIconRef = useRef(null);
  const xIconRef = useRef(null);
  const { sendMessage } = useChatStore();

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (imagePreviewRef.current) {
      if (imagePreview) {
        gsap.fromTo(
          imagePreviewRef.current,
          { opacity: 0, height: 0, marginBottom: 0 },
          { opacity: 1, height: "auto", marginBottom: "0.75rem", duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(imagePreviewRef.current, {
          opacity: 0,
          height: 0,
          marginBottom: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (imagePreviewRef.current) {
              imagePreviewRef.current.style.display = "none";
            }
          },
        });
      }
    }
  }, [imagePreview]);

  const animateIconHover = (ref, enter) => {
    if (ref.current) {
      gsap.to(ref.current, {
        scale: enter ? 1.2 : 1,
        rotation: enter ? 10 : 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div ref={containerRef} className="p-4 w-full">
      {imagePreview && (
        <div ref={imagePreviewRef} className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
              onMouseEnter={() => animateIconHover(xIconRef, true)}
              onMouseLeave={() => animateIconHover(xIconRef, false)}
            >
              <span ref={xIconRef}>
                <X className="size-3" />
              </span>
            </button>
          </div>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
            onMouseEnter={() => animateIconHover(imageIconRef, true)}
            onMouseLeave={() => animateIconHover(imageIconRef, false)}
          >
            <span ref={imageIconRef}>
              <Image size={20} />
            </span>
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
          onMouseEnter={() => animateIconHover(sendIconRef, true)}
          onMouseLeave={() => animateIconHover(sendIconRef, false)}
        >
          <span ref={sendIconRef}>
            <Send size={22} />
          </span>
        </button>
      </form>
    </div>
  );
};
export default MessageInput;