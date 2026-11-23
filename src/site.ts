// Add only information approved for publication.
export const group = {
  name: 'Borrego Environmental Committee',
  description: 'A volunteer environmental group for people who care about desert landscapes, wildlife, and the places we share.',
  contactEmail: '',
  socialLinks: [] as { label: string; url: string }[],
};

// Copy only the public form ID, data-form value, and optional hosted signup URL
// from the actual MailerLite embed. Never place an API key here.
export const newsletter = {
  accountId: '2817388',
  formCode: '4v341N',
  hostedFormUrl: 'https://preview.mailerlite.io/forms/2817388/204904257796703359/share',
};
