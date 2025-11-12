import React from "react";
import { Mail, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-black text-white min-h-[90vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-3">Contact Us</h1>
        <p className="text-gray-400 mb-6">
          Have a question, suggestion, or feedback? We'd love to hear from you.
          Reach out anytime.
        </p>

        <div className="bg-gray-900 rounded-lg p-6 flex flex-col items-center gap-3">
          <Mail size={24} className="text-blue-500" />
          <a
            href="mailto:support@bookverse.com"
            className="text-blue-400 hover:underline text-lg"
          >
            support@bookverse.com
          </a>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MessageCircle size={16} />
            <span>We reply within 24 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
