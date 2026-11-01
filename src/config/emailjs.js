const env=import.meta.env??{};
export const emailSettings={
  publicKey:env.VITE_EMAILJS_PUBLIC_KEY||'',
  serviceId:env.VITE_EMAILJS_SERVICE_ID||'',
  templates:{contact:env.VITE_EMAILJS_CONTACT_TEMPLATE_ID||'',careers:env.VITE_EMAILJS_CAREERS_TEMPLATE_ID||''}
};
