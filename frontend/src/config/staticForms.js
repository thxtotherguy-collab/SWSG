export const STATIC_FORM_ENDPOINT =
  process.env.REACT_APP_STATIC_FORM_ENDPOINT ||
  "https://api.w3forms.com/submit";

export const W3FORMS_ACCESS_KEY =
  process.env.REACT_APP_W3FORMS_ACCESS_KEY ||
  "w3f_6df28b178e9daee7f51b48c146c8f8d42f8b0bd9238af93f";

export const STATIC_FORM_SUBJECTS = {
  quote: "New SWSG Quote Request",
  consultation: "New SWSG Consultation Request",
  contact: "New SWSG Contact Message",
};

export const STATIC_FORM_FALLBACK =
  "Your details have been kept. Please email info@swsg.co.za or WhatsApp +27 81 417 7689.";

const formatCurrency = (value) =>
  `R${Number(value || 0).toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const displayValue = (value) => {
  if (value === undefined || value === null || value === "") return "Not provided";
  return String(value);
};

export function buildQuoteMessage({ items = [], totalPrice = 0, notes = "" }) {
  const productSummary = items.map((item, index) => {
    const lineTotal = Number(item.price || 0) * Number(item.qty || 0);
    const identifiers = [
      `ID: ${displayValue(item.id)}`,
      item.slug ? `Slug: ${item.slug}` : null,
      item.sku ? `SKU: ${item.sku}` : null,
    ].filter(Boolean);

    return [
      `${index + 1}. ${displayValue(item.name)}`,
      `   ${identifiers.join(" | ")}`,
      `   Quantity: ${displayValue(item.qty)}`,
      `   Unit price: ${formatCurrency(item.price)}`,
      `   Line total: ${formatCurrency(lineTotal)}`,
    ].join("\n");
  });

  return [
    "Selected products:",
    productSummary.join("\n\n") || "No products selected",
    "",
    `Estimated total: ${formatCurrency(totalPrice)}`,
    `Customer notes: ${displayValue(notes)}`,
  ].join("\n");
}

export function buildConsultationMessage(form) {
  const fields = [
    ["Full name", form.full_name],
    ["Company", form.company],
    ["Phone", form.phone],
    ["Email", form.email],
    ["Location", form.location],
    ["Enquiry type", form.enquiry_type],
    ["Application type", form.application_type],
    ["Installation type", form.installation_type],
    ["Required flow rate", form.flow_rate],
    ["Required pressure / head", form.pressure_head],
    ["Power supply", form.power_supply],
    ["Water source", form.water_source],
    ["Pipe size", form.pipe_size],
    ["Estimated budget", form.budget],
    ["Project timeline", form.timeline],
    ["Project description", form.description],
  ];

  return fields.map(([label, value]) => `${label}: ${displayValue(value)}`).join("\n");
}

export function buildContactMessage(form) {
  return [
    `Name: ${displayValue(form.name)}`,
    `Email: ${displayValue(form.email)}`,
    `Phone: ${displayValue(form.phone)}`,
    `Customer subject: ${displayValue(form.subject)}`,
    "",
    "Message:",
    displayValue(form.message),
  ].join("\n");
}

const getScalarFields = (fields) =>
  Object.fromEntries(
    Object.entries(fields).filter(([, value]) =>
      ["string", "number", "boolean"].includes(typeof value)
    )
  );

export async function submitStaticForm({ formType, subject, fields = {} }) {
  // Static frontend integration only: never place private backend secrets in this payload.
  const payload = {
    ...getScalarFields(fields),
    access_key: W3FORMS_ACCESS_KEY,
    from_name: "SWSG Website",
    source: "SWSG Website",
    timestamp: new Date().toISOString(),
    form_type: formType,
    subject,
  };

  try {
    const response = await fetch(STATIC_FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    let responseData = null;

    if (responseText) {
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = null;
      }
    }

    if (!response.ok || responseData?.success !== true) {
      return {
        success: false,
        status: response.status,
        message: responseData?.message || "The form service did not confirm the submission.",
      };
    }

    return {
      success: true,
      status: response.status,
      message: responseData.message || "Submission received.",
    };
  } catch {
    return {
      success: false,
      status: 0,
      message: "The form service could not be reached.",
    };
  }
}
